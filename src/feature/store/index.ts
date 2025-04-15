import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducers/appSlice";
import userReducer, { fetchUsers } from "../reducers/userSlice";
import axiosJWT from "@/service/axiosJWT";

export const store = configureStore({
    reducer:{
        app: appReducer,
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
})

axiosJWT.interceptors.request.use(
    async(config) => {
        const currentDate = new Date();
        const exp = localStorage.getItem("exp");
        const userId = localStorage.getItem("userId");
        console.log("exp", exp);
        console.log("userId", userId);
        console.log("currentDate", currentDate.getDate());
        
        return config;
    }
    , (error) => {
        return Promise.reject(error);
    }
)

store.dispatch(fetchUsers());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;