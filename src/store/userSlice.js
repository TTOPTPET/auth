import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      // const response = await requests.get("api/profile/");
      const response = {
        data: {
          id: 1,
          username: "test@test.ru",
          full_name: "admin",
          token: "eTestToken",
        },
        status: 200,
      };
      thunkAPI.dispatch(setUserInfo(response.data));
    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
      throw error;
    }
  }
);

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
