import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, {AuthState } from "./slices/AuthSlice";
import profileSliceReducer from "./slices/ProfileSlice";
import { ProfileState } from "./slices/ProfileSlice";

export type RootState = {
  auth: AuthState;
  profile:ProfileState;
};

const store = configureStore({
    reducer: {
      auth: authSliceReducer,
      profile: profileSliceReducer
    },
  });

export type AppDispatch = typeof store.dispatch;
export default store;
  