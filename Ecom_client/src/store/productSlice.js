import { createSlice } from "@reduxjs/toolkit";

const initialAllProductState = { listOfProducts: [] };

const productSlice = createSlice({
  name: "allProducts",
  initialState: initialAllProductState,
  reducers: {
    getProduct: (state, action) => {
      console.log("not working");
      state.listOfProducts = action.payload.product;
      console.log(state.listOfProducts);
    },
  },
});

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;
