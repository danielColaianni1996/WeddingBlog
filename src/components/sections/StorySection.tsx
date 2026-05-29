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
      className="snap-section story-section"
      style={storyStyle}
      withFrame={withFrame}
    >
      <SectionIntro
        className="section-copy wide"
        eyebrow="La giornata"
        title="Una pagina verticale, elegante e guidata"
      >
        <p>
          Ogni blocco puo diventare una scena: location, viaggio, dress code,
          lista nozze, album, domande frequenti e area personale dell'invitato.
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
