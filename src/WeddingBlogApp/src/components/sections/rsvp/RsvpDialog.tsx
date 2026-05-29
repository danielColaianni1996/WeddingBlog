import type { RsvpDialogState } from "./types";

type RsvpDialogProps = {
  dialogState: Exclude<RsvpDialogState, null>;
  onClose: () => void;
};

export function RsvpDialog({ dialogState, onClose }: RsvpDialogProps) {
  return (
    <div className="rsvp-dialog" role="dialog" aria-modal="true">
      <div
        className={`rsvp-dialog__panel rsvp-dialog__panel--${dialogState.type}`}
      >
        <h3>
          {dialogState.type === "success"
            ? "Conferma ricevuta"
            : "Qualcosa non va"}
        </h3>
        <p>{dialogState.message}</p>
        <button type="button" onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
}
