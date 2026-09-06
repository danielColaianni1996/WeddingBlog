import type { CreateRsvpPartyRequest } from "../../../services/weddingBlogApi";
import { createBlankGuest } from "./GuestFieldsList";
import type { RsvpFormState } from "./types";

export const initialRsvpFormState: RsvpFormState = {
  guests: [{ ...createBlankGuest(), clientKey: "primary" }],
  notes: ""
};

export function toCreateRsvpRequest(
  formState: RsvpFormState
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
