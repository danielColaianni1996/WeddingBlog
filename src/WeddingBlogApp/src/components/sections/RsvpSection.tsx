import { RevealDiv, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function RsvpSection({ withFrame = false }: SectionFrameProps) {
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
            Qui nasceranno login da invito, numero partecipanti, preferenze
            alimentari, note per gli sposi e stato della risposta.
          </p>
        </SectionIntro>

        <form className="rsvp-form">
          <label>
            Nome invitato
            <input type="text" placeholder="Es. Maria Rossi" />
          </label>
          <label>
            Partecipazione
            <select defaultValue="yes">
              <option value="yes">Ci saro</option>
              <option value="maybe">Confermo piu avanti</option>
              <option value="no">Non posso esserci</option>
            </select>
          </label>
          <button type="button">Salva bozza</button>
        </form>
      </RevealDiv>
    </RevealSection>
  );
}
