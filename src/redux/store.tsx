import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer, {AuthState } from "./slices/AuthSlice";

export type RootState = {
  auth: AuthState;
};

const store = configureStore({
    reducer: {
      auth: authSliceReducer,
    },
    devTools: true,
  });


export default store;
  