"use client";

import { LimitedSeatsContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  content: LimitedSeatsContent;
  onChange: (c: LimitedSeatsContent) => void;
};

export default function LimitedSeatsEditor({ content, onChange }: Props) {
  function updateField<K extends keyof LimitedSeatsContent>(
    field: K,
    value: LimitedSeatsContent[K]
  ) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Total Seats</Label>
        <Input
          type="number"
          min={0}
          value={content.totalSeats}
          onChange={(e) => updateField("totalSeats", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Remaining Seats</Label>
        <Input
          type="number"
          min={0}
          value={content.remainingSeats}
          onChange={(e) => updateField("remainingSeats", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">
          Message{" "}
          <span className="text-zinc-600">(use {"{remaining}"} for count)</span>
        </Label>
        <Input
          value={content.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Urgency Message</Label>
        <Input
          value={content.urgencyMessage}
          onChange={(e) => updateField("urgencyMessage", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>
    </div>
  );
}
