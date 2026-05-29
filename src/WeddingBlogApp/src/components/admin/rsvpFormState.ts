import type {
  CreateRsvpResponseRequest,
  RsvpResponse
} from "../../services/weddingBlogApi";
import type { AdminRsvpFormState } from "./types";

export const initialRsvpFormState: AdminRsvpFormState = {
  firstName: "",
  lastName: "",
  adultsCount: "1",
  childrenCount: "0",
  foodNotes: ""
};

export function toAdminFormState(response: RsvpResponse): AdminRsvpFormState {
  return {
    firstName: response.firstName,
    lastName: response.lastName,
    adultsCount: String(response.adultsCount),
    childrenCount: String(response.childrenCount),
    foodNotes: response.foodNotes ?? ""
  };
}

export function toRsvpRequest(
  formState: AdminRsvpFormState
): CreateRsvpResponseRequest {
  return {
    firstName: formState.firstName.trim(),
    lastName: formState.lastName.trim(),
    adultsCount: Number(formState.adultsCount),
    childrenCount: Number(formState.childrenCount),
    foodNotes: formState.foodNotes.trim() || undefined
  };
}
