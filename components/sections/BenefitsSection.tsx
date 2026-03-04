import { PageMeta, BenefitsContent } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

type Props = {
  meta: PageMeta;
  content: BenefitsContent;
};

export default function BenefitsSection({ meta, content }: Props) {
  const { primary, background, text } = meta.colorTheme;
  const bgAlt = background === "#0a0a0a" ? "#111111" : `${background}cc`;

  return (
    <section
      style={{ backgroundColor: bgAlt, color: text }}
      className="py-12 sm:py-16 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
          style={{ color: primary }}
        >
          {content.title}
        </h2>
        <div className="grid gap-4">
          {content.items.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 sm:gap-4">
              <div
                className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm"
                style={{ backgroundColor: primary, color: background }}
              >
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: primary }} />
                  <span className="text-sm sm:text-base">{item.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
