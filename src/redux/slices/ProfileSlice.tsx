import { useSelector } from "react-redux";
import axiosInstance from "../../helpers/axioseInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { act } from "react-dom/test-utils";

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
          `/File/ProfilePicture/${data}`,{
            responseType: 'blob', // Ensure response type is Blob
          }
        );
        if (response.status>=200 && response.status<=299) {
            const blob = response.data;

            // Convert blob to base64
          const reader = new FileReader();

          return new Promise((resolve, reject) => {
            reader.onloadend = () => {
              const base64data = reader.result; // base64 data
              resolve(base64data);
            };
            reader.onerror = () => {
              reject(
                thunkAPI.rejectWithValue({
                  message: "Error converting to base64",
                })
              );
            };

            reader.readAsDataURL(blob);
          });
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

  export const postProfilePicture = createAsyncThunk(
    "/User/ProfilePicture",
    async (data, thunkAPI) => {
      try {
        console.log(data);
        const response = await axiosInstance.post("/User/ProfilePicture", data);
        if (response.data.isSuccess) {
          return data;
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
        state.profilePicture = action.payload;
      })
      .addCase(getProfilePicture.rejected, (state, action) => {
        state.success = false;
        state.isError = true;
      })
      .addCase(postProfilePicture.fulfilled, (state, action) => {
        state.isError = true;
        state.success = true;
      })
      .addCase(postProfilePicture.rejected, (state, action) => {
        state.success = false;
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

  