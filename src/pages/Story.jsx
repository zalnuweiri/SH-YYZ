import SEO from "../components/SEO.jsx";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import ArchDecoration from "../components/decorations/ArchDecoration";

// Alternating image↔text rows (Frame 1646/1645/1647).
const storyRows = [
  {
    id: "row-1",
    image: "/story2.png",
    title: "The heart of our kitchen is a story rooted in love, memory, and tradition.",
    body:
      "Chef Saucedo draws inspiration from his late grandmother, whose warmth and passion for cooking shaped his earliest memories. Her honoured recipes, once shared around a family table, now come to life on our menu—reimagined with elegance and respect for their origins. Each dish is a tribute to her legacy, blending the rich flavours of traditional Mexican cuisine with the artistry of fine dining.",
    reverse: false,
  },
  {
    id: "row-2",
    image: "/story3.webp",
    title: "Setting a tone that is both vibrant and refined.",
    body:
      "Our service is intuitive and heartfelt — attentive without ever intruding. Whether you're joining us for an impromptu cocktail after a long day or gathering with friends for a celebratory dinner, we craft each moment with care. The experience feels effortless, elevated, and always memorable — a true taste of contemporary Mexico.",
    reverse: true,
  },
  {
    id: "row-3",
    image: "/story3.png",
    title: "Every dish tells a story.",
    body:
      "At Silent H every visit becomes a cherished memory. From the sizzle of Espadas de rib eye asadas arriving at your table to the laughter shared over handcrafted regional inspired cocktails, we're more than just a place to eat — we're a place where moments are made. Here, the experience goes beyond the plate, turning every visit into lasting memories.",
    reverse: false,
  },
];

export default function Story() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silenth.ca" },
      { "@type": "ListItem", position: 2, name: "Our Story", item: "https://www.silenth.ca/story" },
    ],
  };

  return (
    <>
      <SEO
        title="Silent H Stories | Our Story"
        description="Learn the story behind Silent H, a modern Mexican restaurant in Toronto."
        url="https://www.silenth.ca/story"
        jsonLd={breadcrumbSchema}
      />
      <main className="relative z-10 font-body text-sh-cream">
        {/* Hero — chef portrait + headline + arch */}
        <section className="relative h-screen w-full pt-[96px] overflow-hidden">
          <Parallax speed={-0.2} className="absolute inset-0">
            <img
              src="/ourstory1.png"
              alt="Chef Gerardo Saucedo"
              className="h-full w-full object-cover object-[85%_34%]"
            />
          </Parallax>
          <div className="pointer-events-none absolute inset-0 bg-black/55" />
          <div className="relative z-10 flex h-full flex-col items-start justify-center px-6 md:px-20">
            <ArchDecoration className="text-sh-gold mb-6 opacity-70" width={140} />
            <h1 className="font-display text-[40px] md:text-hero font-bold leading-[1] tracking-[2px] md:tracking-[6px] text-sh-cream">
              The soul of <br /> México, <br /> reimagined
            </h1>
          </div>
        </section>

        {/* Culinary philosophy */}
        <section className="px-6 md:px-16 py-24">
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <Reveal>
              <h2 className="font-display text-h1 uppercase tracking-[2.8px] text-sh-gold">
                Our Culinary Philosophy
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-body text-body text-sh-grey-200 leading-relaxed">
                Our culinary philosophy blends bold creativity with deep respect for México&apos;s
                rich gastronomic heritage. Guided by Chef Gerardo Saucedo, our kitchen reimagines
                long-standing family recipes, bringing familiar flavours with refined technique,
                creating dishes that honour their origins while inviting new discovery. Every plate
                is inspired by the streets of México, shaped by obsession for quality, and driven
                by an uncompromising pursuit of flavour.
              </p>
            </Reveal>
          </div>
        </section>

        {/* La Inspiración — full-bleed arched image */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          <Parallax speed={-0.2} className="absolute inset-0">
            <img
              src="/inspiracion.jpeg"
              alt="La inspiración"
              className="h-full w-full object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-wide2 text-sh-cream text-center">
              La inspiración
            </h2>
          </div>
        </section>

        {/* Alternating story rows */}
        {storyRows.map((row) => (
          <section key={row.id} className="px-6 md:px-16 py-20">
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal className={`order-1 ${row.reverse ? "lg:order-2" : "lg:order-1"}`}>
                <Parallax speed={-0.15}>
                  <img
                    src={row.image}
                    alt={row.title}
                    loading="lazy"
                    className="w-full h-[40vh] lg:h-[60vh] object-cover rounded-md"
                  />
                </Parallax>
              </Reveal>
              <Reveal
                delay={0.1}
                className={`order-2 ${row.reverse ? "lg:order-1" : "lg:order-2"}`}
              >
                <h2 className="font-display text-h1 leading-[1.1] tracking-[2.8px] text-sh-cream mb-6">
                  {row.title}
                </h2>
                <p className="font-body text-body text-sh-grey-200 leading-relaxed">{row.body}</p>
              </Reveal>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
