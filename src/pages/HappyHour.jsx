import SEO from "../components/SEO";
import Button from "../components/Button";
import Reveal from "../lib/motion/Reveal";
import Parallax from "../lib/motion/Parallax";
import { useOTWidget } from "../components/OTwidget";
import { happyHourIntro, happyHourItems, tuesdays } from "../data/happyHourData";

/* Figma desktop frame 8647:271 (1280×3372) / mobile 8823:305.
   Titles = Monoglyphic Bold 40 UPPER gold; schedule = Monoglyphic Reg gold; item names =
   Monoglyphic Reg 22 cream; descriptions = NeueBit Bold 18 cream; notes = NeueBit 16 UPPER cream.
   HH price columns (Margaritas $10 / Individual Bites $4) = cream; Tuesdays All day/$20 = gold.
   Heroes: 946×200 (crop center 25%) and 940×228, r8, centered ~166px margins. */

// ── desktop type classes (vw) ── body text = NeueBit *Regular* (user's Figma lacks NeueBit Bold,
//    so the "NeueBit Bold" body style renders Regular there — match what they see). Only titles bold.
const D = {
  title:    "font-display font-bold uppercase leading-none tracking-[0.07em] text-[round(3.125vw,1px)]",
  schedule: "font-display leading-[1.2] tracking-[0.07em] text-[round(2.1875vw,1px)]",
  price:    "font-display leading-[1.2] tracking-[0.07em] text-[round(1.71875vw,1px)]",
  name:     "font-display leading-[1.2] tracking-[0.07em] text-[round(1.71875vw,1px)] text-sh-cream",
  desc:     "font-body font-normal leading-[1.2] tracking-[0.10em] text-[round(1.40625vw,1px)] text-sh-cream",
  note:     "font-body font-normal uppercase leading-[1.2] tracking-[0.20em] text-[round(1.25vw,1px)] text-sh-cream",
};
// ── mobile type classes (px) — Mobile/H1 title 40, prices 28, names/schedule 22 ──
const M = {
  title:    "font-display font-bold uppercase leading-none tracking-[0.10em] text-[40px]",
  schedule: "font-display leading-[1.2] tracking-[0.15em] text-[22px]",
  price:    "font-display leading-[1.2] tracking-[0.02em] text-[28px]",
  name:     "font-display leading-[1.2] tracking-[0.15em] text-[22px] text-sh-cream",
  desc:     "font-body font-normal leading-[1.2] tracking-[0.10em] text-[18px] text-sh-cream",
  note:     "font-body font-normal uppercase leading-[1.2] tracking-[0.20em] text-[16px] text-sh-cream",
};

export default function HappyHour() {
  const { setShowWidget } = useOTWidget();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silenth.ca" },
      { "@type": "ListItem", position: 2, name: "Happy Hour", item: "https://www.silenth.ca/happy-hour" },
    ],
  };

  return (
    <>
      <SEO
        title="Silent H Toronto | Happy Hour"
        description="Best Happy Hour in Toronto — everyday 5pm–7pm at Silent H. Margaritas and individual bites."
        url="https://www.silenth.ca/happy-hour"
        jsonLd={breadcrumbSchema}
      />
      <main className="relative z-10 font-body text-sh-cream">

        {/* ════════════ DESKTOP ════════════ */}
        <div className="hidden md:block pt-[12vw] pb-[6.25vw]">
          {/* Hero 1 — 946×200, crop centred ~25% */}
          <Parallax speed={-0.08} className="mx-auto w-[73.9vw]">
            <img src="/redesign/hh-hero1.webp" alt="Happy Hour at Silent H"
              className="w-full h-[15.625vw] object-cover object-[center_25%] rounded-[8px]" />
          </Parallax>

          {/* HAPPY HOUR header (gold) */}
          <Reveal className="mt-[7.5vw] flex flex-col items-center gap-[1.875vw] text-center">
            <h1 className={`${D.title} text-sh-gold`}>{happyHourIntro.title}</h1>
            <p className={`${D.schedule} text-sh-gold`}>{happyHourIntro.schedule}</p>
          </Reveal>

          {/* Price columns — cream, fixed 167px columns (labels close, prices 198px apart) */}
          <Reveal className="mt-[2.5vw] flex justify-center gap-[2.5vw]">
            {happyHourIntro.prices.map((p) => (
              <div key={p.label} className="w-[13.05vw] flex flex-col items-center gap-[1.25vw]">
                <p className={`${D.price} text-sh-cream whitespace-nowrap`}>{p.label}</p>
                <p className={`${D.price} text-sh-cream`}>{p.price}</p>
              </div>
            ))}
          </Reveal>

          {/* HH item list — centred, gap 40 / within 20 */}
          <div className="mt-[5vw] mx-auto w-[73.9vw] flex flex-col items-center gap-[3.125vw] text-center">
            {happyHourItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.05} className="flex flex-col items-center gap-[1.5625vw]">
                <h3 className={D.name}>{item.name}</h3>
                {item.description && <p className={`${D.desc} max-w-[52vw]`}>{item.description}</p>}
                {item.note && <p className={D.note}>{item.note}</p>}
              </Reveal>
            ))}
          </div>

          <div className="mt-[3.75vw] flex justify-center">
            <Button variant="gold" onClick={() => setShowWidget(true)}>Reserve a table</Button>
          </div>

          {/* Hero 2 — 940×228 */}
          <Parallax speed={-0.08} className="mt-[6.25vw] mx-auto w-[73.4vw]">
            <img src="/redesign/hh-hero2.webp" alt="Tuesdays at Silent H"
              className="w-full h-[17.8vw] object-cover rounded-[8px]" />
          </Parallax>

          {/* TUESDAYS header (gold) */}
          <Reveal className="mt-[6.25vw] flex flex-col items-center gap-[1.875vw] text-center">
            <h2 className={`${D.title} text-sh-gold`}>{tuesdays.title}</h2>
            <div className="flex flex-col items-center gap-[1.25vw]">
              <p className={`${D.price} text-sh-gold`}>{tuesdays.schedule}</p>
              <p className={`${D.price} text-sh-gold`}>{tuesdays.price}</p>
            </div>
          </Reveal>

          {/* Tuesdays items — centred, "+" separators */}
          <div className="mt-[3.125vw] mx-auto w-[49.3vw] flex flex-col items-center gap-[3.125vw] text-center">
            {tuesdays.items.map((item, i) => (
              <div key={item.id} className="contents">
                {i > 0 && <span className={`${D.name} leading-none`}>+</span>}
                <Reveal delay={i * 0.05} className="flex flex-col items-center gap-[1.5625vw]">
                  <h3 className={D.name}>{item.name}</h3>
                  <p className={`${D.desc} max-w-[49vw]`}>{item.description}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-[3.75vw] flex justify-center">
            <Button variant="gold" onClick={() => setShowWidget(true)}>Book your experience</Button>
          </div>
        </div>

        {/* ════════════ MOBILE ════════════ (margins 36, content 321; heroes 321×480 portrait) */}
        <div className="md:hidden pt-[80px] pb-20 px-[36px]">
          {/* HAPPY HOUR title sits ABOVE hero 1 */}
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <h1 className={`${M.title} text-sh-gold`}>{happyHourIntro.title}</h1>
            <p className={`${M.schedule} text-sh-gold`}>{happyHourIntro.schedule}</p>
          </Reveal>

          <Parallax speed={-0.05} className="mt-9 w-full">
            <img src="/redesign/hh-hero1.webp" alt="Happy Hour at Silent H"
              className="w-full h-[480px] object-cover object-[center_25%] rounded-t-[200px] rounded-b-none" />
          </Parallax>

          {/* Price blocks — stacked (1 column), label over price */}
          <Reveal className="mt-10 flex flex-col items-center gap-8">
            {happyHourIntro.prices.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-3">
                <p className={`${M.name} text-sh-cream`}>{p.label}</p>
                <p className={`${M.price} text-sh-cream`}>{p.price}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-10 flex flex-col items-center gap-10 text-center">
            {happyHourItems.map((item) => (
              <Reveal key={item.id} className="flex flex-col items-center gap-5">
                <h3 className={M.name}>{item.name}</h3>
                {item.description && <p className={M.desc}>{item.description}</p>}
                {item.note && <p className={M.note}>{item.note}</p>}
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="gold" onClick={() => setShowWidget(true)}>Reserve a table</Button>
          </div>

          {/* TUESDAYS title sits ABOVE hero 2 */}
          <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
            <h2 className={`${M.title} text-sh-gold`}>{tuesdays.title}</h2>
            <div className="flex flex-col items-center gap-3">
              <p className={`${M.name} text-sh-gold`}>{tuesdays.schedule}</p>
              <p className={`${M.price} text-sh-gold`}>{tuesdays.price}</p>
            </div>
          </Reveal>

          <Parallax speed={-0.05} className="mt-9 w-full">
            <img src="/redesign/hh-hero2.webp" alt="Tuesdays at Silent H"
              className="w-full h-[480px] object-cover object-[61%_center] rounded-t-[200px] rounded-b-none" />
          </Parallax>

          <div className="mt-10 flex flex-col items-center gap-5 text-center">
            {tuesdays.items.map((item, i) => (
              <div key={item.id} className="contents">
                {i > 0 && <span className={`${M.name} leading-none`}>+</span>}
                <Reveal className="flex flex-col items-center gap-5">
                  <h3 className={M.name}>{item.name}</h3>
                  <p className={M.desc}>{item.description}</p>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="gold" onClick={() => setShowWidget(true)}>Book your experience</Button>
          </div>
        </div>
      </main>
    </>
  );
}
