import type { CSSProperties } from "react";
import { timeline, weddingImages } from "../../data/weddingContent";
import { RevealArticle, RevealSection } from "../ui/Reveal";

export function StorySection() {
  const storyStyle = {
    "--story-image": `url(${weddingImages.story})`
  } as CSSProperties;

  return (
    <RevealSection className="snap-section story-section" style={storyStyle}>
      <div className="section-copy wide">
        <p className="eyebrow">La giornata</p>
        <h2>Una pagina verticale, elegante e guidata</h2>
        <p>
          Ogni blocco puo diventare una scena: location, viaggio, dress code,
          lista nozze, album, domande frequenti e area personale dell'invitato.
        </p>
      </div>

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
