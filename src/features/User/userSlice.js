import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  img: null,
  uid: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.name = action.payload.name;
      state.img = action.payload.img;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    setLogOut: (state, action) => {
      state.name = null;
      state.img = null;
      state.uid = null;
      state.email = null;
    },
  },
});

export const { setLogin, setLogOut } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectImg = (state) => state.user.img;
export const selectUid = (state) => state.user.uid;
export const selectEmail = (state) => state.user.email;

export default userSlice.reducer;
