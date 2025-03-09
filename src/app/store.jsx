import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// import themeReducer from "../components/DarkModeSwitcher/themeSlice";
import authReducer from "../components/features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    // theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});