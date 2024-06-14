import { snazApi } from "./auth";

const extendedApi = snazApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (id) => [{ type: `User`, id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User", "Auth"],
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersListQuery,
} = extendedApi;
