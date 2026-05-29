export type RsvpFormState = {
  firstName: string;
  lastName: string;
  adultsCount: string;
  childrenCount: string;
  foodNotes: string;
};

export type RsvpDialogState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;
