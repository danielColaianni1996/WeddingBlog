export type SectionFrame = boolean | "top" | "bottom" | "both";

export type SectionFrameProps = {
  withFrame?: SectionFrame;
};

export function getSectionFrameClassName(
  className: string,
  withFrame: SectionFrame = false
) {
  if (!withFrame) {
    return className;
  }

  const frameClassNames = ["section-frame"];

  if (withFrame === true || withFrame === "both" || withFrame === "top") {
    frameClassNames.push("section-frame--top");
  }

  if (withFrame === true || withFrame === "both" || withFrame === "bottom") {
    frameClassNames.push("section-frame--bottom");
  }

  return `${className} ${frameClassNames.join(" ")}`;
}
