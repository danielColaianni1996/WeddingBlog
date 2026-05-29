import type { FormEvent } from "react";
import { AdminRsvpFields } from "./AdminRsvpFields";
import type { AdminRsvpFormState, RsvpModalMode } from "./types";

type AdminRsvpModalProps = {
  mode: RsvpModalMode;
  formState: AdminRsvpFormState;
  message: string | null;
  error: string | null;
  isSaving: boolean;
  onChange: (field: keyof AdminRsvpFormState, value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AdminRsvpModal({
  mode,
  formState,
  message,
  error,
  isSaving,
  onChange,
  onClose,
  onSubmit
}: AdminRsvpModalProps) {
  return (
    <div
      className="admin-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-rsvp-modal-title"
    >
      <form className="admin-modal__panel" onSubmit={onSubmit}>
        <div className="admin-modal__heading">
          <h2 id="admin-rsvp-modal-title">
            {mode === "edit" ? "Modifica invitato" : "Aggiungi invitato"}
          </h2>
          <button
            type="button"
            className="admin-modal__close"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Chiudi modale"
          >
            x
          </button>
        </div>

        <AdminRsvpFields formState={formState} onChange={onChange} />

        {message && <p className="admin-form-message">{message}</p>}
        {error && <p className="admin-form-error">{error}</p>}

        <div className="admin-modal__actions">
          <button type="button" onClick={onClose} disabled={isSaving}>
            Chiudi
          </button>
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Salvataggio in corso" : "Salva"}
          </button>
        </div>
      </form>
    </div>
  );
}
