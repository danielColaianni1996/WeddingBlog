import { useEffect, useState } from "react";
import { CountdownSection } from "../components/sections/CountdownSection";
import { CoverSection } from "../components/sections/CoverSection";
import { FaqSection } from "../components/sections/FaqSection";
import { GallerySection } from "../components/sections/GallerySection";
import { GiftRegistrySection } from "../components/sections/GiftRegistrySection";
import { LocationSection } from "../components/sections/LocationSection";
import { OurStorySection } from "../components/sections/OurStorySection";
import { RsvpSection } from "../components/sections/RsvpSection";
import { SaveTheDateSection } from "../components/sections/SaveTheDateSection";
import { StorySection } from "../components/sections/StorySection";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { weddingImages } from "../data/weddingContent";
import { useImagePreloader } from "../hooks/useImagePreloader";

const criticalImages = [
  weddingImages.cover,
  weddingImages.location,
  weddingImages.story
];

const envelopeOpenAnimationMs = 1700;

export function WeddingBlogPage() {
  const areImagesReady = useImagePreloader(criticalImages, {
    minimumMs: 3000,
    timeoutMs: 3000
  });
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
  const [hasEnvelopeAnimationCompleted, setHasEnvelopeAnimationCompleted] =
    useState(false);
  const isLoaderVisible = !areImagesReady || !hasEnvelopeAnimationCompleted;

  useEffect(() => {
    if (!isEnvelopeOpening) {
      return;
    }

    const animationTimeoutId = window.setTimeout(() => {
      setHasEnvelopeAnimationCompleted(true);
    }, envelopeOpenAnimationMs);

    return () => window.clearTimeout(animationTimeoutId);
  }, [isEnvelopeOpening]);

  if (isLoaderVisible) {
    return (
      <LoadingScreen
        isOpening={isEnvelopeOpening}
        isReady={areImagesReady}
        onOpen={() => setIsEnvelopeOpening(true)}
      />
    );
  }

  return (
    <div className="page-frame">
      <main>
        <CoverSection />
        <CountdownSection withFrame="both" />
        <SaveTheDateSection />
        <OurStorySection />
        <LocationSection />
        <StorySection />
        <GallerySection />
        <GiftRegistrySection />
        <RsvpSection withFrame="both" />
        <FaqSection withFrame="bottom" />
      </main>
    </div>
  );
}
