import { type FormEvent, useState } from "react";
import { useCreateRsvpResponseMutation } from "../../services/weddingBlogApi";
import { RevealDiv, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";
import { RsvpDialog } from "./rsvp/RsvpDialog";
import { RsvpForm } from "./rsvp/RsvpForm";
import {
  initialRsvpFormState,
  toCreateRsvpRequest
} from "./rsvp/rsvpFormState";
import type { GuestFormState, RsvpDialogState, RsvpFormState } from "./rsvp/types";

export function RsvpSection({ withFrame = false }: SectionFrameProps) {
  const [formState, setFormState] =
    useState<RsvpFormState>(initialRsvpFormState);
  const [dialogState, setDialogState] = useState<RsvpDialogState>(null);
  const [createRsvpResponse, { isLoading }] = useCreateRsvpResponseMutation();

  const updateGuests = (guests: Array<GuestFormState>) => {
    setFormState((currentValue) => ({ ...currentValue, guests }));
  };

  const updateNotes = (notes: string) => {
    setFormState((currentValue) => ({ ...currentValue, notes }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDialogState(null);

    try {
      await createRsvpResponse(toCreateRsvpRequest(formState)).unwrap();

      setFormState(initialRsvpFormState);
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

        <RsvpForm
          formState={formState}
          isLoading={isLoading}
          onGuestsChange={updateGuests}
          onNotesChange={updateNotes}
          onSubmit={handleSubmit}
        />
      </RevealDiv>

      {dialogState && (
        <RsvpDialog
          dialogState={dialogState}
          onClose={() => setDialogState(null)}
        />
      )}
    </RevealSection>
  );
}
