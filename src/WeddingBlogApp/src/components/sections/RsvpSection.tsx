import { type FormEvent, useState } from "react";
import { useCreateRsvpResponseMutation } from "../../services/weddingBlogApi";
import { RevealDiv, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

type RsvpFormState = {
  firstName: string;
  lastName: string;
  adultsCount: string;
  childrenCount: string;
  foodNotes: string;
};

type DialogState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

const initialFormState: RsvpFormState = {
  firstName: "",
  lastName: "",
  adultsCount: "1",
  childrenCount: "0",
  foodNotes: ""
};

export function RsvpSection({ withFrame = false }: SectionFrameProps) {
  const [formState, setFormState] = useState<RsvpFormState>(initialFormState);
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const [createRsvpResponse, { isLoading }] = useCreateRsvpResponseMutation();

  const updateField = (field: keyof RsvpFormState, value: string) => {
    setFormState((currentValue) => ({ ...currentValue, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDialogState(null);

    try {
      await createRsvpResponse({
        firstName: formState.firstName.trim(),
        lastName: formState.lastName.trim(),
        adultsCount: Number(formState.adultsCount),
        childrenCount: Number(formState.childrenCount),
        foodNotes: formState.foodNotes.trim() || undefined
      }).unwrap();

      setFormState(initialFormState);
      setDialogState({
        type: "success",
        message: "Conferma salvata. Grazie, vi aspettiamo!"
      });
    } catch {
      setDialogState({
        type: "error",
        message: "Non siamo riusciti a salvare la conferma. Riprova tra poco."
      });
    }
  };

  return (
    <RevealSection className="snap-section rsvp-section" withFrame={withFrame}>
      <RevealDiv className="rsvp-panel">
        <SectionIntro
          className="rsvp-intro"
          eyebrow="RSVP"
          title="Conferma partecipazione"
          titleClassName="rsvp-title"
        >
          <p>
            Confermate i dati principali della partecipazione e segnalateci
            eventuali allergie o preferenze alimentari.
          </p>
        </SectionIntro>

        <form className="rsvp-form" onSubmit={handleSubmit}>
          <div className="rsvp-form__grid">
            <label>
              Nome
              <input
                name="firstName"
                type="text"
                placeholder="Es. Maria"
                value={formState.firstName}
                onChange={(event) =>
                  updateField("firstName", event.target.value)
                }
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
                onChange={(event) =>
                  updateField("lastName", event.target.value)
                }
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
                  updateField("adultsCount", event.target.value)
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
                  updateField("childrenCount", event.target.value)
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
              onChange={(event) => updateField("foodNotes", event.target.value)}
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
      </RevealDiv>

      {dialogState && (
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
            <button type="button" onClick={() => setDialogState(null)}>
              Chiudi
            </button>
          </div>
        </div>
      )}
    </RevealSection>
  );
}
