export type GuestFormState = {
  clientKey: string;
  firstName: string;
  lastName: string;
  isChild: boolean;
  age: string;
  allergies: string;
};

export type RsvpFormState = {
  guests: Array<GuestFormState>;
  notes: string;
};

export type RsvpDialogState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;
