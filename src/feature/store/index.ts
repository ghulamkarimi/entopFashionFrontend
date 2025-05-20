import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../reducers/appSlice";
import userReducer from "../reducers/userSlice";
import categoriesReducer from "../reducers/categories";
import axiosJWT from "@/service/axiosJWT";
import { refreshToken } from "@/service/api";

export const store = configureStore({
  reducer: {
    app: appReducer,
    users: userReducer,
    categories: categoriesReducer,
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
    const readable = new Date(exp * 1000).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
    const now = Date.now() / 1000;
    console.log("Token läuft ab am:", readable);
    if (exp && now > exp && !isRefreshing) {
      isRefreshing = true;
      try {
        const res = await refreshToken();
        console.log("AccessToken erneuert");
        const newExp = res?.data?.exp;
        if (newExp) {
          localStorage.setItem("exp", newExp.toString());
        }
        isRefreshing = false;
      } catch (err) {
        console.error("Token-Refresh fehlgeschlagen", err);
        isRefreshing = false;
        localStorage.clear(); // optional
        // store.dispatch(logoutUser());
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
