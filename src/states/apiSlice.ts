import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getEmployeeById: builder.query<void, void>({
      query: () => '/employee/get/1',
    }),
  }),
});

export const { useGetEmployeeByIdQuery } = employeeApi;
