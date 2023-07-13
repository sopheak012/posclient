import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
  token: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
      state.isLogin = true;
    },
    logout: () => initialState,
    signup: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
      state.isLogin = true;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;
