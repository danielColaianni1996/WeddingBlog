import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className: string;
};

type RevealSectionProps = RevealProps & {
  id?: string;
  ariaLabel?: string;
  style?: CSSProperties;
};

function getRevealClassName(className: string, isVisible: boolean) {
  return `${className} reveal-on-scroll${isVisible ? " is-visible" : ""}`;
}

export function RevealSection({
  id,
  ariaLabel,
  children,
  className,
  style
}: RevealSectionProps) {
  const { elementRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={elementRef}
      id={id}
      className={getRevealClassName(className, isVisible)}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </section>
  );
}

export function RevealDiv({ children, className }: RevealProps) {
  const { elementRef, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={elementRef} className={getRevealClassName(className, isVisible)}>
      {children}
    </div>
  );
}

export function RevealArticle({ children, className }: RevealProps) {
  const { elementRef, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={elementRef}
      className={getRevealClassName(className, isVisible)}
    >
      {children}
    </article>
  );
}
