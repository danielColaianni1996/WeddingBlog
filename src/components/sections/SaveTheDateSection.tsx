import type { CSSProperties } from "react";
import { weddingImages } from "../../data/weddingContent";
import { RevealSection } from "../ui/Reveal";

export function SaveTheDateSection() {
  const videoStageStyle = {
    "--save-the-date-image": `url(${weddingImages.saveTheDate})`
  } as CSSProperties;

  return (
    <RevealSection
      id="save-the-date"
      className="video-gate"
      ariaLabel="Save the date"
    >
      <div className="video-stage" style={videoStageStyle}>
        <video
          className="save-video"
          controls
          playsInline
          poster="/save-the-date-poster.jpg"
        >
          <source src="/media/save-the-date.mp4" type="video/mp4" />
          Il tuo browser non supporta il video HTML5.
        </video>
      </div>

      <div className="intro-copy">
        <p className="eyebrow">Save the date</p>
        <h2>Un giorno da vivere insieme</h2>
        <p>
          Questo primo schermo ospitera il video dell'invito. Dopo la visione,
          gli ospiti potranno scorrere tra countdown, dettagli e conferma.
        </p>
        <a className="primary-action" href="#journey">
          Scopri i dettagli
        </a>
      </div>
    </RevealSection>
  );
}
