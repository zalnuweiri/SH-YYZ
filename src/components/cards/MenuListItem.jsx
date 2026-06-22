/**
 * <MenuListItem item showPic isRegional />
 * Dark typographic menu row: optional thumbnail (when showPic && item.image),
 * name (font-display) + optional region label + description (font-body),
 * price(s) right-aligned, optional region-map icon (reads item.regionImage, G-20).
 */
export default function MenuListItem({ item, showPic = false, isRegional = false }) {
  const hasMultiPrice = item.price8oz || item.btl;

  return (
    <div className="flex gap-5 border-b border-sh-grey-700/40 py-6">
      {/* Thumbnail (global show-pictures toggle) */}
      {showPic && item.image && (
        <img
          src={item.image.startsWith("/") ? item.image : `/${item.image}`}
          alt={item.name}
          loading="lazy"
          className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-md object-cover"
        />
      )}

      {/* Text block */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-h3 text-sh-cream">{item.name}</h3>
            {isRegional && item.region && (
              <span className="mt-1 block font-body text-caption uppercase tracking-[3.2px] text-sh-gold">
                {item.region}
              </span>
            )}
          </div>

          {/* Price(s) */}
          <div className="shrink-0 text-right">
            {hasMultiPrice ? (
              <div className="flex gap-4 justify-end">
                {item.price && (
                  <span className="font-display text-h3 text-sh-gold">
                    {item.price}
                    <span className="block font-body text-caption-sm uppercase tracking-[2px] text-sh-grey-300">5oz</span>
                  </span>
                )}
                {item.price8oz && (
                  <span className="font-display text-h3 text-sh-gold">
                    {item.price8oz}
                    <span className="block font-body text-caption-sm uppercase tracking-[2px] text-sh-grey-300">8oz</span>
                  </span>
                )}
                {item.btl && (
                  <span className="font-display text-h3 text-sh-gold">
                    {item.btl}
                    <span className="block font-body text-caption-sm uppercase tracking-[2px] text-sh-grey-300">btl</span>
                  </span>
                )}
              </div>
            ) : (
              item.price != null && (
                <span className="font-display text-h3 text-sh-gold">{item.price}</span>
              )
            )}
          </div>
        </div>

        {item.description && (
          <p className="mt-2 font-body text-body-sm text-sh-grey-300 leading-snug max-w-[60ch]">
            {item.description}
          </p>
        )}
        {item.info && (
          <p className="mt-1 font-body text-caption-sm text-sh-grey-500">{item.info}</p>
        )}
        {item.subtext && (
          <p className="mt-2 font-body text-caption uppercase tracking-[3.2px] text-sh-gold">
            {item.subtext}
          </p>
        )}
      </div>

      {/* Region-map icon (Cocteles Regionales) */}
      {isRegional && item.regionImage && (
        <img
          src={`/${item.regionImage}`}
          alt={`${item.region} region`}
          loading="lazy"
          className="hidden sm:block h-16 w-16 shrink-0 object-contain opacity-90"
        />
      )}
    </div>
  );
}
