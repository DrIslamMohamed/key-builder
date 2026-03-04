import { PageMeta, HeroContent } from "@/lib/types";

type Props = {
  meta: PageMeta;
  content: HeroContent;
  isPreview?: boolean;
};

export default function HeroSection({ meta, content, isPreview }: Props) {
  const { primary, background, text } = meta.colorTheme;

  return (
    <section
      style={{ backgroundColor: background, color: text }}
      className="relative py-20 px-6 text-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primary}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        {/* Member photo */}
        {meta.memberPhoto && (
          <div className="flex justify-center">
            <img
              src={meta.memberPhoto}
              alt={meta.memberName}
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{ borderColor: primary }}
            />
          </div>
        )}

        {/* Member name */}
        <div className="text-sm font-medium opacity-70">{meta.memberName}</div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-5xl font-extrabold leading-tight"
          style={{ color: primary }}
        >
          {content.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
          {content.subheadline}
        </p>

        {/* CTA */}
        {!isPreview && (
          <a
            href="#register"
            className="inline-block px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: primary, color: background }}
          >
            {content.ctaText}
          </a>
        )}
        {isPreview && (
          <button
            className="inline-block px-8 py-4 rounded-full font-bold text-lg opacity-80"
            style={{ backgroundColor: primary, color: background }}
          >
            {content.ctaText}
          </button>
        )}
      </div>
    </section>
  );
}
