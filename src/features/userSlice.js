import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      return {
        username: payload.username,
        email: payload.email,
        token: payload.token,
        isLogin: true,
      };
    },
    logout: () => null,
    signup: (state, { payload }) => {
      return {
        username: payload.username,
        email: payload.email,
        token: payload.token,
        isLogin: true,
      };
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;
