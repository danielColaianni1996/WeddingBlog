import { RevealDiv, RevealSection } from "../ui/Reveal";

export function RsvpSection() {
  return (
    <RevealSection className="snap-section rsvp-section">
      <RevealDiv className="rsvp-panel">
        <p className="eyebrow">RSVP</p>
        <h2 className="rsvp-title">Conferma partecipazione</h2>
        <p>
          Qui nasceranno login da invito, numero partecipanti, preferenze
          alimentari, note per gli sposi e stato della risposta.
        </p>

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
