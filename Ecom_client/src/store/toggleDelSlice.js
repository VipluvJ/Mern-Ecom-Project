import { createSlice } from "@reduxjs/toolkit";

const initialDelVal = { del: null };

const toggleDelSlice = createSlice({
  name: "toggleDel",
  initialState: initialDelVal,
  reducers: {
    setDelVal: (state, action) => {
      state.del = action.payload;
      console.log(state);
    },
  },
});

export const { setDelVal } = toggleDelSlice.actions;
export default toggleDelSlice.reducer;
