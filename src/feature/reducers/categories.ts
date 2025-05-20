import { ICategory } from "@/interface";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { gendersValues, getCategories } from "@/service/api";

interface ICategoriesState {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    categories: ICategory | null;
    gender:string[]
}


const categoriesAdapter = createEntityAdapter<ICategory, string>({
    selectId: (category) => (category?._id ? category._id : ""),
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});


export const fetchCategories = createAsyncThunk<ICategory[]>(
    "categories/fetchCategories",
    async (_, thunkAPI) => {
      try {
        const res = await getCategories();
        return res.data as ICategory[];
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message || "Fehler beim Laden der Kategorien"
        );
      }
    }
  );

export const gendersValuesApi = createAsyncThunk("categories/gendersValuesApi", async () => {
    try {
        const response = await gendersValues();
        return response.data;
    } catch (error: any) {
        const err = error?.response?.data?.message || "Something went wrong!";
        throw new Error(err);
    }
});

 const initialState= categoriesAdapter.getInitialState<ICategoriesState>({
    status: "idle",
    error: null,
    categories: null,
    gender:[]
})

const categoriesSlice =  createSlice({
    name: "categories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(gendersValuesApi.pending, (state) => {
            state.status = "loading";
          })
          .addCase(gendersValuesApi.fulfilled, (state, action) => {
            state.status = "succeeded";
           state.gender =action.payload
          })
          .addCase(gendersValuesApi.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message ?? "Fehler beim Laden";
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = "succeeded";
            categoriesAdapter.setAll(state, action.payload); // 👈 speichert im Adapter
          })
      }
})

export const {selectAll: displayCategories, selectById: selectCategoryById} = categoriesAdapter.getSelectors((state:RootState)=> state.categories);
export default categoriesSlice.reducer;