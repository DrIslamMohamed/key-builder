import { PageMeta, ForWhomContent } from "@/lib/types";
import { Target, TrendingUp, Users, Star, Zap, CheckCircle } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  star: Star,
  zap: Zap,
  check: CheckCircle,
};

type Props = {
  meta: PageMeta;
  content: ForWhomContent;
};

export default function ForWhomSection({ meta, content }: Props) {
  const { primary, background, text } = meta.colorTheme;

  return (
    <section
      style={{ backgroundColor: background, color: text }}
      className="py-16 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl font-bold text-center mb-10"
          style={{ color: primary }}
        >
          {content.title}
        </h2>
        <div className="space-y-4">
          {content.items.map((item) => {
            const Icon = ICONS[item.icon] || Target;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl border"
                style={{ borderColor: `${primary}33`, backgroundColor: `${primary}0d` }}
              >
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${primary}22` }}
                >
                  <Icon size={24} style={{ color: primary }} />
                </div>
                <span className="text-base">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
