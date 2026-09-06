import { GuestFieldsList } from "../sections/rsvp/GuestFieldsList";
import type { GuestFormState } from "../sections/rsvp/types";
import type { AdminRsvpFormState } from "./types";

type AdminRsvpFieldsProps = {
  formState: AdminRsvpFormState;
  onGuestsChange: (guests: Array<GuestFormState>) => void;
  onNotesChange: (notes: string) => void;
};

export function AdminRsvpFields({
  formState,
  onGuestsChange,
  onNotesChange
}: AdminRsvpFieldsProps) {
  return (
    <>
      <GuestFieldsList guests={formState.guests} onChange={onGuestsChange} />

      <label>
        Note generali
        <textarea
          value={formState.notes}
          onChange={(event) => onNotesChange(event.target.value)}
          rows={3}
        />
      </label>
    </>
  );
}
