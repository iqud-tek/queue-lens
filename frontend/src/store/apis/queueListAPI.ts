import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API for Queue List
export const queueListAPI = createApi({
  reducerPath: "queueListAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["QueueList"], // Define tags for cache management
  endpoints: (builder) => ({
    fetchQueueList: builder.query({
      query: ({ page, perPage }) => ({
        url: `/queueList?_limit=${perPage}&_page=${page}`,
        method: "GET",
      }),
      providesTags: (result, _, { page, perPage }) => {
        // Cache the list based on page and perPage
        return result
          ? [
              { type: "QueueList", id: "LIST" },
              { type: "QueueList", id: `${page}-${perPage}` },
            ]
          : [{ type: "QueueList", id: "LIST" }];
      },
    }),
    createQueue: builder.mutation({
      query: (newQueue) => ({
        url: "/queueList",
        method: "POST",
        body: newQueue,
      }),
      invalidatesTags: [{ type: "QueueList", id: "LIST" }], // Invalidate LIST to refetch
    }),
    updateQueue: builder.mutation({
      query: ({ id, updatedQueue }) => ({
        url: `/queueList/${id}`,
        method: "PUT",
        body: updatedQueue,
      }),
      invalidatesTags: [{ type: "QueueList", id: "LIST" }], // Invalidate LIST to refetch
    }),
    deleteQueue: builder.mutation({
      query: (id) => ({
        url: `/queueList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "QueueList", id: "LIST" }], // Invalidate LIST to refetch
    }),
  }),
});

// Export the hooks for using the endpoints
export const {
  useFetchQueueListQuery,
  useCreateQueueMutation,
  useUpdateQueueMutation,
  useDeleteQueueMutation,
} = queueListAPI;
