import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login-form`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register-form`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    admin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/admin`,
        method: "POST",
        body: data,
      }),
    }),
    manageuser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/admin-user-list`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-user-list`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useAdminMutation,
  useManageuserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
