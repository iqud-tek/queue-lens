import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API for Queue Details
export const queueDetailsAPI = createApi({
  reducerPath: "queueDetailsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["QueueDetails", "JobDetails"], // Define tags for cache management
  endpoints: (builder) => ({
    fetchQueueMetrics: builder.query({
      query: (id) => ({
        url: `/queue-metrics?id=${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "QueueDetails", id }],
    }),
    createQueueDetails: builder.mutation({
      query: (newQueueDetails) => ({
        url: "/queueDetails",
        method: "POST",
        body: newQueueDetails,
      }),
      invalidatesTags: [{ type: "QueueDetails", id: "LIST" }],
    }),
    updateQueueDetails: builder.mutation({
      query: ({ id, updatedQueueDetails }) => ({
        url: `/queueDetails/${id}`,
        method: "PUT",
        body: updatedQueueDetails,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "QueueDetails", id }],
    }),
    deleteQueueDetails: builder.mutation({
      query: (id) => ({
        url: `/queueDetails/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "QueueDetails", id }],
    }),
    // Add the new endpoint for fetching jobs with filters
    fetchQueryTblJobs: builder.query({
      query: ({ filter, perPage, page }) => {
        const params = new URLSearchParams(filter).toString();
        console.log(params);

        return {
          url: `/queue-jobs?_limit=${perPage}&_page=${page}`, // Append query parameters
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? result.map(({ id }: { id: string }) => ({ type: "JobDetails", id })) // Add tags for each job
          : [{ type: "JobDetails", id: "LIST" }], // General LIST tag for table
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/queue-jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "JobDetails", id },
        { type: "JobDetails", id: "LIST" }, // Invalidate LIST tag to refetch the table
      ],
    }),
  }),
});

// Export the hooks for using the endpoints
export const {
  useFetchQueueMetricsQuery,
  useCreateQueueDetailsMutation,
  useUpdateQueueDetailsMutation,
  useDeleteQueueDetailsMutation,
  useFetchQueryTblJobsQuery,
  useDeleteJobMutation,
} = queueDetailsAPI;
