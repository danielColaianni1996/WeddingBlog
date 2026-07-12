import { useState } from "react";
import { galleryImages } from "../../data/weddingContent";
import { RevealDiv, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function GallerySection({ withFrame = false }: SectionFrameProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex];

  function showPreviousImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    );
  }

  function showNextImage() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    );
  }

  return (
    <RevealSection
      id="gallery"
      className="snap-section gallery-section"
      ariaLabel="Gallery fotografica"
      withFrame={withFrame}
    >
      <SectionIntro eyebrow="Gallery" title="Scatti da immaginare insieme">
        <p>
          Una piccola raccolta di atmosfere, dettagli e momenti che raccontano
          il tono della giornata che vorremmo condividere con voi.
        </p>
      </SectionIntro>

      <RevealDiv className="gallery-carousel">
        <div className="gallery-carousel__stage">
          <img src={activeImage.src} alt={activeImage.alt} />
          <div className="gallery-carousel__caption">
            <span>{activeImage.title}</span>
            <p>{activeImage.caption}</p>
          </div>
        </div>

        <div
          className="gallery-carousel__controls"
          aria-label="Controlli gallery"
        >
          <button
            type="button"
            className="gallery-carousel__button"
            onClick={showPreviousImage}
            aria-label="Mostra foto precedente"
          >
            ‹
          </button>
          <span aria-live="polite">
            {activeImageIndex + 1} / {galleryImages.length}
          </span>
          <button
            type="button"
            className="gallery-carousel__button"
            onClick={showNextImage}
            aria-label="Mostra foto successiva"
          >
            ›
          </button>
        </div>

        <div className="gallery-carousel__thumbs" aria-label="Scegli una foto">
          {galleryImages.map((image, imageIndex) => (
            <button
              type="button"
              key={image.src}
              className={
                imageIndex === activeImageIndex
                  ? "gallery-carousel__thumb is-active"
                  : "gallery-carousel__thumb"
              }
              onClick={() => setActiveImageIndex(imageIndex)}
              aria-label={`Mostra foto: ${image.title}`}
              aria-current={imageIndex === activeImageIndex}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      </RevealDiv>
    </RevealSection>
  );
}
