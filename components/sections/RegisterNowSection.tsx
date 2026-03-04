import { PageMeta, RegisterNowContent, SectionStyle } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: RegisterNowContent;
  style?: SectionStyle;
};

export default function RegisterNowSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;

  const bgColor = style?.bgColor ?? background;
  const textColor = style?.textColor ?? text;
  const fontSizeClass =
    style?.fontSize === "sm"
      ? "text-sm"
      : style?.fontSize === "lg"
      ? "text-lg"
      : "text-base";

  return (
    <section
      style={{ backgroundColor: bgColor, color: textColor }}
      className={`relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden text-center ${fontSizeClass}`}
    >
      {/* Radial gradient backdrop — two overlapping glows for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${primary}30, transparent 80%),
                       radial-gradient(ellipse 50% 40% at 50% 0%, ${primary}18, transparent 70%)`,
        }}
      />

      {/* Subtle top border accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${primary}60, transparent)` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${primary}30, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Urgency badge */}
        {content.urgencyText && (
          <p
            className="inline-block text-sm sm:text-base font-semibold px-4 py-1.5 rounded-full"
            style={{
              backgroundColor: `${primary}20`,
              color: primary,
              border: `1px solid ${primary}40`,
            }}
          >
            {content.urgencyText}
          </p>
        )}

        {/* Headline */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          style={{ color: primary }}
        >
          {content.headline}
        </h2>

        {/* Subheadline */}
        {content.subheadline && (
          <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">
            {content.subheadline}
          </p>
        )}

        {/* CTA button */}
        <div>
          <a
            href="#register"
            className="inline-block px-8 sm:px-12 py-4 sm:py-5 rounded-full
                       font-extrabold text-base sm:text-lg md:text-xl
                       transition-transform duration-200 hover:scale-105 active:scale-95
                       shadow-lg"
            style={{
              backgroundColor: primary,
              color: background,
              boxShadow: `0 0 32px ${primary}50`,
            }}
          >
            {content.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
