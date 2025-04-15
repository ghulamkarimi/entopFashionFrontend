import { getUsers, UserLogin, userRegister } from "@/service/user";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUsers, TUser } from "@/interface";



interface IUserState {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const userAdapter = createEntityAdapter<IUsers, string>({
    selectId: (user) => (user?._id ? user._id : "")
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    try {
        const response = await getUsers();
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
})

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


const initialState = userAdapter.getInitialState<IUserState>({
    status: "idle",
    error: null,
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                userAdapter.setAll(state, action.payload);
                state.status = "succeeded";
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? action.error.message : null;
            })
            .addCase(userRegisterApi.fulfilled, (state,action)=>{
                userAdapter.addOne(state, action.payload.user);
                state.status = "succeeded";
            })
            .addCase(userLoginApi.fulfilled,(state,action)=>{
                userAdapter.setOne(state, action.payload.user);
                state.status = "succeeded"                
            })
    }
})

export const { selectAll: displayUsers, selectById: displayUser } = userAdapter.getSelectors((state: RootState) => state.users);
export default userSlice.reducer;