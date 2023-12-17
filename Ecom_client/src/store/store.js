import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authReducer from "./authSlice";
import cartSliceReducer from "./cartSlice";
import getAllCategoryReducer from "./categorySlice";
import allProductsReducer from "./productSlice";
import toggleDelReducer from "./toggleDelSlice";
import toggleIdReducer from "./toggleIdSlice";
import allUsersReducer from "./usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allusers: allUsersReducer,
    allProducts: allProductsReducer,
    toggleId: toggleIdReducer,
    toggleDel: toggleDelReducer,
    allCategory: getAllCategoryReducer,
    cart: cartSliceReducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
