import { useEffect, useRef, useState } from "react";

export function useScrollReveal<TElement extends HTMLElement>() {
  const elementRef = useRef<TElement | null>(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible]);

  return { elementRef, isVisible };
}
