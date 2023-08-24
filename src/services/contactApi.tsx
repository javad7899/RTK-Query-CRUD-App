import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { conatctApi } from "../model/contactApi.modal";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["contactApi"],
  endpoints: (builder) => ({
    contacts: builder.query<conatctApi[], void>({
      query: () => "/contacts",
      providesTags: ["contactApi"],
    }),
    contact: builder.query<conatctApi[], void>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["contactApi"],
    }),
    addContact: builder.mutation<object, conatctApi>({
      query: (contact) => ({
        url: "/contacts",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["contactApi"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contactApi"],
    }),
    updateContact: builder.mutation<void, conatctApi>({
      query: ({ id, ...reset }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: reset,
      }),
      invalidatesTags: ["contactApi"],
    }),
  }),
});

export const {
  useContactQuery,
  useContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation
} = contactApi;
