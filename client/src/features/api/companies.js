import { snazApi } from "./auth";

const extension = snazApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompaniesList: builder.query({
      query: () => `/companies`,
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query({
      query: (id) => `/companies/${id}`,
      providesTags: (id) => [{ type: `Company`, id }],
    }),
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    editCompany: builder.mutation({
      query: ({ id, company }) => ({
        url: `/companies/${id}`,
        method: "PATCH",
        body: company,
      }),
      invalidatesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (data) => ({
        url: `/companies`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useEditCompanyMutation,
  useGetCompaniesListQuery,
  useGetCompanyByIdQuery,
} = extension;
