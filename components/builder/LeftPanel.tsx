"use client";

import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Section, SectionType } from "@/lib/types";
import SortableSection from "./SortableSection";
import AddSectionModal from "./AddSectionModal";
import { useLanguage } from "@/components/LanguageProvider";
import { Plus } from "lucide-react";

type Props = {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onAddSection: (type: SectionType) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function LeftPanel({
  sections,
  selectedId,
  onSelect,
  onToggleVisible,
  onReorder,
  onAddSection,
  onDuplicate,
  onDelete,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );
  const { t } = useLanguage();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  }

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="w-[200px] flex-shrink-0 border-e border-zinc-800 flex flex-col">
        <div className="px-3 py-3 border-b border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t("sections")}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sorted.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {sorted.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  isSelected={selectedId === section.id}
                  onSelect={() => onSelect(section.id)}
                  onToggleVisible={() => onToggleVisible(section.id)}
                  onDuplicate={() => onDuplicate(section.id)}
                  onDelete={() => onDelete(section.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Add Section button */}
        <div className="p-2 border-t border-zinc-800 flex-shrink-0">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-dashed border-zinc-700 text-zinc-500 hover:border-yellow-400/50 hover:text-yellow-400 transition-colors text-xs font-medium"
          >
            <Plus size={13} />
            {t("addSection")}
          </button>
        </div>
      </div>

      {showModal && (
        <AddSectionModal
          onAdd={onAddSection}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
