import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const snazApi = createApi({
  reducerPath: "snazApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders(headers) {
      const token = import.meta.env.VITE_API_KEY;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasksList: builder.query({
      query: () => `/tasks`,
      providesTags: ["Task"],
    }), 
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    editTask: builder.mutation({
      query: ({id, data}) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { assignee: data },
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useDeleteTaskMutation, useEditTaskMutation, useGetTasksListQuery } = snazApi;
