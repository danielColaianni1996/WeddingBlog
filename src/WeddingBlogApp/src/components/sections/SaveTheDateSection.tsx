import { RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function SaveTheDateSection({ withFrame = false }: SectionFrameProps) {
  return (
    <RevealSection
      id="save-the-date"
      className="video-gate"
      ariaLabel="Save the date"
      withFrame={withFrame}
    >
      <div className="video-stage">
        <video
          className="save-video"
          controls
          playsInline
          preload="metadata"
          poster="/media/coverSaveTheDate.jpg"
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
          Guarda il nostro video del save the date
        </p>
        <a className="primary-action" href="#la-giornata">
          Scopri i dettagli
        </a>
      </SectionIntro>
    </RevealSection>
  );
}
