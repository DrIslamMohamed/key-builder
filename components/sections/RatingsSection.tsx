import { PageMeta, RatingsContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: RatingsContent;
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
  size = "md",
}: {
  rating: number;
  primary: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - Math.ceil(rating);
  const uid = `partial-${Math.round(rating * 10)}`;

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {/* Full stars */}
      {Array.from({ length: full }, (_, i) => (
        <svg
          key={`full-${i}`}
          viewBox="0 0 24 24"
          className={sizeClass}
          fill={primary}
          aria-hidden="true"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}

      {/* Partial star */}
      {partial > 0 && (
        <svg
          viewBox="0 0 24 24"
          className={sizeClass}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={uid} x1="0" x2="1" y1="0" y2="0">
              <stop offset={`${partial * 100}%`} stopColor={primary} />
              <stop offset={`${partial * 100}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            fill={`url(#${uid})`}
            stroke={primary}
            strokeWidth={1}
          />
        </svg>
      )}

      {/* Empty stars */}
      {Array.from({ length: empty }, (_, i) => (
        <svg
          key={`empty-${i}`}
          viewBox="0 0 24 24"
          className={sizeClass}
          fill="none"
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

export default function RatingsSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fsClass = style?.fontSize ? fontSizeClass[style.fontSize] : "text-base";

  const maxCount =
    content.breakdown.length > 0
      ? Math.max(...content.breakdown.map((b) => b.count))
      : 1;

  const formattedRating =
    Number.isInteger(content.overallRating)
      ? content.overallRating.toFixed(1)
      : content.overallRating.toFixed(1);

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${fsClass}`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Section title */}
        {content.title && (
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
            style={{ color: primary }}
          >
            {content.title}
          </h2>
        )}

        {/* Overall rating hero */}
        <div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 p-6 sm:p-8 rounded-2xl border mb-8"
          style={{
            borderColor: `${primary}33`,
            backgroundColor: `${primary}08`,
          }}
        >
          {/* Big number */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <span
              className="text-6xl sm:text-7xl font-extrabold leading-none tabular-nums"
              style={{ color: primary }}
              aria-label={`Overall rating: ${formattedRating}`}
            >
              {formattedRating}
            </span>
            <StarRating
              rating={content.overallRating}
              primary={primary}
              size="lg"
            />
            <span className="text-sm opacity-60 mt-1">
              {content.totalReviews.toLocaleString()} review
              {content.totalReviews !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Divider */}
          <div
            className="hidden sm:block w-px self-stretch opacity-20"
            style={{ backgroundColor: textColor }}
            aria-hidden="true"
          />
          <div
            className="sm:hidden w-full h-px opacity-20"
            style={{ backgroundColor: textColor }}
            aria-hidden="true"
          />

          {/* Breakdown bars */}
          <div className="flex-1 w-full flex flex-col gap-2.5" aria-label="Rating breakdown">
            {content.breakdown
              .slice()
              .sort((a, b) => b.stars - a.stars)
              .map((row) => {
                const pct = maxCount > 0 ? (row.count / maxCount) * 100 : 0;
                return (
                  <div
                    key={row.stars}
                    className="flex items-center gap-3"
                    aria-label={`${row.stars} stars: ${row.count} reviews`}
                  >
                    {/* Star label */}
                    <span className="flex items-center gap-1 text-sm font-medium w-10 flex-shrink-0 justify-end">
                      {row.stars}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5"
                        fill={primary}
                        aria-hidden="true"
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    </span>

                    {/* Progress track */}
                    <div
                      className="flex-1 h-2.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: `${primary}22` }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: primary,
                        }}
                      />
                    </div>

                    {/* Count */}
                    <span className="text-sm opacity-60 w-8 flex-shrink-0 tabular-nums">
                      {row.count}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
