"use client";

import { CountdownContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  content: CountdownContent;
  onChange: (c: CountdownContent) => void;
};

export default function CountdownEditor({ content, onChange }: Props) {
  function updateField<K extends keyof CountdownContent>(field: K, value: CountdownContent[K]) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Title</Label>
        <Input
          value={content.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Target Date &amp; Time</Label>
        <input
          type="datetime-local"
          value={content.targetDate}
          onChange={(e) => updateField("targetDate", e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm h-8 rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-zinc-500"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Label (below timer)</Label>
        <Input
          value={content.label}
          onChange={(e) => updateField("label", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>
    </div>
  );
}
