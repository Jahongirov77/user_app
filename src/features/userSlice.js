// react redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// axios
import axiosClient from "../utils/axios";

const initialState = {
  user: null,
  pending: false,
  products: [],
};

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const user = await axiosClient.post("/auth/get-user", {
    access_token: window.localStorage.getItem("access_token"),
  });

  return user.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;

      window.localStorage.setItem("access_token", payload.access_token);
      window.localStorage.setItem("refresh_token", payload.refresh_token);
    },
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkUser.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(checkUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.pending = false;
    });
    builder.addCase(checkUser.rejected, (state, { payload }) => {
      console.log(payload);
      state.pending = false;
    });
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
