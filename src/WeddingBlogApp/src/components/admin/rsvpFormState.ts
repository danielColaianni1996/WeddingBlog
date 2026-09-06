import type {
  CreateRsvpPartyRequest,
  RsvpParty
} from "../../services/weddingBlogApi";
import { createBlankGuest } from "../sections/rsvp/GuestFieldsList";
import type { AdminRsvpFormState } from "./types";

export const initialRsvpFormState: AdminRsvpFormState = {
  guests: [{ ...createBlankGuest(), clientKey: "primary" }],
  notes: ""
};

export function toAdminFormState(party: RsvpParty): AdminRsvpFormState {
  return {
    notes: party.notes ?? "",
    guests: party.guests.map((guest) => ({
      clientKey: String(guest.id),
      firstName: guest.firstName,
      lastName: guest.lastName,
      isChild: guest.isChild,
      age: guest.age !== undefined ? String(guest.age) : "",
      allergies: guest.allergies ?? ""
    }))
  };
}

export function toRsvpRequest(
  formState: AdminRsvpFormState
): CreateRsvpPartyRequest {
  return {
    notes: formState.notes.trim() || undefined,
    guests: formState.guests.map((guest, index) => ({
      firstName: guest.firstName.trim(),
      lastName: guest.lastName.trim(),
      isChild: guest.isChild,
      age: guest.isChild ? Number(guest.age) : undefined,
      allergies: guest.allergies.trim() || undefined,
      isPrimaryContact: index === 0
    }))
  };
}
