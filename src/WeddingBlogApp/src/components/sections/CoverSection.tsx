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
      <p className="eyebrow cover-runninghead">Daniel &amp; Linda</p>

      <div className="cover-stage">
        <div className="cover-media" style={coverStyle} />
      </div>

      <div className="cover-copy">
        <h1>Ci sposiamo!</h1>
        <h2>Pronti a festeggiare con noi?</h2>
        <span className="cover-divider" aria-hidden="true" />
        <p className="wedding-date">28 Agosto 2027</p>
        <p className="eyebrow cover-venue">Vigna Chinet &middot; Torino</p>
      </div>
    </section>
  );
}
