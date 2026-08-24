import { ourStory } from "../../data/weddingContent";
import { RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

const [groom, bride] = ourStory.photos;

export function OurStorySection({ withFrame = false }: SectionFrameProps) {
  return (
    <RevealSection
      id="la-nostra-storia"
      className="snap-section our-story-section"
      withFrame={withFrame}
    >
      <div className="our-story">
        <SectionIntro
          className="section-copy our-story__intro"
          eyebrow={ourStory.eyebrow}
          title={ourStory.title}
        />

        <figure className="our-story__photo our-story__photo--groom">
          <img
            className="our-story__photo-img"
            src={groom.src}
            alt={groom.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="our-story__caption">
            <span className="our-story__role">{groom.role}</span>
            <span className="our-story__name">{groom.name}</span>
            <span className="our-story__bio">{groom.bio}</span>
          </figcaption>
        </figure>

        <div className="our-story__notes">
          <span className="our-story__notes-label">
            {ourStory.highlights.label}
          </span>
          <p className="our-story__notes-highlight">{ourStory.highlights.text}</p>
        </div>

        <figure className="our-story__photo our-story__photo--bride">
          <img
            className="our-story__photo-img"
            src={bride.src}
            alt={bride.alt}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="our-story__caption">
            <span className="our-story__role">{bride.role}</span>
            <span className="our-story__name">{bride.name}</span>
            <span className="our-story__bio">{bride.bio}</span>
          </figcaption>
        </figure>

        <p className="our-story__quote">{ourStory.quote}</p>
      </div>
    </RevealSection>
  );
}
