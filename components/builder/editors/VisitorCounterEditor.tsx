"use client";

import { VisitorCounterContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  content: VisitorCounterContent;
  onChange: (c: VisitorCounterContent) => void;
};

export default function VisitorCounterEditor({ content, onChange }: Props) {
  function updateField<K extends keyof VisitorCounterContent>(
    field: K,
    value: VisitorCounterContent[K]
  ) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Message</Label>
        <Input
          value={content.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Base Count</Label>
        <Input
          type="number"
          min={0}
          value={content.baseCount}
          onChange={(e) => updateField("baseCount", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Min Count</Label>
        <Input
          type="number"
          min={0}
          value={content.minCount}
          onChange={(e) => updateField("minCount", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Max Count</Label>
        <Input
          type="number"
          min={0}
          value={content.maxCount}
          onChange={(e) => updateField("maxCount", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Update Interval (ms)</Label>
        <Input
          type="number"
          min={500}
          step={500}
          value={content.updateInterval}
          onChange={(e) => updateField("updateInterval", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>
    </div>
  );
}
