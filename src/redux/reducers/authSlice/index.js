import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUser: false,
    token: "",
    id: "",
    name: "",

  },
  reducers: {
    LOGIN: (state, action) => {
      state.isUser = action.payload.isUser;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    LOGOUT: (state) => {
      state.isUser = false;
      state.token = "";
      state.id = "";
      state.name = "";
    },
  },
});

export const { LOGIN, LOGOUT } = authSlice.actions;

export default authSlice.reducer;
