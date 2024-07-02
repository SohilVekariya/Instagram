import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProfileState {
    user: object; // Replace 'any' with the expected type of your response data
    ErrorMessage: string;
    SuccessMessage: string;
    isError: boolean;
    isloading: boolean;
    success: boolean;
    profilePicture: string;
  }

  const initialState = {
    ErrorMessage: "",
    SuccessMessage: "",
    isError: false,
    isloading: false,
    success: false,
    user: {},
    profilePicture:'',
  };

  export const getProfilePicture = createAsyncThunk(
    "/File/GetProfilepicture",
    async (data, thunkAPI) => {
      try {
        const response = await axiosInstance.get(
          `/File/ProfilePicture/${data}`
        );
        if (response.data.isSuccess) {
          return response.data;
        } else {
          return thunkAPI.rejectWithValue(await response.data);
        }
      } catch (error) {
        if (error.response) {
          return thunkAPI.rejectWithValue(error.response.data);
        } else {
          return thunkAPI.rejectWithValue({ message: error.message });
        }
      }
    }
  );

  
  const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
      .addCase(getProfilePicture.fulfilled, (state, action) => {
        state.success = true;
        state.profilePicture =action.payload.data
      })
      .addCase(getProfilePicture.rejected, (state, action) => {
        state.isError = true;
        state.ErrorMessage = action.payload.message;
      })
    },
  });

  export const { } = profileSlice.actions;
export const useSelectorProfileState = () => {
  const userState = useSelector((state: RootState) => state.profile);
  return userState;
};

export default profileSlice.reducer;

  