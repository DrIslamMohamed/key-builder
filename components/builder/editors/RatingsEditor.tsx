"use client";

import { RatingsContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  content: RatingsContent;
  onChange: (c: RatingsContent) => void;
};

export default function RatingsEditor({ content, onChange }: Props) {
  function updateField<K extends keyof RatingsContent>(field: K, value: RatingsContent[K]) {
    onChange({ ...content, [field]: value });
  }

  function updateBreakdownCount(stars: number, count: number) {
    onChange({
      ...content,
      breakdown: content.breakdown.map((b) => (b.stars === stars ? { ...b, count } : b)),
    });
  }

  const sortedBreakdown = [...content.breakdown].sort((a, b) => b.stars - a.stars);

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
        <Label className="text-zinc-400 text-xs">Overall Rating (0–5)</Label>
        <Input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={content.overallRating}
          onChange={(e) => updateField("overallRating", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Total Reviews</Label>
        <Input
          type="number"
          min={0}
          value={content.totalReviews}
          onChange={(e) => updateField("totalReviews", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-400 text-xs">Breakdown by Stars</Label>
        {sortedBreakdown.map((b) => (
          <div key={b.stars} className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs w-12 shrink-0">{b.stars} stars</span>
            <Input
              type="number"
              min={0}
              value={b.count}
              onChange={(e) => updateBreakdownCount(b.stars, Number(e.target.value))}
              className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
