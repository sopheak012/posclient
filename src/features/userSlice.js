import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: null,
    email: null,
    token: null,
    isLogin: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.token = payload.token;
      state.user.isLogin = true;
    },
    logout: (state) => {
      state.user.username = null;
      state.user.email = null;
      state.user.token = null;
      state.user.isLogin = false;
    },
    signup: (state, { payload }) => {
      state.user.username = payload.username;
      state.user.email = payload.email;
      state.user.token = payload.token;
      state.user.isLogin = true;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;
