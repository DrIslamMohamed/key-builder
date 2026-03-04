import { PageMeta, TestimonialsContent, SectionStyle, TestimonialItem } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: TestimonialsContent;
  style?: SectionStyle;
};

const fontSizeClass: Record<NonNullable<SectionStyle["fontSize"]>, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

function StarRating({
  rating,
  primary,
}: {
  rating: number;
  primary: string;
}) {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${clamped} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 flex-shrink-0"
          fill={i < clamped ? primary : "none"}
          stroke={primary}
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

function Avatar({
  item,
  primary,
  background,
}: {
  item: TestimonialItem;
  primary: string;
  background: string;
}) {
  if (item.photo) {
    return (
      <img
        src={item.photo}
        alt={item.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2"
        style={{ borderColor: primary }}
      />
    );
  }

  // Initials fallback
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm border-2"
      style={{
        backgroundColor: `${primary}22`,
        borderColor: primary,
        color: primary,
      }}
      aria-label={item.name}
    >
      {initials}
    </div>
  );
}

function TestimonialCard({
  item,
  primary,
  background,
  textColor,
}: {
  item: TestimonialItem;
  primary: string;
  background: string;
  textColor: string;
}) {
  return (
    <article
      className="flex flex-col gap-4 p-5 sm:p-6 rounded-2xl border"
      style={{
        borderColor: `${primary}33`,
        backgroundColor: `${primary}08`,
        color: textColor,
      }}
    >
      {/* Rating */}
      <StarRating rating={item.rating} primary={primary} />

      {/* Review text */}
      <blockquote className="flex-1 text-sm sm:text-base leading-relaxed opacity-90">
        <span className="text-lg font-serif opacity-50 me-1" aria-hidden="true">
          &ldquo;
        </span>
        {item.text}
        <span className="text-lg font-serif opacity-50 ms-1" aria-hidden="true">
          &rdquo;
        </span>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: `${primary}22` }}>
        <Avatar item={item} primary={primary} background={background} />
        <div className="min-w-0">
          <p className="font-bold text-sm truncate">{item.name}</p>
          {item.role && (
            <p className="text-xs opacity-60 truncate">{item.role}</p>
          )}
        </div>
      </footer>
    </article>
  );
}

export default function TestimonialsSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fsClass}`}
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
          style={{ color: primary }}
        >
          {content.title}
        </h2>

        {content.items.length === 0 ? (
          <p className="text-center opacity-50 py-8">No testimonials yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {content.items.map((item) => (
              <TestimonialCard
                key={item.id}
                item={item}
                primary={primary}
                background={bgColor}
                textColor={textColor}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
