import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const snazApi = createApi({
  reducerPath: 'snazApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api',
  prepareHeaders(headers) {
    const token = import.meta.env.VITE_API_KEY;
    if(token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }
}),
  endpoints: (builder) => ({
    getTasksList: builder.query({
      query: () => `/tasks`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksListQuery } = snazApi;