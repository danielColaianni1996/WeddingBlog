import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabase } from "./supabaseClient";

export type RsvpGuestInput = {
  firstName: string;
  lastName: string;
  isChild: boolean;
  age?: number;
  allergies?: string;
  isPrimaryContact: boolean;
};

export type RsvpGuest = RsvpGuestInput & {
  id: number;
};

export type CreateRsvpPartyRequest = {
  notes?: string;
  guests: Array<RsvpGuestInput>;
};

export type RsvpParty = {
  id: number;
  notes?: string;
  createdAtUtc: string;
  guests: Array<RsvpGuest>;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  isAdmin: boolean;
};

type RsvpGuestRow = {
  id: number;
  first_name: string;
  last_name: string;
  is_child: boolean;
  age: number | null;
  allergies: string | null;
  is_primary_contact: boolean;
  guest_order: number;
};

type RsvpPartyRow = {
  id: number;
  notes: string | null;
  created_at_utc: string;
  rsvp_guests: Array<RsvpGuestRow>;
};

type SupabaseApiError = {
  status: "SUPABASE_ERROR";
  error: string;
};

type SupabaseResult<T> = { data: T } | { error: SupabaseApiError };

const rsvpPartyColumns = `
  id,
  notes,
  created_at_utc,
  rsvp_guests (
    id, first_name, last_name, is_child, age, allergies, is_primary_contact, guest_order
  )
`;

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

function toRsvpGuest(row: RsvpGuestRow): RsvpGuest {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    isChild: row.is_child,
    age: row.age ?? undefined,
    allergies: row.allergies ?? undefined,
    isPrimaryContact: row.is_primary_contact
  };
}

function toRsvpParty(row: RsvpPartyRow): RsvpParty {
  return {
    id: row.id,
    notes: row.notes ?? undefined,
    createdAtUtc: row.created_at_utc,
    guests: [...row.rsvp_guests]
      .sort((a, b) => a.guest_order - b.guest_order)
      .map(toRsvpGuest)
  };
}

function toGuestPayload(guest: RsvpGuestInput) {
  return {
    first_name: guest.firstName,
    last_name: guest.lastName,
    is_child: guest.isChild,
    age: guest.age ?? null,
    allergies: guest.allergies ?? null,
    is_primary_contact: guest.isPrimaryContact
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
    getRsvpResponses: builder.query<Array<RsvpParty>, void>({
      queryFn: async () => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { data, error } = await supabase
          .from("rsvp_parties")
          .select(rsvpPartyColumns)
          .order("created_at_utc", { ascending: false });

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: (data as Array<RsvpPartyRow>).map(toRsvpParty) };
      },
      providesTags: ["Rsvp"]
    }),
    createRsvpResponse: builder.mutation<void, CreateRsvpPartyRequest>({
      queryFn: async (body) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { error } = await supabase.rpc("submit_rsvp", {
          p_notes: body.notes ?? null,
          p_guests: body.guests.map(toGuestPayload)
        });

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: undefined };
      },
      invalidatesTags: ["Rsvp"]
    }),
    updateRsvpResponse: builder.mutation<
      void,
      { id: number; body: CreateRsvpPartyRequest }
    >({
      queryFn: async ({ id, body }) => {
        const supabaseResult = getConfiguredSupabase();

        if ("error" in supabaseResult) {
          return { error: supabaseResult.error };
        }

        const supabase = supabaseResult.client;
        const { error } = await supabase.rpc("admin_update_rsvp_party", {
          p_party_id: id,
          p_notes: body.notes ?? null,
          p_guests: body.guests.map(toGuestPayload)
        });

        if (error) {
          return { error: toApiError(error) };
        }

        return { data: undefined };
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
          .from("rsvp_parties")
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
