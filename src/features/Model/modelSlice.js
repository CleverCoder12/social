import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  starter: false,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setmodels: (state, action) => {
      state.starter = action.payload.starter;
    },
  },
});

export const { setmodels } = modelSlice.actions;
export const selectModels = (state) => state.model.starter;

export default modelSlice.reducer;
