import type { CreateRsvpResponseRequest } from "../../../services/weddingBlogApi";
import type { RsvpFormState } from "./types";

export const initialRsvpFormState: RsvpFormState = {
  firstName: "",
  lastName: "",
  adultsCount: "1",
  childrenCount: "0",
  foodNotes: ""
};

export function toCreateRsvpRequest(
  formState: RsvpFormState
): CreateRsvpResponseRequest {
  return {
    firstName: formState.firstName.trim(),
    lastName: formState.lastName.trim(),
    adultsCount: Number(formState.adultsCount),
    childrenCount: Number(formState.childrenCount),
    foodNotes: formState.foodNotes.trim() || undefined
  };
}
