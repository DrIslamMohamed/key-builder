import { PageMeta, FomoContent } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

type Props = {
  meta: PageMeta;
  content: FomoContent;
};

export default function FomoSection({ meta, content }: Props) {
  const { primary, background, text } = meta.colorTheme;

  return (
    <section
      style={{ backgroundColor: background, color: text }}
      className="py-12 sm:py-16 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-7 sm:mb-8">
          <AlertTriangle size={24} style={{ color: primary }} />
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
            {content.title}
          </h2>
        </div>
        <div className="space-y-3">
          {content.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border-l-4 text-sm sm:text-base"
              style={{
                borderColor: primary,
                backgroundColor: `${primary}11`,
              }}
            >
              <span className="text-xl" style={{ color: primary }}>⚡</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
