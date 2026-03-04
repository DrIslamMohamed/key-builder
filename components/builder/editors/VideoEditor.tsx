"use client";

import { VideoContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  content: VideoContent;
  onChange: (content: VideoContent) => void;
};

export default function VideoEditor({ content, onChange }: Props) {
  const { t } = useLanguage();

  function update(field: keyof VideoContent, value: string) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">{t("sectionTitle")}</Label>
        <Input
          value={content.title}
          onChange={(e) => update("title", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>

      {/* Video URL */}
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Video URL</Label>
        <Input
          value={content.videoUrl}
          onChange={(e) => update("videoUrl", e.target.value)}
          placeholder="https://..."
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
        <p className="text-zinc-600 text-xs">
          YouTube, Vimeo, or direct video URL
        </p>
      </div>
    </div>
  );
}
