import { HeroContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
};

export default function HeroEditor({ content, onChange }: Props) {
  function update(field: keyof HeroContent, value: string) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Headline</Label>
        <Textarea
          value={content.headline}
          onChange={(e) => update("headline", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
          rows={2}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Subheadline</Label>
        <Textarea
          value={content.subheadline}
          onChange={(e) => update("subheadline", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
          rows={3}
        />
      </div>
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">CTA Button Text</Label>
        <Input
          value={content.ctaText}
          onChange={(e) => update("ctaText", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>
    </div>
  );
}
