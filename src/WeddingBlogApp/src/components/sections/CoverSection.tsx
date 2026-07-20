import type { CSSProperties } from "react";
import { weddingImages } from "../../data/weddingContent";
import {
  getSectionFrameClassName,
  type SectionFrameProps
} from "../ui/sectionFrame";

export function CoverSection({ withFrame = false }: SectionFrameProps) {
  const coverStyle = {
    "--cover-image": `url(${weddingImages.cover})`
  } as CSSProperties;
  const className = getSectionFrameClassName("cover-section", withFrame);

  return (
    <section className={className} aria-label="Daniel e Linda">
      <div className="cover-card" style={coverStyle}>
        <div className="cover-copy">
          <h1>Ci sposiamo Linda e Daniel</h1>
          <p className="wedding-date">28 Agosto 2027</p>
        </div>

        <a
          className="scroll-cue"
          href="#save-the-date"
          aria-label="Scorri alla sezione save the date"
        >
          <span className="scroll-cue__mouse" aria-hidden="true">
            <span />
          </span>
          <span className="scroll-cue__text">Scorri</span>
        </a>
      </div>
    </section>
  );
}
