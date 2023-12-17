import { createSlice } from "@reduxjs/toolkit";

const initialAllCategoryState = { listOfCategory: [] };

const categorySlice = createSlice({
  name: "allCategory",
  initialState: initialAllCategoryState,
  reducers: {
    getAllCategory: (state, action) => {
      console.log("not working");
      state.listOfCategory = action.payload.categories;
      console.log(state.listOfCategory);
    },
  },
});

export const { getAllCategory } = categorySlice.actions;

export default categorySlice.reducer;
