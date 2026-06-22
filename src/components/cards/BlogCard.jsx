/**
 * <BlogCard image title blurb href />
 * Home blog grid card: image top, h3 title, body-sm blurb, links out.
 */
export default function BlogCard({ image, title, blurb, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col text-left focus-visible:outline-2 focus-visible:outline-sh-pink focus-visible:outline-offset-2"
    >
      <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-sh-ink">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 font-display text-h3 text-sh-cream">{title}</h3>
      <p className="mt-2 font-body text-body-sm text-sh-grey-300">{blurb}</p>
    </a>
  );
}
