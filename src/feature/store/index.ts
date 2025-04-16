import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducers/appSlice";
import userReducer from "../reducers/userSlice";
import axiosJWT from "@/service/axiosJWT";
import { refreshToken } from "@/service/user";

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Token automatisch verlängern, falls abgelaufen
let isRefreshing = false;

axiosJWT.interceptors.request.use(
  async (config) => {
    const exp = Number(localStorage.getItem("exp"));
    const now = Date.now() / 1000;

    if (exp && now > exp && !isRefreshing) {
      isRefreshing = true;
      try {
        const res = await refreshToken();
        console.log("AccessToken erneuert");
        isRefreshing = false;
      } catch (err) {
        console.error("Token-Refresh fehlgeschlagen", err);
        isRefreshing = false;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
