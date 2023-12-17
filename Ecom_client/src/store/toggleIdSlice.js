import { createSlice } from "@reduxjs/toolkit";

const initialIdVal = { userId: "" };

const toggleIdSlice = createSlice({
  name: "toggleId",
  initialState: initialIdVal,
  reducers: {
    setIdVal: (state, action) => {
      state.userId = action.payload;
      console.log(state);
    },
  },
});

export const { setIdVal } = toggleIdSlice.actions;
export default toggleIdSlice.reducer;
