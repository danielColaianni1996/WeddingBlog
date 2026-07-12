import type { CSSProperties } from "react";
import { timeline, weddingImages } from "../../data/weddingContent";
import { RevealArticle, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function StorySection({ withFrame = false }: SectionFrameProps) {
  const storyStyle = {
    "--story-image": `url(${weddingImages.story})`
  } as CSSProperties;

  return (
    <RevealSection
      id="la-giornata"
      className="snap-section story-section"
      style={storyStyle}
      withFrame={withFrame}
    >
      <SectionIntro
        className="section-copy wide"
        eyebrow="La giornata"
        title="Il nostro giorno più bello"
      >
        <p>
          Dalla cerimonia al brindisi finale e infine la festa, abbiamo
          immaginato una giornata semplice, elegante e piena di momenti da
          vivere insieme.
        </p>
      </SectionIntro>

      <div className="timeline">
        {timeline.map((item) => (
          <RevealArticle className="timeline-item" key={item.time}>
            <span>{item.time}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </RevealArticle>
        ))}
      </div>
    </RevealSection>
  );
}
