/**
 * Menu building blocks — pixel-faithful to Figma frames:
 *   Desktop Food  8153:1360 · Desktop Drinks 8153:1886
 *   Mobile  Food  4272:3238 · Mobile  Bar    8794:1105
 *
 * Verified type system (design px @1280 desktop / @393 mobile):
 *   DESKTOP                                   MOBILE
 *   header  Monoglyphic Bold 40 UPPER ls.07   Monoglyphic Bold 24 UPPER ls.05
 *   name    Mondwest   Bold 28  ls.07         Mondwest Bold 20 (hero 24) ls.07/.10
 *   desc    NeueBit    Bold 18  ls.10         NeueBit  Bold 18 ls.10
 *   label   NeueBit    Bold 16  UPPER ls.20   NeueBit  Bold 16 UPPER ls.20
 *   price   Monoglyphic Reg 22  ls.07         NeueBit  Bold 20 ls.20
 *   ozlabel NeueBit    Bold 16  UPPER ls.20   NeueBit  Bold 14 UPPER ls.20
 * All text #ece1d4 (sh-cream); dividers desktop #0b0b0b (sh-ink) / mobile #ece1d4; gold only on active tab.
 */
import { Camera } from "lucide-react";

/* ── DESKTOP type classes (vw-scaled, round() keeps pixel-fonts crisp) ── */
export const D = {
  header:      "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(3.125vw,1px)] text-sh-cream",
  headerGhost: "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(3.125vw,1px)] text-sh-ink",
  name:        "font-mondwest font-bold leading-[1.2] tracking-[0.07em] text-[round(2.1875vw,1px)] text-sh-cream",
  desc:        "font-body font-bold leading-[1.2] tracking-[0.10em] text-[round(1.40625vw,1px)] text-sh-cream",
  label:       "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[round(1.25vw,1px)] text-sh-cream",
  labelGhost:  "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[round(1.25vw,1px)] text-sh-ink",
  price:       "font-display font-normal leading-none tracking-[0.07em] text-[round(1.71875vw,1px)] text-sh-cream",
};

/* ── MOBILE type classes (fixed px) ── */
export const M = {
  header: "font-display font-bold uppercase leading-[1.2] tracking-[0.05em] text-[24px] text-sh-cream",
  name:   "font-mondwest font-bold leading-[1.2] tracking-[0.07em] text-[20px] text-sh-cream",
  nameHero: "font-mondwest font-bold leading-[1.2] tracking-[0.10em] text-[24px] text-sh-cream",
  desc:   "font-body font-bold leading-[1.2] tracking-[0.10em] text-[18px] text-sh-cream",
  label:  "font-body font-bold uppercase leading-[1.2] tracking-[0.20em] text-[16px] text-sh-cream",
  price:  "font-body font-bold leading-none tracking-[0.20em] text-[20px] text-sh-cream",
  ozlabel:"font-body font-bold uppercase leading-none tracking-[0.20em] text-[14px] text-sh-cream",
};

/* Dotted cream rule between menu items (Figma LINE dashPattern [1,8], round caps, #ece1d4 w2):
   2px dots spaced 9px on-centre. */
export function Rule({ className = "" }) {
  return (
    <div
      className={`h-[2px] w-full ${className}`}
      style={{
        backgroundImage: "radial-gradient(circle, #ece1d4 1px, transparent 1.6px)",
        backgroundSize: "9px 2px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "left center",
      }}
    />
  );
}

/* Per-item camera toggle (Figma "PhotoOnOff" 24×24). Cream when shown, grey when hidden. */
export function PhotoToggle({ shown, onToggle, size = "w-[1.875vw] h-[1.875vw] min-w-[18px] min-h-[18px]" }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide picture" : "Show picture"}
      aria-pressed={shown}
      className={`shrink-0 transition-colors hover:text-sh-pink ${shown ? "text-sh-cream" : "text-sh-grey-500"}`}
    >
      <Camera className={size} strokeWidth={2} />
    </button>
  );
}

/* ===================== DESKTOP ===================== */

/* One desktop list row (standard or regional cocktail). featured → 269² thumb on the left + 560 text right.
   Regional with a left photo (featured) puts the MAP ABOVE the name (Figma); list regionals = name above map. */
export function RowDesktop({ item, regional, showThumb, shown, onToggle }) {
  const nameEl = <h3 className={D.name}>{item.name}</h3>;
  const mapEl = regional && item.regionImage && (
    // asset is dark line-art on transparent → invert + dim to render the map as muted grey (as in Figma ~rgb120)
    <img
      key="map"
      src={`/${item.regionImage}`}
      alt={`${item.region || ""} region`}
      loading="lazy"
      className="w-[9.453vw] h-[6.484vw] object-contain object-left invert opacity-[0.44]"
    />
  );
  const mapFirst = regional && showThumb; // featured regional: map above name
  const text = (
    <div className="flex flex-col gap-[1.875vw]">
      {mapFirst ? mapEl : nameEl}
      {mapFirst ? nameEl : mapEl}
      {regional && item.region && <span className={D.label}>{item.region}</span>}
      {item.description && <p className={D.desc}>{item.description}</p>}
      {item.subtext && <span className={D.label}>{item.subtext}</span>}
      {item.info && <span className={D.label}>{item.info}</span>}
      <div className="flex items-end justify-between">
        <span className={D.price}>{item.price}</span>
        <PhotoToggle shown={shown} onToggle={onToggle} />
      </div>
    </div>
  );

  if (showThumb && item.image) {
    return (
      <div className="flex items-start justify-between">
        <img
          src={item.image.startsWith("/") ? item.image : `/${item.image}`}
          alt={item.name}
          loading="lazy"
          className="w-[21.016vw] h-[21.016vw] shrink-0 rounded-[4px] object-cover"
        />
        <div className="w-[43.75vw]">{text}</div>
      </div>
    );
  }
  return <div className="w-full">{text}</div>;
}

/* Desktop wine / cafe grid cell: name, varietal, then 5oz/8oz/BTL price columns. */
export function WineCellDesktop({ item, showLabels }) {
  const cols = [
    [item.price, "5oz"],
    [item.price8oz, "8oz"],
    [item.btl, "BTL"],
  ].filter(([v]) => v != null);
  return (
    <div className="flex flex-col gap-[1.25vw]">
      <h3 className={D.name}>{item.name}</h3>
      {item.description && <p className={D.desc}>{item.description}</p>}
      <div className="flex gap-[1.875vw]">
        {cols.map(([v, lbl]) => (
          <div key={lbl} className="flex flex-col gap-[0.625vw]">
            <span className={D.price}>{v}</span>
            {showLabels && <span className={D.label}>{lbl}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== MOBILE ===================== */

export function RowMobile({ item, regional, hero, heroImage, showThumb, shown, onToggle }) {
  const src = item.image && (item.image.startsWith("/") ? item.image : `/${item.image}`);
  return (
    <div className="flex flex-col gap-4">
      {((showThumb && !regional) || (regional && heroImage)) && src && (
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          className={`w-full object-cover ${regional ? "aspect-[321/362]" : "aspect-[321/410]"}`}
        />
      )}
      {regional ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-3 min-w-0">
            <h3 className={M.name}>{item.name}</h3>
            {item.region && <span className={M.label}>{item.region}</span>}
          </div>
          {!heroImage && src && (
            <img
              src={src}
              alt=""
              loading="lazy"
              className="w-[112px] h-[77px] shrink-0 object-cover"
            />
          )}
        </div>
      ) : (
        <h3 className={hero ? M.nameHero : M.name}>{item.name}</h3>
      )}
      {item.description && <p className={M.desc}>{item.description}</p>}
      {item.subtext && <span className={M.label}>{item.subtext}</span>}
      {item.info && <span className={M.label}>{item.info}</span>}
      <div className="flex items-center justify-between">
        <span className={M.price}>{item.price}</span>
        <PhotoToggle shown={shown} onToggle={onToggle} size="w-6 h-6" />
      </div>
    </div>
  );
}

export function WineRowMobile({ item, showLabels }) {
  const cols = [
    [item.price, "5oz"],
    [item.price8oz, "8oz"],
    [item.btl, "BTL"],
  ].filter(([v]) => v != null);
  return (
    <div className="flex flex-col gap-4">
      <h3 className={M.name}>{item.name}</h3>
      {item.description && <p className={M.desc}>{item.description}</p>}
      <div className="flex gap-4">
        {cols.map(([v, lbl]) => (
          <div key={lbl} className="flex flex-col gap-2">
            <span className={M.price}>{v}</span>
            {showLabels && <span className={M.ozlabel}>{lbl}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
