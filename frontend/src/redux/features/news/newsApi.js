import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/news/`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery,
    tagTypes: ['News'],
    endpoints: (builder) => ({
        fetchAllNews: builder.query({
            query: () => '/',
            providesTags: ['News']
        }),
        fetchNewsById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'News', id }]
        }),
        addNews: builder.mutation({
            query: (newArticle) => ({
                url: '/create-news',
                method: 'POST',
                body: newArticle
            }),
            invalidatesTags: ['News']
        }),
        updateNews: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['News']
        }),
        deleteNews: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['News']
        }),
    })
});

export const {
    useFetchAllNewsQuery,
    useFetchNewsByIdQuery,
    useAddNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation
} = newsApi;

export default newsApi;
