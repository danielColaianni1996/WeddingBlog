import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5240/api";

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

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  userName: string;
};

export const weddingBlogApi = createApi({
  reducerPath: "weddingBlogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: "include"
  }),
  tagTypes: ["Rsvp"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body
      }),
      invalidatesTags: ["Rsvp"]
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST"
      }),
      invalidatesTags: ["Rsvp"]
    }),
    getRsvpResponses: builder.query<Array<RsvpResponse>, void>({
      query: () => "rsvp",
      providesTags: ["Rsvp"]
    }),
    createRsvpResponse: builder.mutation<
      RsvpResponse,
      CreateRsvpResponseRequest
    >({
      query: (body) => ({
        url: "rsvp",
        method: "POST",
        body
      }),
      invalidatesTags: ["Rsvp"]
    })
  })
});

export const {
  useCreateRsvpResponseMutation,
  useGetRsvpResponsesQuery,
  useLoginMutation,
  useLogoutMutation
} = weddingBlogApi;
