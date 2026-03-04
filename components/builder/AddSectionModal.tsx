"use client";

import { SectionType } from "@/lib/types";
import { TranslationKey } from "@/lib/i18n";
import { useLanguage } from "@/components/LanguageProvider";
import { X } from "lucide-react";

const SECTION_CATALOG: { type: SectionType; icon: string; descEn: string; descAr: string }[] = [
  { type: "hero", icon: "🎯", descEn: "Main banner with headline and CTA", descAr: "بانر رئيسي مع عنوان وزر" },
  { type: "forWhom", icon: "👥", descEn: "Who is this for — icon list", descAr: "لمن هذا — قائمة بأيقونات" },
  { type: "benefits", icon: "✅", descEn: "Numbered benefits list", descAr: "قائمة مزايا مرقمة" },
  { type: "fomo", icon: "⚡", descEn: "Urgency points with alert styling", descAr: "نقاط إلحاح بتصميم تنبيه" },
  { type: "registrationForm", icon: "📝", descEn: "Registration form with name, email, phone", descAr: "نموذج تسجيل بالاسم والبريد والهاتف" },
  { type: "gallery", icon: "🖼️", descEn: "Photo gallery with lightbox", descAr: "معرض صور مع عرض مكبر" },
  { type: "video", icon: "🎬", descEn: "YouTube, Vimeo, or custom video", descAr: "يوتيوب أو فيميو أو فيديو مخصص" },
  { type: "testimonials", icon: "💬", descEn: "Customer reviews with star ratings", descAr: "آراء العملاء مع نجوم التقييم" },
  { type: "carousel", icon: "🎠", descEn: "Auto-sliding image carousel", descAr: "عرض شرائح تلقائي" },
  { type: "ratings", icon: "⭐", descEn: "Overall rating with breakdown bars", descAr: "تقييم إجمالي مع أشرطة توزيع" },
  { type: "faq", icon: "❓", descEn: "Accordion FAQ section", descAr: "قسم أسئلة شائعة قابل للطي" },
  { type: "countdown", icon: "⏱️", descEn: "Live countdown timer", descAr: "عداد تنازلي مباشر" },
  { type: "visitorCounter", icon: "👁️", descEn: "Live visitor counter for FOMO", descAr: "عداد زوار مباشر لخلق الإلحاح" },
  { type: "limitedSeats", icon: "🪑", descEn: "Limited seats with progress bar", descAr: "مقاعد محدودة مع شريط تقدم" },
  { type: "registerNow", icon: "🚀", descEn: "Bold CTA section with urgency", descAr: "قسم دعوة بارز مع إلحاح" },
];

type Props = {
  onAdd: (type: SectionType) => void;
  onClose: () => void;
};

export default function AddSectionModal({ onAdd, onClose }: Props) {
  const { t, lang } = useLanguage();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
          <h2 className="text-sm font-semibold text-white">{t("chooseSectionType")}</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section grid */}
        <div className="overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SECTION_CATALOG.map(({ type, icon, descEn, descAr }) => {
            const label = t(type as TranslationKey);
            const desc = lang === "ar" ? descAr : descEn;
            return (
              <button
                key={type}
                onClick={() => { onAdd(type); onClose(); }}
                className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 hover:border-yellow-400/50 hover:bg-yellow-400/5 transition-all text-start group"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-yellow-400 transition-colors truncate">
                    {label}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5 leading-snug">{desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
