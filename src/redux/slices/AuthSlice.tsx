import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: object | LoginResponse | null; // Replace 'any' with the expected type of your response data
  error:string | null;
}

const initialState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  user: {},
  error:null,
};

export interface LoginResponse {
  success: boolean;
}

export const login = createAsyncThunk<
  LoginResponse,
  object,
  { rejectValue: string }
>("/auth/login", async (userCredentials) => {
    const request = await axiosInstance.post("/auth/login", userCredentials);
    const response = await request.data.data;
    console.log(request);
    console.log(response);
    localStorage.setItem('user',JSON.stringify(response))
    return response;
});

// export const logout = createAsyncThunk("/auth/logout", async (data) => {
//   const res = promiseToaster(
//     axiosInstance.get(EndPoints.Auth.Get.Logout),
//     Messages.Loading.Auth.Logout
//   );

//   return (await res).data;
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = action?.payload?.success;
      state.user = action?.payload;
      state.error = null;
    })
    .addCase(login.rejected,(state,action) => {
      state.isLoading = false;
      state.user = null;
      console.log(action.error.message);
      state.error = `${action.error.message}`
      ;
    })
  },
});

// export const {} = authSlice.actions;
export const useSelectorUserState = () => {
  const userState = useSelector((state: RootState) => state.auth);
  return userState;
};

export default authSlice.reducer;
