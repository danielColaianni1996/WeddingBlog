import { giftRegistry } from "../../data/weddingContent";
import { RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function GiftRegistrySection({ withFrame = false }: SectionFrameProps) {
  return (
    <RevealSection
      id="lista-nozze"
      className="snap-section gift-registry-section"
      ariaLabel={giftRegistry.eyebrow}
      withFrame={withFrame}
    >
      <div className="gift-registry__intro">
        <SectionIntro eyebrow={giftRegistry.eyebrow} title={giftRegistry.title}>
          <p>{giftRegistry.description}</p>
        </SectionIntro>
        <img
          className="gift-registry__photo"
          src={giftRegistry.photo.src}
          alt={giftRegistry.photo.alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <aside className="gift-registry__details">
        <span className="gift-registry__details-icon" aria-hidden="true" />
        <p className="gift-registry__details-label">
          {giftRegistry.detailsLabel}
        </p>
        <p>{giftRegistry.note}</p>
      </aside>
    </RevealSection>
  );
}
