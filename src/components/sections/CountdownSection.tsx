import { weddingDate } from "../../data/weddingContent";
import { useCountdown, type TimeLeft } from "../../hooks/useCountdown";
import { RevealDiv, RevealSection } from "../ui/Reveal";

const countdownUnits: Array<{ key: keyof TimeLeft; label: string }> = [
  { key: "days", label: "giorni" },
  { key: "hours", label: "ore" },
  { key: "minutes", label: "minuti" },
  { key: "seconds", label: "secondi" }
];

export function CountdownSection() {
  const timeLeft = useCountdown(weddingDate);

  return (
    <RevealSection id="journey" className="snap-section countdown-section">
      <div className="section-copy">
        <p className="eyebrow">Countdown</p>
        <h2>Ci siamo quasi</h2>
        <p>
          Sabato 28 agosto 2027 sara il giorno di Daniel e Linda. Qui il conto
          alla rovescia accompagna gli invitati verso la conferma.
        </p>
      </div>

      <div
        className="countdown-grid"
        aria-label="Tempo rimanente al matrimonio"
      >
        {countdownUnits.map((unit) => (
          <RevealDiv className="countdown-tile" key={unit.key}>
            <strong>{String(timeLeft[unit.key]).padStart(2, "0")}</strong>
            <span>{unit.label}</span>
          </RevealDiv>
        ))}
      </div>
    </RevealSection>
  );
}
