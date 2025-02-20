import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API for Queue List
export const testConnectionAPI = createApi({
  reducerPath: "testConnectionAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Alert"], // Define tags for cache management
  endpoints: (builder) => ({
    fetchAlert: builder.query({
      query: ({ page, perPage }) => ({
        url: `/alertList?_per_page=${perPage}&_page=${page}`,
        method: "GET",
      }),
      providesTags: ["Alert"],
    }),
  }),
});

// Export the hooks for using the endpoints
export const { useFetchAlertQuery } = testConnectionAPI;
