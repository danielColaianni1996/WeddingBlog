import { useEffect, useState } from "react";

type ImagePreloaderOptions = {
  minimumMs?: number;
  timeoutMs?: number;
};

function loadImage(source: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();

    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = source;

    if (image.decode) {
      image.decode().then(resolve).catch(resolve);
    }
  });
}

export function useImagePreloader(
  sources: readonly string[],
  options: ImagePreloaderOptions = {}
) {
  const [isReady, setIsReady] = useState(sources.length === 0);

  useEffect(() => {
    let isMounted = true;
    const minimumMs = options.minimumMs ?? 0;
    const timeoutMs = options.timeoutMs ?? 3500;
    const timeoutIds: number[] = [];
    const minimumDelay = new Promise<void>((resolve) => {
      timeoutIds.push(window.setTimeout(resolve, minimumMs));
    });
    const imageLoading = Promise.race([
      Promise.all(sources.map(loadImage)).then(() => undefined),
      new Promise<void>((resolve) => {
        timeoutIds.push(window.setTimeout(resolve, timeoutMs));
      })
    ]);

    Promise.all([minimumDelay, imageLoading]).then(() => {
      if (isMounted) {
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [options.minimumMs, options.timeoutMs, sources]);

  return isReady;
}
