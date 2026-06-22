/**
 * <CurvedText text="DE MONTERREY" pathId="monterrey-arc" d="..." className
 *             fontClass="font-display" />
 * Renders SVG textPath along a shallow arc. Per G-15 the baseline `d` is authored
 * by hand (a shallow upward arc) rather than extracted from the Figma TEXT_PATH
 * node 8229:859, since "as close as reasonably possible" is the bar.
 * Fill = currentColor so `text-sh-gold` tints it.
 */
import { useId } from "react";

export default function CurvedText({
  text = "DE MONTERREY",
  // ∩-shaped arch: starts low-left, peaks top-center, ends low-right (matches the
  // cathedral-arch curve). Taller viewBox + overflow-visible so glyphs aren't clipped.
  d = "M 25,150 Q 300,38 575,150",
  className = "",
  fontClass = "font-display",
  fontSize = 40,
  letterSpacing = 6,
  ...rest
}) {
  const pathId = useId(); // unique per instance — avoids desktop/mobile id collision
  return (
    <svg
      viewBox="0 0 600 170"
      fill="none"
      role="img"
      aria-label={text}
      className={className}
      style={{ overflow: "visible" }}
      {...rest}
    >
      <defs>
        <path id={pathId} d={d} />
      </defs>
      <text
        fill="currentColor"
        className={fontClass}
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        fontWeight="700"
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
