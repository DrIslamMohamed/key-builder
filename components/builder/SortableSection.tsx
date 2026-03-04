"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Section } from "@/lib/types";
import { GripVertical, Eye, EyeOff, Copy, Trash2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { TranslationKey } from "@/lib/i18n";

const SECTION_LABEL_KEYS: Record<string, TranslationKey> = {
  hero: "hero",
  forWhom: "forWhom",
  benefits: "benefits",
  fomo: "fomo",
  registrationForm: "registrationForm",
  gallery: "gallery",
  video: "video",
  testimonials: "testimonials",
  carousel: "carousel",
  ratings: "ratings",
  faq: "faq",
  countdown: "countdown",
  visitorCounter: "visitorCounter",
  limitedSeats: "limitedSeats",
  registerNow: "registerNow",
};

type Props = {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisible: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export default function SortableSection({
  section,
  isSelected,
  onSelect,
  onToggleVisible,
  onDuplicate,
  onDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });
  const { t } = useLanguage();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const labelKey = SECTION_LABEL_KEYS[section.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1.5 px-2 py-2 rounded-lg cursor-pointer transition-colors group ${
        isSelected
          ? "bg-yellow-400/20 border border-yellow-400/50"
          : "hover:bg-zinc-800 border border-transparent"
      } ${!section.visible ? "opacity-50" : ""}`}
      onClick={onSelect}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-0.5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={14} />
      </button>

      {/* Label */}
      <span className="flex-1 text-xs text-zinc-300 truncate">
        {labelKey ? t(labelKey) : section.type}
      </span>

      {/* Actions — shown on hover */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleVisible(); }}
          className="text-zinc-600 hover:text-zinc-300 p-0.5"
          title={section.visible ? "Hide" : "Show"}
        >
          {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
          className="text-zinc-600 hover:text-zinc-300 p-0.5"
          title={t("duplicate")}
        >
          <Copy size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-zinc-600 hover:text-red-400 p-0.5"
          title={t("delete")}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}
