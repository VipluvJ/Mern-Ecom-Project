import { apiSlice } from "./apiSlice";
const PRODUCT_URL = "/api/product";
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    manageProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCT_URL}/all-products`,
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/remove-product`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useCreateProductMutation,
  useManageProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
