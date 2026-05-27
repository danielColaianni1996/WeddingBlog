import { useEffect, useState } from "react";
import "./App.css";
import { CountdownSection } from "./components/sections/CountdownSection";
import { CoverSection } from "./components/sections/CoverSection";
import { FaqSection } from "./components/sections/FaqSection";
import { LocationSection } from "./components/sections/LocationSection";
import { RsvpSection } from "./components/sections/RsvpSection";
import { SaveTheDateSection } from "./components/sections/SaveTheDateSection";
import { StorySection } from "./components/sections/StorySection";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { weddingImages } from "./data/weddingContent";
import { useImagePreloader } from "./hooks/useImagePreloader";

const criticalImages = [
  weddingImages.cover,
  weddingImages.saveTheDate,
  weddingImages.location,
  weddingImages.story
];

function App() {
  const areImagesReady = useImagePreloader(criticalImages, {
    minimumMs: 3000,
    timeoutMs: 3000
  });
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    if (!areImagesReady) {
      return;
    }

    const exitTimeoutId = window.setTimeout(() => {
      setIsLoaderVisible(false);
    }, 1100);

    return () => window.clearTimeout(exitTimeoutId);
  }, [areImagesReady]);

  if (isLoaderVisible) {
    return <LoadingScreen isScratching={areImagesReady} />;
  }

  return (
    <main>
      <CoverSection />
      <SaveTheDateSection />
      <CountdownSection />
      <LocationSection />
      <StorySection />
      <RsvpSection />
      <FaqSection />
    </main>
  );
}

export default App;
