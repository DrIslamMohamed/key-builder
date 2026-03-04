"use client";

import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Section } from "@/lib/types";
import SortableSection from "./SortableSection";

type Props = {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
};

export default function LeftPanel({ sections, selectedId, onSelect, onToggleVisible, onReorder }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorder(active.id as string, over.id as string);
    }
  }

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="w-[200px] flex-shrink-0 border-r border-zinc-800 flex flex-col">
      <div className="px-3 py-3 border-b border-zinc-800">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sections</span>
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
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
