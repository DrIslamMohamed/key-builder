"use client";

import { RegisterNowContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  content: RegisterNowContent;
  onChange: (c: RegisterNowContent) => void;
};

export default function RegisterNowEditor({ content, onChange }: Props) {
  function updateField<K extends keyof RegisterNowContent>(
    field: K,
    value: RegisterNowContent[K]
  ) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Headline</Label>
        <Textarea
          value={content.headline}
          onChange={(e) => updateField("headline", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
          rows={2}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Subheadline</Label>
        <Textarea
          value={content.subheadline}
          onChange={(e) => updateField("subheadline", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">CTA Button Text</Label>
        <Input
          value={content.ctaText}
          onChange={(e) => updateField("ctaText", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Urgency Text</Label>
        <Input
          value={content.urgencyText}
          onChange={(e) => updateField("urgencyText", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>
    </div>
  );
}
