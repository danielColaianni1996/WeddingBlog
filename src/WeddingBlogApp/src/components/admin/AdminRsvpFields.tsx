import type { AdminRsvpFormState } from "./types";

type AdminRsvpFieldsProps = {
  formState: AdminRsvpFormState;
  onChange: (field: keyof AdminRsvpFormState, value: string) => void;
};

export function AdminRsvpFields({ formState, onChange }: AdminRsvpFieldsProps) {
  return (
    <>
      <div className="admin-form-grid">
        <label>
          Nome
          <input
            type="text"
            value={formState.firstName}
            onChange={(event) => onChange("firstName", event.target.value)}
            required
          />
        </label>
        <label>
          Cognome
          <input
            type="text"
            value={formState.lastName}
            onChange={(event) => onChange("lastName", event.target.value)}
            required
          />
        </label>
        <label>
          Numero adulti
          <input
            type="number"
            min="1"
            max="12"
            value={formState.adultsCount}
            onChange={(event) => onChange("adultsCount", event.target.value)}
            required
          />
        </label>
        <label>
          Numero bambini
          <input
            type="number"
            min="0"
            max="12"
            value={formState.childrenCount}
            onChange={(event) => onChange("childrenCount", event.target.value)}
            required
          />
        </label>
      </div>

      <label>
        Allergie o preferenze alimentari
        <textarea
          value={formState.foodNotes}
          onChange={(event) => onChange("foodNotes", event.target.value)}
          rows={3}
        />
      </label>
    </>
  );
}
