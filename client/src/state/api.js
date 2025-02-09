import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
    reducerPath: 'adminApi',
    tagTypes: ['User','Products', 'Customers', 'Transaction','Geography','Sales','Admins','Performance','Dashboard'],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ['User'],
        }),
        getProducts:build.query({
            query: ()=> 'client/products',
            providesTags:['Products'],
        }),
        getCustomers:build.query({
            query: ()=> 'client/customers',
            provideTags:['Customers']
        }),
        getTransaction: build.query({
            query:({page,pageSize, sort, search}) => ({
                url:'client/transaction',
                method:'GET',
                params:{page, pageSize, sort, search},
            }),
            provideTags: ['Transaction']
        }),
        getGeography:build.query({
            query:() => 'client/geography',
            provideTags:["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
          }),
          getAdmins:build.query({
            query: ()=> 'management/admins',
            provideTags: ['Admins']
          }),
          getUserPerformance:build.query({
            query: (id) => `management/performance/${id}`,
            provideTags:['Performance']
          }),
          getDashboard:build.query({
            query:()=> 'general/dashboard',
            provideTags:['Dashboard']
          })
    }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery,useGetTransactionQuery, useGetGeographyQuery,useGetSalesQuery,useGetAdminsQuery,useGetUserPerformanceQuery,useGetDashboardQuery } = api;
