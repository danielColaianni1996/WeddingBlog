import type { CSSProperties } from "react";
import { weddingImages } from "../../data/weddingContent";
import { RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function SaveTheDateSection({ withFrame = false }: SectionFrameProps) {
  const videoStageStyle = {
    "--save-the-date-image": `url(${weddingImages.saveTheDate})`
  } as CSSProperties;

  return (
    <RevealSection
      id="save-the-date"
      className="video-gate"
      ariaLabel="Save the date"
      withFrame={withFrame}
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

      <SectionIntro
        className="intro-copy"
        eyebrow="Save the date"
        title="Un giorno da vivere insieme"
      >
        <p>
          Questo primo schermo ospitera il video dell'invito. Dopo la visione,
          gli ospiti potranno scorrere tra countdown, dettagli e conferma.
        </p>
        <a className="primary-action" href="#journey">
          Scopri i dettagli
        </a>
      </SectionIntro>
    </RevealSection>
  );
}
