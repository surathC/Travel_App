import { createSlice } from "@reduxjs/toolkit";

const safeParseJSON = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: (() => {
      try {
        return localStorage.getItem("token") ?? null;
      } catch {
        return null;
      }
    })(),
    user: (() => {
      try {
        return safeParseJSON(localStorage.getItem("user")) ?? null;
      } catch {
        return null;
      }
    })(),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, user, isLogged } = action.payload;
      state.token = token;
      state.user = user;
      state.isLogged = true
      localStorage.setItem("token", token);
      localStorage.setItem("isLogged", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(user));
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem("isLogged");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;