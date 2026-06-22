// Static Home "blog full of experiences" cards (v1; link out). No CMS, no routes.
// Schema (G-36): { id, image, title, blurb, href }
// Images reuse existing /public photos (heavy committed media, present on disk).

export const blogPosts = [
  {
    id: "blog-1",
    image: "/dining.webp",
    title: "The best for you to try at home",
    blurb: "Recreate our signature flavours in your own kitchen.",
    href: "https://www.instagram.com/silenth.to/",
  },
  {
    id: "blog-2",
    image: "/coatepec.webp",
    title: "It's a blog about México",
    blurb: "Stories, regions and the culture behind every dish.",
    href: "https://www.instagram.com/silenth.to/",
  },
  {
    id: "blog-3",
    image: "/oaxaca.webp",
    title: "Cocktails from every region",
    blurb: "A journey through México, one drink at a time.",
    href: "https://www.instagram.com/silenth.to/",
  },
  {
    id: "blog-4",
    image: "/jj.webp",
    title: "The best for you to try in store",
    blurb: "What to order on your next visit to Silent H.",
    href: "https://www.instagram.com/silenth.to/",
  },
];
