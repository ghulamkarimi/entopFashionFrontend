import { getCurrentUser,  refreshToken,  UserLogin, userLogout, userRegister } from "@/service/api";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUsers, TUser } from "@/interface";



interface IUserState {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    currentUser: IUsers | null;
}

const userAdapter = createEntityAdapter<IUsers, string>({
    selectId: (user) => (user?._id ? user._id : "")
});
 

export const userRegisterApi = createAsyncThunk<
  { message: string; token: string; user: IUsers }, 
  TUser,
  { rejectValue: { message: string } }
>("/users/userregisterApi", async (user: TUser) => {
  try {
    const response = await userRegister(user);
    return response.data;
  } catch (error: any) {
    const err = error?.response?.data?.message || "Something went wrong!";
    throw new Error(err);
  }
});


export const userLoginApi = createAsyncThunk<
  { message: string; token: string; user: IUsers }, 
  TUser,
  { rejectValue: { message: string } }             
>("/users/userLoginApi", async (user: TUser, thunkAPI) => {
  try {
    const response = await UserLogin(user);
    localStorage.setItem("userId", response.data.userInfo.userId);
    localStorage.setItem("exp", response.data.user.exp);
    return response.data;
  } catch (error: any) {
    const err = error?.response?.data?.message || "Something went wrong!";
    return thunkAPI.rejectWithValue({ message: err });
  }
});

export const userLogoutApi = createAsyncThunk("/users/userLogoutApi", async () => {
  try {
    const response = await userLogout();
    localStorage.removeItem("userId");
    localStorage.removeItem("exp");
    return response.data;
  } catch (error: any) {
    const err = error?.response?.data?.message || "Something went wrong!";
    throw new Error(err);
    
  }
}
);

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    console.log("➡️ Holen von aktuellem Benutzer...");
    const response = await getCurrentUser();
    console.log("✅ Antwort:", response.data);

    const { exp, userId } = response.data.user;
    if (exp) localStorage.setItem("exp", String(exp));
    if (userId) localStorage.setItem("userId", userId);

    return response.data.user;
  }
);


export const refreshAccessTokenThunk = createAsyncThunk(
  "users/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const response = await refreshToken(); // <-- dein Service
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fehler");
    }
  }
);




const initialState = userAdapter.getInitialState<IUserState>({
    status: "idle",
    error: null,
    currentUser: null,
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      setUserInfos: (state, action) => {
        state.currentUser = action.payload
      }
    },
    extraReducers: (builder) => {
        builder
           
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
              userAdapter.setOne(state, action.payload); 
              state.currentUser = action.payload; // Aktuellen Benutzer setzen
              state.status = "succeeded";
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.payload as string;
            })
            
            .addCase(userRegisterApi.fulfilled, (state,action)=>{
                userAdapter.addOne(state, action.payload.user);
                state.status = "succeeded";
            })
            .addCase(userLoginApi.fulfilled,(state,action)=>{
                userAdapter.setOne(state, action.payload.user);
                state.status = "succeeded"                
            })
            .addCase(userLogoutApi.fulfilled, (state) => {
              userAdapter.removeAll(state); // alle Benutzer aus Adapter löschen
              state.currentUser = null;
              state.status = "idle";
            })
    }
})

export const {  selectById: displayUser } = userAdapter.getSelectors((state: RootState) => state.users);
export default userSlice.reducer;