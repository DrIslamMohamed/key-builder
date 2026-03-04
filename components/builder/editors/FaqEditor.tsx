"use client";

import { FaqContent, FaqItem } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  content: FaqContent;
  onChange: (c: FaqContent) => void;
};

export default function FaqEditor({ content, onChange }: Props) {
  function updateTitle(title: string) {
    onChange({ ...content, title });
  }

  function updateItem(id: string, field: keyof FaqItem, value: string) {
    onChange({
      ...content,
      items: content.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    });
  }

  function addItem() {
    const newItem: FaqItem = {
      id: crypto.randomUUID(),
      question: "",
      answer: "",
    };
    onChange({ ...content, items: [...content.items, newItem] });
  }

  function removeItem(id: string) {
    onChange({ ...content, items: content.items.filter((item) => item.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Title</Label>
        <Input
          value={content.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-zinc-400 text-xs">Questions</Label>
        {content.items.map((item, index) => (
          <div key={item.id} className="space-y-2 p-3 bg-zinc-900 rounded border border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-xs">Q{index + 1}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-zinc-500 hover:text-red-400 text-xs"
              >
                Remove
              </button>
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Question</Label>
              <Input
                value={item.question}
                onChange={(e) => updateItem(item.id, "question", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Answer</Label>
              <Textarea
                value={item.answer}
                onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
                rows={3}
              />
            </div>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full h-8 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
        >
          + Add Question
        </button>
      </div>
    </div>
  );
}
