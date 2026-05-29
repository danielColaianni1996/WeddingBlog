import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5240/api";

export type CreateRsvpResponseRequest = {
  firstName: string;
  lastName: string;
  adultsCount: number;
  childrenCount: number;
  foodNotes?: string;
};

export type RsvpResponse = CreateRsvpResponseRequest & {
  id: number;
  createdAtUtc: string;
};

export const weddingBlogApi = createApi({
  reducerPath: "weddingBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: "include"
  }),
  tagTypes: ["Rsvp"],
  endpoints: (builder) => ({
    createRsvpResponse: builder.mutation<RsvpResponse, CreateRsvpResponseRequest>({
      query: (body) => ({
        url: "rsvp",
        method: "POST",
        body
      }),
      invalidatesTags: ["Rsvp"]
    })
  })
});

export const { useCreateRsvpResponseMutation } = weddingBlogApi;
