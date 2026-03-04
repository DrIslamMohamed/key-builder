"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Section } from "@/lib/types";
import { GripVertical, Eye, EyeOff } from "lucide-react";

type Props = {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  onToggleVisible: () => void;
};

const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  forWhom: "For Whom",
  benefits: "Benefits",
  fomo: "FOMO",
  registrationForm: "Registration Form",
};

export default function SortableSection({ section, isSelected, onSelect, onToggleVisible }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors group ${
        isSelected
          ? "bg-yellow-400/20 border border-yellow-400/50"
          : "hover:bg-zinc-800 border border-transparent"
      } ${!section.visible ? "opacity-50" : ""}`}
      onClick={onSelect}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={14} />
      </button>

      <span className="flex-1 text-sm text-zinc-300 truncate">
        {SECTION_LABELS[section.type] || section.type}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisible();
        }}
        className="text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
      >
        {section.visible ? <Eye size={12} /> : <EyeOff size={12} />}
      </button>
    </div>
  );
}
