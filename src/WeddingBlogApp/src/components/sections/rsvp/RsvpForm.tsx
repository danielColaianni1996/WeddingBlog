import type { FormEvent } from "react";
import { GuestFieldsList } from "./GuestFieldsList";
import type { GuestFormState, RsvpFormState } from "./types";

type RsvpFormProps = {
  formState: RsvpFormState;
  isLoading: boolean;
  onGuestsChange: (guests: Array<GuestFormState>) => void;
  onNotesChange: (notes: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function RsvpForm({
  formState,
  isLoading,
  onGuestsChange,
  onNotesChange,
  onSubmit
}: RsvpFormProps) {
  return (
    <form className="rsvp-form" onSubmit={onSubmit}>
      <GuestFieldsList guests={formState.guests} onChange={onGuestsChange} />

      <label>
        Note generali
        <textarea
          name="notes"
          placeholder="Es. arriveremo con qualche minuto di ritardo, ci serve un seggiolone..."
          value={formState.notes}
          onChange={(event) => onNotesChange(event.target.value)}
          rows={3}
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="rsvp-button-loader" aria-hidden="true" />
            Invio in corso
          </>
        ) : (
          "Conferma partecipazione"
        )}
      </button>
    </form>
  );
}
