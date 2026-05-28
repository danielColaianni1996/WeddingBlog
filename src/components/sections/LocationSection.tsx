import { weddingImages, weddingLocation } from "../../data/weddingContent";
import { RevealSection } from "../ui/Reveal";
import type { SectionFrame } from "../ui/sectionFrame";

type LocationSectionProps = {
  withFrame?: SectionFrame;
};

export function LocationSection({ withFrame = false }: LocationSectionProps) {
  return (
    <RevealSection
      id="location"
      className="snap-section location-section"
      ariaLabel="Dove raggiungerci"
      withFrame={withFrame}
    >
      <div className="section-copy">
        <p className="eyebrow">Dove raggiungerci</p>
        <h2>La location</h2>
        <p>
          Tutte le informazioni utili per arrivare sereni e godersi la giornata
          insieme a noi.
        </p>
      </div>

      <article className="location-card">
        <div className="location-card__media">
          <img src={weddingImages.location} alt={weddingLocation.imageAlt} />
          <div className="location-card__overlay">
            <p className="eyebrow">Location</p>
            <h3>{weddingLocation.name}</h3>
          </div>
        </div>

        <div className="location-card__content">
          <div className="location-detail">
            <span className="clock-icon" aria-hidden="true" />
            <span>{weddingLocation.hours}</span>
          </div>
          <p className="location-description">{weddingLocation.description}</p>
          <address>{weddingLocation.address}</address>
          <a
            className="primary-action"
            href={weddingLocation.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Apri in Maps
          </a>
        </div>
      </article>
    </RevealSection>
  );
}
