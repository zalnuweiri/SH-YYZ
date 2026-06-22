/**
 * <LineMotif orientation="horizontal|vertical" className count />
 * Gold parallel line motif used in Events hero / dividers.
 * Source: Figma `Horizontal lines` (8279:545) + `Vertical lines` (8279:544).
 * currentColor stroked so `text-sh-gold` tints it (G-15).
 */
export default function LineMotif({
  orientation = "horizontal",
  count = 7,
  className = "",
  ...rest
}) {
  const lines = Array.from({ length: count });
  if (orientation === "vertical") {
    const w = (count - 1) * 10 + 2;
    return (
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${w} 120`}
        fill="none"
        preserveAspectRatio="none"
        className={className}
        {...rest}
      >
        {lines.map((_, i) => (
          <line key={i} x1={1 + i * 10} y1="0" x2={1 + i * 10} y2="120"
            stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
    );
  }
  const h = (count - 1) * 10 + 2;
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 120 ${h}`}
      fill="none"
      preserveAspectRatio="none"
      className={className}
      {...rest}
    >
      {lines.map((_, i) => (
        <line key={i} x1="0" y1={1 + i * 10} x2="120" y2={1 + i * 10}
          stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}
