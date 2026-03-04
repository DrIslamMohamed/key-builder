import { PageMeta, ForWhomContent, SectionStyle } from "@/lib/types";
import { Target, TrendingUp, Users, Star, Zap, CheckCircle } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  star: Star,
  zap: Zap,
  check: CheckCircle,
};

const fontSizeClass = { sm: "text-sm", base: "text-base", lg: "text-lg" } as const;

type Props = {
  meta: PageMeta;
  content: ForWhomContent;
  style?: SectionStyle;
};

export default function ForWhomSection({ meta, content, style }: Props) {
  const { primary, background, text } = meta.colorTheme;
  const bg = style?.bgColor ?? background;
  const fg = style?.textColor ?? text;
  const sizeClass = fontSizeClass[style?.fontSize ?? "base"];

  return (
    <section
      style={{ backgroundColor: bg, color: fg }}
      className={`py-12 sm:py-16 px-4 sm:px-6 ${sizeClass}`}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10"
          style={{ color: primary }}
        >
          {content.title}
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {content.items.map((item) => {
            const Icon = ICONS[item.icon] || Target;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border"
                style={{ borderColor: `${primary}33`, backgroundColor: `${primary}0d` }}
              >
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${primary}22` }}
                >
                  <Icon size={22} style={{ color: primary }} />
                </div>
                <span className="text-sm sm:text-base">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
