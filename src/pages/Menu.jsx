import { useState } from "react";
import { menuData } from "../data/MenuData";
import SEO from "../components/SEO.jsx";
import { Utensils, Martini, Camera } from "lucide-react";
import {
  D, M, PhotoToggle, Rule,
  RowDesktop, WineCellDesktop, RowMobile, WineRowMobile,
} from "../components/menu/MenuParts.jsx";

const WINE = new Set(["Vinos Rojos", "Vinos Blancos", "Vinos Rosé", "Espumosos"]);
const isCafe = (c) => c.toLowerCase().startsWith("cafe");
// Sections whose FIRST item shows a photo by default in Figma (others: photo off until toggled).
// Cerveza / Cocteles con Amigos / wines / cafe have NO featured photo in the design.
const HAS_FEATURED_PHOTO = new Set([
  "Entradas", "Principales", "Complementos", "Postres", "Cocteles Regionales", "H Clásicos",
]);
const MARG_SUB = "four margaritas served in a cocktail tree";

/* Electric Daisy editorial copy (matches Figma; not in MenuData). */
const ED_PARA =
  "Electric Daisies, known for their tingling, flavour-enhancing effect, star in Canada’s first cocktail of its kind—only at Silent H. Crafted with Patrón El Alto, passionfruit, smoked vanilla, and saffron, it’s bold, luxurious, and served in a hand-painted glass from Guadalajara.";
const ED_SPEC =
  "Saffron-Infused Patrón El Alto | Mezcal | Galliano | Santomé | Maracuyá | Orange Bitters | Acids | Mango Boba | Electric Daisy | Gold";

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState("food"); // "food" | "drinks"
  const [showAll, setShowAll] = useState(false);
  const [pic, setPic] = useState({}); // key -> bool override

  const sections = menuData[activeMenu];
  const keyOf = (cat, item) => `${activeMenu}:${cat}:${item.id}`;
  const isShown = (cat, item, first) => {
    const k = keyOf(cat, item);
    return showAll || (k in pic ? pic[k] : first);
  };
  const toggle = (cat, item, first) => {
    const k = keyOf(cat, item);
    setPic((p) => ({ ...p, [k]: !(k in p ? p[k] : first) }));
  };

  const toggleTo = (menu) => {
    setActiveMenu(menu);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.silenth.ca" },
      { "@type": "ListItem", position: 2, name: "Menu", item: "https://www.silenth.ca/menu" },
    ],
  };

  /* ── header with optional " 2oz" suffix (Cocteles Regionales) ── */
  const headerNode = (cat, cls, subCls) => {
    if (cat === "Cocteles Regionales") {
      return (
        <>
          Cocteles Regionales <span className={subCls}>2oz</span>
        </>
      );
    }
    return cat;
  };

  /* ════════════════ DESKTOP SECTION ════════════════ */
  const DesktopSection = (section) => {
    const cat = section.category;
    const items = section.items;

    if (cat === "Electric Daisy") {
      const ed = items[0] || {};
      return (
        <section key={cat} className="mt-[7.5vw]">
          <div className="flex items-baseline gap-[3.13vw]">
            <h2 className={D.headerGhost}>Electric Daisy</h2>
          </div>
          <div className="mt-[2.5vw] flex items-start justify-between">
            <img
              src="/redesign/menu-electricdaisy.webp"
              alt="Electric Daisy"
              className="w-[21.016vw] h-[21.016vw] shrink-0 rounded-[4px] object-cover"
            />
            <div className="w-[43.67vw] flex flex-col gap-[1.5625vw]">
              <p className={D.desc}>{ED_PARA}</p>
              <div className="border-t border-sh-ink" />
              <div className="flex items-center gap-[9.14vw]">
                <p className={`${D.desc} w-[21.09vw]`}>{ED_SPEC}</p>
                <img src="/edaisysmall.png" alt="" className="w-[5.86vw] h-[4.22vw] shrink-0 object-cover" />
              </div>
              <span className="font-body font-bold leading-none tracking-[0.20em] text-[round(1.5625vw,1px)] text-sh-cream">
                {ed.price}
              </span>
            </div>
          </div>
        </section>
      );
    }

    if (cat === "Margarita Tree") {
      return (
        <section key={cat} className="mt-[7.5vw]">
          <div className="flex items-baseline gap-[3.13vw]">
            <h2 className={D.headerGhost}>Margarita Tree</h2>
            <span className={D.labelGhost}>{MARG_SUB}</span>
          </div>
          <div className="mt-[2.5vw] flex items-start justify-between">
            <img
              src="/redesign/menu-margaritatree.webp"
              alt="Margarita Tree"
              className="w-[21.016vw] h-[45.94vw] shrink-0 rounded-[4px] object-cover"
            />
            <div className="w-[43.75vw] flex flex-col">
              {items.map((item, i) => (
                <div key={item.id}>
                  {i > 0 && <Rule className="my-[2.1875vw]" />}
                  <div className="flex flex-col gap-[1.875vw]">
                    <h3 className={D.name}>{item.name}</h3>
                    {item.description && <p className={D.desc}>{item.description}</p>}
                    <div className="flex items-end justify-between">
                      <span className={D.price}>{item.price}</span>
                      <PhotoToggle
                        shown={isShown(cat, item, false)}
                        onToggle={() => toggle(cat, item, false)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (WINE.has(cat) || isCafe(cat)) {
      return (
        <section key={cat} className="mt-[7.5vw]">
          <h2 className={D.header}>{headerNode(cat, D.header, D.label)}</h2>
          <div className="mt-[3.13vw] grid grid-cols-3 gap-x-[2.1875vw] gap-y-[3.13vw]">
            {items.map((item) => (
              <WineCellDesktop key={item.id} item={item} showLabels={!isCafe(cat)} />
            ))}
          </div>
        </section>
      );
    }

    // standard / regional list
    const regional = cat === "Cocteles Regionales";
    return (
      <section key={cat} className="mt-[7.5vw]">
        <h2 className={D.header}>{headerNode(cat, D.header, D.label)}</h2>
        <div className="mt-[2.5vw] flex flex-col">
          {items.map((item, i) => {
            const def = i === 0 && HAS_FEATURED_PHOTO.has(cat);
            return (
              <div key={item.id}>
                {i > 0 && <Rule className="my-[2.1875vw]" />}
                <RowDesktop
                  item={item}
                  regional={regional}
                  showThumb={isShown(cat, item, def)}
                  shown={isShown(cat, item, def)}
                  onToggle={() => toggle(cat, item, def)}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  /* ════════════════ MOBILE SECTION ════════════════ */
  const MobileSection = (section) => {
    const cat = section.category;
    const items = section.items;

    if (cat === "Electric Daisy") {
      const ed = items[0] || {};
      return (
        <section key={cat} className="mt-11">
          <h2 className={M.header}>Electric Daisy</h2>
          <div className="mt-11 flex flex-col gap-4">
            <img src="/redesign/menu-electricdaisy.webp" alt="Electric Daisy" className="w-full aspect-[321/410] object-cover" />
            <p className={M.desc}>{ED_SPEC}</p>
            <span className={M.price}>{ed.price}</span>
            <p className={M.desc}>{ED_PARA}</p>
            <img src="/edaisysmall.png" alt="" className="w-[65px] h-[46px] object-cover" />
          </div>
        </section>
      );
    }

    if (cat === "Margarita Tree") {
      return (
        <section key={cat} className="mt-11">
          <h2 className={M.header}>Margarita Tree</h2>
          <div className="mt-11 flex flex-col">
            {items.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <Rule className="my-10" />}
                <div className="flex flex-col gap-4">
                  {i === 0 && (
                    <>
                      <img src="/redesign/menu-margaritatree.webp" alt="Margarita Tree" className="w-full aspect-[321/411] object-cover" />
                      <span className={M.label}>{MARG_SUB}</span>
                    </>
                  )}
                  <h3 className={M.name}>{item.name}</h3>
                  {item.description && <p className={M.desc}>{item.description}</p>}
                  <div className="flex items-center justify-between">
                    <span className={M.price}>{item.price}</span>
                    <PhotoToggle shown={isShown(cat, item, false)} onToggle={() => toggle(cat, item, false)} size="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (WINE.has(cat) || isCafe(cat)) {
      return (
        <section key={cat} className="mt-11">
          <h2 className={M.header}>{headerNode(cat, M.header, M.label)}</h2>
          <div className="mt-11 flex flex-col">
            {items.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <Rule className="my-10" />}
                <WineRowMobile item={item} showLabels={!isCafe(cat)} />
              </div>
            ))}
          </div>
        </section>
      );
    }

    const regional = cat === "Cocteles Regionales";
    return (
      <section key={cat} className="mt-11">
        <h2 className={M.header}>{headerNode(cat, M.header, M.label)}</h2>
        <div className="mt-11 flex flex-col">
          {items.map((item, i) => {
            const def = i === 0 && HAS_FEATURED_PHOTO.has(cat);
            return (
              <div key={item.id}>
                {i > 0 && <Rule className="my-10" />}
                <RowMobile
                  item={item}
                  regional={regional}
                  hero={!regional && def}
                  heroImage={regional && def}
                  showThumb={!regional && isShown(cat, item, def)}
                  shown={isShown(cat, item, def)}
                  onToggle={() => toggle(cat, item, def)}
                />
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  /* ── Desktop toggle tab (Mondwest Bold 22, gold active + underline) ── */
  const DTab = ({ id, icon: Icon, label }) => {
    const active = activeMenu === id;
    const tint = active ? "text-sh-gold" : "text-sh-cream";
    return (
      <button
        type="button"
        onClick={() => toggleTo(id)}
        className="group flex flex-col items-center gap-[0.625vw]"
      >
        <span className="flex items-center gap-[0.9375vw]">
          <Icon className={`w-[1.875vw] h-[1.875vw] ${tint} group-hover:text-sh-pink transition-colors`} strokeWidth={1.75} />
          {/* Tab label = Desktop/H3 = Monoglyphic Regular 22 (same style as the price; bigger cap than Mondwest) */}
          <span className={`font-display leading-none tracking-[0.15em] text-[round(1.71875vw,1px)] ${tint} group-hover:text-sh-pink transition-colors`}>
            {label}
          </span>
        </span>
        <span className={`h-[4px] w-full rounded-full transition-colors ${active ? "bg-sh-gold" : "bg-transparent"} group-hover:bg-sh-pink`} />
      </button>
    );
  };

  /* ── Mobile toggle tab (Monoglyphic 22 active / 18 inactive) ── */
  const MTab = ({ id, icon: Icon, label }) => {
    const active = activeMenu === id;
    const tint = active ? "text-sh-gold" : "text-sh-cream";
    return (
      <button type="button" onClick={() => toggleTo(id)} className="flex flex-col items-center gap-2 w-[151px]">
        <span className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${tint}`} strokeWidth={1.75} />
          {/* Same size for active/inactive (gold + underline marks the active one) — no resize on toggle */}
          <span className={`font-display text-[22px] tracking-[0.15em] ${tint}`}>
            {label}
          </span>
        </span>
        <span className={`h-[4px] w-full rounded-full ${active ? "bg-sh-gold" : "bg-transparent"}`} />
      </button>
    );
  };

  return (
    <>
      <SEO
        title="Silent H Toronto Menu | Modern Mexican Cuisine (Menu)"
        description="Explore the food and drink menu at Silent H in Toronto."
        url="https://www.silenth.ca/menu"
        jsonLd={breadcrumbSchema}
      />
      {/* No dust on /menu (handled by Layout DUST_ROUTES). */}
      <main className="relative z-10 font-body bg-sh-black text-sh-cream min-h-screen">
        {/* ── Solid sticky top bar (obfuscates content on scroll; nav pill floats over it).
             Spans from top-0 with solid bg sh-ink (#0b0b0b, grayer than the pure-black body);
             internal padding clears the floating navbar and places the tabs at Figma y168. ── */}
        <div className="sticky top-0 z-30 bg-sh-ink">
          {/* desktop */}
          <div className="hidden md:flex items-center justify-between px-[5.469vw] pt-[8.6vw] pb-[0.7vw]">
            <div className="flex items-end gap-[2.4vw]">
              <DTab id="food" icon={Utensils} label="Kitchen" />
              <DTab id="drinks" icon={Martini} label="Bar" />
            </div>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="group flex items-center gap-[0.9375vw] text-sh-cream hover:text-sh-pink transition-colors"
            >
              <Camera className="w-[1.875vw] h-[1.875vw]" strokeWidth={1.75} />
              <span className="font-body font-bold uppercase leading-none tracking-[0.20em] text-[round(1.25vw,1px)]">
                {showAll ? "Hide all pictures" : "Show all pictures"}
              </span>
              <span className={`relative w-[2.8vw] h-[1.4vw] rounded-full transition-colors ${showAll ? "bg-sh-pink" : "bg-sh-grey-700"}`}>
                <span className={`absolute top-[0.15vw] h-[1.1vw] w-[1.1vw] rounded-full bg-sh-cream transition-all ${showAll ? "left-[1.55vw]" : "left-[0.15vw]"}`} />
              </span>
            </button>
          </div>
          {/* mobile */}
          <div className="md:hidden flex items-end justify-start gap-[16px] px-[36px] pt-[72px] pb-[2px]">
            <MTab id="food" icon={Utensils} label="Kitchen" />
            <MTab id="drinks" icon={Martini} label="Bar" />
          </div>
          {/* Gold under-bar line (Figma Line 32): desktop inset to the content margins, mobile full-width */}
          <div className="hidden md:block h-px bg-sh-gold mx-[5.469vw]" />
          <div className="md:hidden h-px bg-sh-gold" />
        </div>

        {/* ── DESKTOP content ── (sits tight under the top bar, per preference) */}
        <div className="hidden md:block px-[13.125vw] pb-[9.375vw]">
          {sections.map((s) => DesktopSection(s))}
        </div>

        {/* ── MOBILE content ── */}
        <div className="md:hidden mx-auto w-full max-w-[321px] pb-24 pt-2">
          {sections.map((s) => MobileSection(s))}
        </div>

      </main>
    </>
  );
}
