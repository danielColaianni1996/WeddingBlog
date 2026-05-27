import type { CSSProperties } from "react";
import { weddingImages } from "../../data/weddingContent";

export function CoverSection() {
  const coverStyle = {
    "--cover-image": `url(${weddingImages.cover})`
  } as CSSProperties;

  return (
    <section className="cover-section" aria-label="Daniel e Linda">
      <div className="cover-card" style={coverStyle}>
        <div className="cover-copy">
          <h1>Save the date</h1>
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
