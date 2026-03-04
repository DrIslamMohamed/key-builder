"use client";

import { useRef } from "react";
import { CarouselContent, CarouselSlide } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Props = {
  content: CarouselContent;
  onChange: (c: CarouselContent) => void;
};

export default function CarouselEditor({ content, onChange }: Props) {
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  function updateField<K extends keyof CarouselContent>(field: K, value: CarouselContent[K]) {
    onChange({ ...content, [field]: value });
  }

  function updateSlide(id: string, field: keyof CarouselSlide, value: string) {
    onChange({
      ...content,
      slides: content.slides.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    });
  }

  function addSlide() {
    const newSlide: CarouselSlide = {
      id: crypto.randomUUID(),
      image: "",
      caption: "",
      subcaption: "",
    };
    onChange({ ...content, slides: [...content.slides, newSlide] });
  }

  function removeSlide(id: string) {
    onChange({ ...content, slides: content.slides.filter((s) => s.id !== id) });
  }

  async function handleImageUpload(id: string, file: File) {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        updateSlide(id, "image", url);
        toast.success("Image uploaded");
      } catch {
        toast.error("Failed to upload image");
      }
    };
    reader.readAsDataURL(file);
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
        <Label className="text-zinc-400 text-xs">Autoplay Speed (ms)</Label>
        <Input
          type="number"
          value={content.autoplaySpeed}
          onChange={(e) => updateField("autoplaySpeed", Number(e.target.value))}
          className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-zinc-400 text-xs">Slides</Label>
        {content.slides.map((slide, index) => (
          <div key={slide.id} className="space-y-2 p-3 bg-zinc-900 rounded border border-zinc-700">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-xs">Slide {index + 1}</span>
              <button
                onClick={() => removeSlide(slide.id)}
                className="text-zinc-500 hover:text-red-400 text-xs"
              >
                Remove
              </button>
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={slide.image}
                  onChange={(e) => updateSlide(slide.id, "image", e.target.value)}
                  placeholder="https://..."
                  className="bg-zinc-800 border-zinc-700 text-white text-sm h-8 flex-1"
                />
                <button
                  onClick={() => fileRefs.current[slide.id]?.click()}
                  className="px-2 h-8 text-xs bg-zinc-700 hover:bg-zinc-600 text-white rounded border border-zinc-600"
                >
                  Upload
                </button>
                <input
                  ref={(el) => { fileRefs.current[slide.id] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(slide.id, file);
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Caption</Label>
              <Input
                value={slide.caption}
                onChange={(e) => updateSlide(slide.id, "caption", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Subcaption</Label>
              <Input
                value={slide.subcaption}
                onChange={(e) => updateSlide(slide.id, "subcaption", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addSlide}
          className="w-full h-8 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700"
        >
          + Add Slide
        </button>
      </div>
    </div>
  );
}
