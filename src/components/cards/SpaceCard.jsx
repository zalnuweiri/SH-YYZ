import SpacesCarousel from "../SpacesCarousel";

/**
 * <SpaceCard images label />
 * Events rounded dark card wrapping the SpacesCarousel + a gold label.
 */
export default function SpaceCard({ images, label }) {
  return (
    <div className="flex w-full flex-col">
      <div className="overflow-hidden rounded-2xl border border-sh-gold/40 bg-sh-ink p-2">
        <div className="overflow-hidden rounded-xl">
          <SpacesCarousel images={images} />
        </div>
      </div>
      <h3 className="mt-5 font-display text-h2 uppercase tracking-wide2 text-sh-gold">
        {label}
      </h3>
    </div>
  );
}
