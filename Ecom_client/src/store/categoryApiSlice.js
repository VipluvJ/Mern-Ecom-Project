import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/category";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allCategory: builder.mutation({
      query: () => ({
        url: `${CATEGORY_URL}/all-category`,
        method: "GET",
      }),
    }),
  }),
});
export const { useAllCategoryMutation } = categoryApiSlice;
