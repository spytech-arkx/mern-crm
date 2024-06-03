import { snazApi } from "./auth";
const contactExtention = snazApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactsList: builder.query({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),
    getContactById: builder.query({
      query: (id) => `/contacts/${id}`,
      providesTags: (id) => [{ type: `Contact`, id }],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    editContact: builder.mutation({
      query: ({ id, contact }) => ({
        url: `/contacts/${id}`,
        method: "PATCH",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: `/contacts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
  useGetContactsListQuery,
  useGetContactByIdQuery,
} = contactExtention;
