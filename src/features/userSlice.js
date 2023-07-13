import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userInfo");
const initialState = storedUserInfo
  ? JSON.parse(storedUserInfo)
  : {
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

      // Store the user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    logout: (state) => {
      // Clear the user information from the state
      state.username = null;
      state.email = null;
      state.token = null;
      state.isLogin = false;

      // Remove the user information from local storage
      localStorage.removeItem("userInfo");
    },
    signup: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.token = payload.token;
      state.isLogin = true;

      // Store the user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export default userSlice.reducer;
