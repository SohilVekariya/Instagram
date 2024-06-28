import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  isLoggedIn: boolean;
  token:string;
  user: object ; // Replace 'any' with the expected type of your response data
  ErrorMessage:string ;
  isError:boolean;
  isloading:boolean;
  success:boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: localStorage.getItem("login") ?? '',
  user: {},
  ErrorMessage:'',
  isError:false,
  isloading:false,
  success:false
};

export interface LoginResponse {
  IsSuccess: boolean
  user:object
}

export const login = createAsyncThunk<
  LoginResponse,
  object,
  { rejectValue: string }
>("/auth/login", async (data,thunkAPI) => {
  try{
    const response = await axiosInstance.post("/Auth/Login", data);
    if (response.status >= 200 && response.status < 300) {
             return response.data;
         } else {
             return thunkAPI.rejectWithValue(await response.data);
         }
  }
  catch (error) {
    if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ message: error.message });
    }
}
});

export const signup = createAsyncThunk("/auth/signup",async (data, thunkAPI) => {
  try{
    const response = await axiosInstance.post("/Auth/Register", data);
    if (response.status >= 200 && response.status < 300) {
             return response.data;
         } else {
             return thunkAPI.rejectWithValue(await response.data);
         }
  }
  catch (error) {
    if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ message: error.message });
    }
}
})

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
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
  },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.ErrorMessage = '';
      state.token = action.payload.data.token;
      state.isloading = false
      localStorage.setItem("token",state.token)
    })
  //   .addCase(login.pending, (state, action) => {
  //     state.isloading = true;
  // })
    .addCase(login.rejected,(state,action) => {
      state.isLoggedIn = false;
      state.ErrorMessage = action.payload.message;
      state.success = false
      state.isError =true
      state.isloading = false
      state.user = {}
      ;
    })
  //   .addCase(signup.pending, (state, action) => {
  //     state.isloading = true;
  // })
  .addCase(signup.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.user = {};
      state.ErrorMessage = action.payload.data[0].message;
      state.success = false;
      state.isError = true;
      state.isloading = false;
  })
  .addCase(signup.fulfilled, (state, action) => {
      state.success = true;
      state.isloading = false;
  })
  },
});


export const {logout} = authSlice.actions;
export const useSelectorUserState = () => {
  const userState = useSelector((state: RootState) => state.auth);
  return userState;
};

export default authSlice.reducer;
