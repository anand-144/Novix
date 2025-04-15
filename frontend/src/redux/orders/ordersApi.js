import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../utils/baseUrl";

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: 'include',
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: 'include',
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/${id}/status`,  // Ensure this URL matches your backend route
        method: "PATCH",  // Use PATCH for partial update
        body: { orderStatus: status },
      }),
      // Invalidate tags to refresh the list of orders
      invalidatesTags: ['Orders'],
    }),
    
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useUpdateOrderStatusMutation,  // Export the update mutation
} = ordersApi;

export default ordersApi;
