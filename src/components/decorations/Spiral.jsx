/**
 * <Spiral className />
 * Gold "Why host" spiral decoration (Events). Source: Events "Why host" spiral
 * group (no clean Figma node id resolvable at build time — see G-14; authored to
 * match the render). currentColor stroked so `text-sh-gold` tints it (G-15).
 */
export default function Spiral({ className = "", ...rest }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      {...rest}
    >
      {/* Archimedean-ish spiral approximated with cubic arcs */}
      <path
        d="M60 60
           C60 54 66 54 66 60
           C66 70 54 70 54 60
           C54 46 74 46 74 60
           C74 78 46 78 46 60
           C46 38 82 38 82 60
           C82 86 38 86 38 60
           C38 30 90 30 90 60
           C90 94 30 94 30 60
           C30 22 98 22 98 60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
