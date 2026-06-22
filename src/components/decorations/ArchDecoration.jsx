/**
 * <ArchDecoration className width />
 * Gold art-deco nested-arch motif (footer + Events/Story/HappyHour heroes).
 * Hand-authored to match Figma `Group 24` (8730:185) — nested pointed arches.
 * Uses currentColor so `text-sh-gold` (or any text-*) tints it (G-15).
 * viewBox is intrinsic; aspect ratio ~ 200x150.
 */
export default function ArchDecoration({ className = "", width = 200, ...rest }) {
  return (
    <svg
      role="img"
      aria-label="Decorative arch"
      width={width}
      viewBox="0 0 200 150"
      fill="none"
      className={className}
      {...rest}
    >
      {/* nested pointed arches, outermost → innermost */}
      <path d="M2 150 V70 Q2 4 100 4 Q198 4 198 70 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 150 V72 Q16 18 100 18 Q184 18 184 72 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 150 V74 Q30 32 100 32 Q170 32 170 74 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 150 V76 Q44 46 100 46 Q156 46 156 76 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M58 150 V78 Q58 60 100 60 Q142 60 142 78 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <path d="M72 150 V80 Q72 74 100 74 Q128 74 128 80 V150"
        stroke="currentColor" strokeWidth="1.5" />
      <line x1="100" y1="74" x2="100" y2="150" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
