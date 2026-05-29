import type { FormEvent } from "react";
import type { RsvpFormState } from "./types";

type RsvpFormProps = {
  formState: RsvpFormState;
  isLoading: boolean;
  onFieldChange: (field: keyof RsvpFormState, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function RsvpForm({
  formState,
  isLoading,
  onFieldChange,
  onSubmit
}: RsvpFormProps) {
  return (
    <form className="rsvp-form" onSubmit={onSubmit}>
      <div className="rsvp-form__grid">
        <label>
          Nome
          <input
            name="firstName"
            type="text"
            placeholder="Es. Maria"
            value={formState.firstName}
            onChange={(event) => onFieldChange("firstName", event.target.value)}
            required
          />
        </label>

        <label>
          Cognome
          <input
            name="lastName"
            type="text"
            placeholder="Es. Rossi"
            value={formState.lastName}
            onChange={(event) => onFieldChange("lastName", event.target.value)}
            required
          />
        </label>
      </div>

      <div className="rsvp-form__grid">
        <label>
          Numero adulti
          <input
            name="adultsCount"
            type="number"
            min="1"
            max="12"
            value={formState.adultsCount}
            onChange={(event) =>
              onFieldChange("adultsCount", event.target.value)
            }
            required
          />
        </label>

        <label>
          Numero bambini
          <input
            name="childrenCount"
            type="number"
            min="0"
            max="12"
            value={formState.childrenCount}
            onChange={(event) =>
              onFieldChange("childrenCount", event.target.value)
            }
            required
          />
        </label>
      </div>

      <label>
        Allergie o preferenze alimentari
        <textarea
          name="foodNotes"
          placeholder="Es. vegetariano, no frutta secca, celiachia..."
          value={formState.foodNotes}
          onChange={(event) => onFieldChange("foodNotes", event.target.value)}
          rows={4}
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
