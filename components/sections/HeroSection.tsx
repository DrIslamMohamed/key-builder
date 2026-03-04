import { PageMeta, HeroContent, SectionStyle } from "@/lib/types";

const fontSizeClass = { sm: "text-sm", base: "text-base", lg: "text-lg" } as const;

type Props = {
  meta: PageMeta;
  content: HeroContent;
  isPreview?: boolean;
  style?: SectionStyle;
};

export default function HeroSection({ meta, content, isPreview, style }: Props) {
  const { primary, background, text } = meta.colorTheme;
  const bg = style?.bgColor ?? background;
  const fg = style?.textColor ?? text;
  const sizeClass = fontSizeClass[style?.fontSize ?? "base"];

  return (
    <section
      style={{ backgroundColor: bg, color: fg }}
      className={`relative py-14 sm:py-20 px-4 sm:px-6 text-center overflow-hidden ${sizeClass}`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primary}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-5 sm:space-y-6">
        {meta.memberPhoto && (
          <div className="flex justify-center">
            <img
              src={meta.memberPhoto}
              alt={meta.memberName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4"
              style={{ borderColor: primary }}
            />
          </div>
        )}

        <div className="text-sm font-medium opacity-70">{meta.memberName}</div>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
          style={{ color: primary }}
        >
          {content.headline}
        </h1>

        <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
          {content.subheadline}
        </p>

        {!isPreview && (
          <a
            href="#register"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: primary, color: background }}
          >
            {content.ctaText}
          </a>
        )}
        {isPreview && (
          <button
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg opacity-80"
            style={{ backgroundColor: primary, color: background }}
          >
            {content.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
