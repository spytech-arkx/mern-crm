import { snazApi } from "./auth";

const extendedApi = snazApi.injectEndpoints({
  endpoints: (builder) => ({
    getDealsList: builder.query({
      query: () => `/deals`,
      providesTags: ["Deal"],
    }), 
    deleteDeal: builder.mutation({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deal"],
    }),
    editDeal: builder.mutation({
      query: ({id, data}) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Deal"],
    }),
    createDeal: builder.mutation({
      query: (data) => ({
        url: `/deals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Deal"],
    }),
  }),
});

export const {
  useCreateDealMutation,
  useDeleteDealMutation,
  useEditDealMutation,
  useGetDealsListQuery,
} = extendedApi
