import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  children,
  className = "section-copy",
  titleClassName
}: SectionIntroProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </div>
  );
}
