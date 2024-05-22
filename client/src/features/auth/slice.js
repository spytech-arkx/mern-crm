import { createSlice } from "@reduxjs/toolkit/react";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    userHasAuthenticated(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userHasLoggedOut(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { userHasAuthenticated, userHasLoggedOut } = authSlice.actions;
export default authSlice.reducer;
