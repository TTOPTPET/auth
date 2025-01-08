import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, logout } = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectIsAuthenticated = (state) =>
  (state.user.userInfo && state.user.userInfo?.token) ||
  localStorage.getItem("token") !== null;

export default userSlice.reducer;
