import { snazApi } from "./auth";

const extendedApi = snazApi.injectEndpoints({
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
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTasksListQuery,
} = extendedApi