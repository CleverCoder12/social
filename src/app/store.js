import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "../features/Model/modelSlice";
import userReducer from "../features/User/userSlice";

export const store = configureStore({
  reducer: {
    model: modelReducer,
    user: userReducer,
  },
});
