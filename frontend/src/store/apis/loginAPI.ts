import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAPI = createApi({
  reducerPath: "api", // Unique key for the slice in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api-url.com/api", // Replace with your backend's base URL
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginAPI;
