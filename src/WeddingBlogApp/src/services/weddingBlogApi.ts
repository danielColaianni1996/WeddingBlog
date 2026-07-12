import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "./supabaseClient";

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
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  isAdmin: boolean;
};

type RsvpResponseRow = {
  id: number;
  first_name: string;
  last_name: string;
  adults_count: number;
  children_count: number;
  food_notes: string | null;
  created_at_utc: string;
};

type SupabaseApiError = {
  status: "SUPABASE_ERROR";
  error: string;
};

type SupabaseResult<T> = { data: T } | { error: SupabaseApiError };

const rsvpColumns =
  "id, first_name, last_name, adults_count, children_count, food_notes, created_at_utc";

function toApiError(error: { message: string }): SupabaseApiError {
  return {
    status: "SUPABASE_ERROR",
    error: error.message
  };
}

function getConfiguredSupabase():
  | { client: SupabaseClient }
  | { error: SupabaseApiError } {
  try {
    return { client: getSupabase() };
  } catch (error) {
    return { error: toApiError(error as Error) };
  }
}

function toRsvpResponse(row: RsvpResponseRow): RsvpResponse {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    adultsCount: row.adults_count,
    childrenCount: row.children_count,
    foodNotes: row.food_notes ?? undefined,
    createdAtUtc: row.created_at_utc
  };
}

function toRsvpRow(request: CreateRsvpResponseRequest) {
  return {
    first_name: request.firstName,
    last_name: request.lastName,
    adults_count: request.adultsCount,
    children_count: request.childrenCount,
    food_notes: request.foodNotes ?? null
  };
}

async function getIsAdmin(
  supabase: SupabaseClient
): Promise<SupabaseResult<boolean>> {
  const { data, error } = await supabase.rpc("is_admin");

  if (error) {
    return { error: toApiError(error) };
  }

  return { data: Boolean(data) };
}

export const weddingBlogApi = createApi({
  reducerPath: "weddingBlogApi",
  baseQuery: fakeBaseQuery<SupabaseApiError>(),
  tagTypes: ["Rsvp", "Session"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async ({ email, password }) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          return { error: toApiError(error) };
        }

        const adminResult = await getIsAdmin(supabase);

        if ("error" in adminResult) {
          return { error: adminResult.error };
        }

        return {
          data: { email: data.user.email ?? email, isAdmin: adminResult.data }
        };
      },
      invalidatesTags: ["Rsvp", "Session"]
    }),
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { error } = await supabase.auth.signOut();

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: undefined };
      },
      invalidatesTags: ["Rsvp", "Session"]
    }),
    getCurrentUser: builder.query<LoginResponse | null, void>({
      queryFn: async () => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          return { error: toApiError(error) };
        }

        const email = data.session?.user.email;

        if (!email) {
          return { data: null };
        }

        const adminResult = await getIsAdmin(supabase);

        if ("error" in adminResult) {
          return { error: adminResult.error };
        }

        return { data: { email, isAdmin: adminResult.data } };
      },
      providesTags: ["Session"]
    }),
    getRsvpResponses: builder.query<Array<RsvpResponse>, void>({
      queryFn: async () => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { data, error } = await supabase
          .from("rsvp_responses")
          .select(rsvpColumns)
          .order("created_at_utc", { ascending: false });

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: (data as Array<RsvpResponseRow>).map(toRsvpResponse) };
      },
      providesTags: ["Rsvp"]
    }),
    createRsvpResponse: builder.mutation<void, CreateRsvpResponseRequest>({
      queryFn: async (body) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { error } = await supabase
          .from("rsvp_responses")
          .insert(toRsvpRow(body));

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: undefined };
      },
      invalidatesTags: ["Rsvp"]
    }),
    updateRsvpResponse: builder.mutation<
      RsvpResponse,
      { id: number; body: CreateRsvpResponseRequest }
    >({
      queryFn: async ({ id, body }) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { data, error } = await supabase
          .from("rsvp_responses")
          .update(toRsvpRow(body))
          .eq("id", id)
          .select(rsvpColumns)
          .single();

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: toRsvpResponse(data as RsvpResponseRow) };
      },
      invalidatesTags: ["Rsvp"]
    }),
    deleteRsvpResponse: builder.mutation<void, number>({
      queryFn: async (id) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { error } = await supabase
          .from("rsvp_responses")
          .delete()
          .eq("id", id);

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: undefined };
      },
      invalidatesTags: ["Rsvp"]
    })
  })
});

export const {
  useCreateRsvpResponseMutation,
  useDeleteRsvpResponseMutation,
  useGetCurrentUserQuery,
  useGetRsvpResponsesQuery,
  useLoginMutation,
  useLogoutMutation,
  useUpdateRsvpResponseMutation
} = weddingBlogApi;
