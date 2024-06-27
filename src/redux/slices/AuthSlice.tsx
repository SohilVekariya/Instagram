import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean,
  data: object | LoginResponse | null; // Replace 'any' with the expected type of your response data
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  data: {},
};

export interface LoginResponse {
  success: boolean;
}

export const login = createAsyncThunk<
  LoginResponse,
  any,
  { rejectValue: string }
>("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    return rejectWithValue("Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
