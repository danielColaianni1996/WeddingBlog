import { useRef, useState } from "react";
import { galleryImages } from "../../data/weddingContent";
import { RevealDiv, RevealSection } from "../ui/Reveal";
import { SectionIntro } from "../ui/SectionIntro";
import type { SectionFrameProps } from "../ui/sectionFrame";

export function GallerySection({ withFrame = false }: SectionFrameProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
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

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) {
      touchStartX.current = null;
      return;
    }

    const swipeDistance = touchStartX.current - touchEndX;
    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 45) {
      return;
    }

    if (swipeDistance > 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  }

  return (
    <RevealSection
      id="gallery"
      className="snap-section gallery-section"
      ariaLabel="Gallery fotografica"
      withFrame={withFrame}
    >
      <SectionIntro eyebrow="Gallery" title="I nostri momenti più belli">
        {null}
      </SectionIntro>

      <RevealDiv className="gallery-carousel">
        <div
          className="gallery-carousel__stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            className="gallery-carousel__backdrop"
            src={activeImage.src}
            alt=""
            aria-hidden="true"
          />
          <img
            className="gallery-carousel__image"
            src={activeImage.src}
            alt={activeImage.alt}
          />
          <div className="gallery-carousel__caption">
            <span>{activeImage.title}</span>
            <p>{activeImage.caption}</p>
          </div>
          <span className="gallery-carousel__count" aria-live="polite">
            {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
            {String(galleryImages.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="gallery-carousel__button gallery-carousel__button--previous"
            onClick={showPreviousImage}
            aria-label="Mostra foto precedente"
          ></button>
          <button
            type="button"
            className="gallery-carousel__button gallery-carousel__button--next"
            onClick={showNextImage}
            aria-label="Mostra foto successiva"
          ></button>
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
