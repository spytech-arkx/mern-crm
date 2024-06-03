import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const snazApi = createApi({
  reducerPath: "snazApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    // prepareHeaders(headers) {
    //   const token = import.meta.env.VITE_API_KEY;
    //   if (token) headers.set("Authorization", `Bearer ${token}`);
    //   return headers;
    // },
    credentials: "include",
  }),
  tagTypes: ["Task", "Company", "Auth", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    session: builder.query({
      query: () => '/auth/whoami',
      invalidatesTags: ["Auth"],
      providesTags: ["Auth"],
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useSessionQuery,
} = snazApi;
