import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a type for the tags in the API

export const dashboardAPI = createApi({
  reducerPath: "dashboardAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["DashboardData"], // Ensure the tag type matches
  endpoints: (builder) => ({
    fetchDashboardData: builder.query({
      query: ({ page, perPage }) => ({
        url: `/tableData?_per_page=${perPage}&_page=${page}`,
        method: "GET",
      }),
      providesTags: (result, _, { page, perPage }) => {
        // Return a list of tags, including a generic "LIST" tag for all pages
        return result
          ? [
              { type: "DashboardData", id: "LIST" },
              { type: "DashboardData", id: `${page}-${perPage}` },
            ]
          : [{ type: "DashboardData", id: "LIST" }];
      },
    }),
    fetchSingleDashboardEntry: builder.query({
      query: (id) => ({ url: `/tableData/${id}`, method: "GET" }),
      providesTags: (__, _, id) => [{ type: "DashboardData", id }], // Return a single tag for this entry
    }),
    createDashboardEntry: builder.mutation({
      query: (newEntry) => ({
        url: "/tableData",
        method: "POST",
        body: newEntry,
      }),
      invalidatesTags: [{ type: "DashboardData", id: "LIST" }], // Invalidate the LIST tag
    }),
    updateDashboardEntry: builder.mutation({
      query: ({ id, updatedEntry }) => ({
        url: `/tableData/${id}`,
        method: "PUT",
        body: updatedEntry,
      }),
      invalidatesTags: [{ type: "DashboardData", id: "LIST" }], // Invalidate the LIST tag
    }),
    deleteDashboardEntry: builder.mutation({
      query: (id) => ({
        url: `/tableData/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "DashboardData", id: "LIST" }], // Invalidate the LIST tag
    }),
  }),
});

export const {
  useFetchDashboardDataQuery,
  useFetchSingleDashboardEntryQuery,
  useCreateDashboardEntryMutation,
  useUpdateDashboardEntryMutation,
  useDeleteDashboardEntryMutation,
} = dashboardAPI;
