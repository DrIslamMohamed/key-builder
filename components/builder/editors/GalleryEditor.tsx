"use client";

import { useRef, useState } from "react";
import { GalleryContent, GalleryImage } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  content: GalleryContent;
  onChange: (content: GalleryContent) => void;
};

export default function GalleryEditor({ content, onChange }: Props) {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState("");

  function updateTitle(title: string) {
    onChange({ ...content, title });
  }

  function updateImageAlt(id: string, alt: string) {
    onChange({
      ...content,
      images: content.images.map((img) =>
        img.id === id ? { ...img, alt } : img
      ),
    });
  }

  function removeImage(id: string) {
    onChange({
      ...content,
      images: content.images.filter((img) => img.id !== id),
    });
  }

  function addImageByUrl() {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      url: trimmed,
      alt: "",
    };
    onChange({ ...content, images: [...content.images, newImage] });
    setUrlInput("");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const toastId = toast.loading("Uploading image...");
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        const newImage: GalleryImage = {
          id: Date.now().toString(),
          url,
          alt: file.name.replace(/\.[^.]+$/, ""),
        };
        onChange({ ...content, images: [...content.images, newImage] });
        toast.success("Image uploaded", { id: toastId });
      } catch {
        toast.error("Failed to upload image", { id: toastId });
      }
    };
    reader.readAsDataURL(file);
    // reset so the same file can be re-selected
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">{t("sectionTitle")}</Label>
        <Input
          value={content.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>

      {/* Image list */}
      <div className="space-y-2">
        <Label className="text-zinc-400 text-xs">Images</Label>
        {content.images.length === 0 && (
          <p className="text-zinc-600 text-xs py-2 text-center">
            No images yet. Upload or add a URL below.
          </p>
        )}
        {content.images.map((img) => (
          <div
            key={img.id}
            className="flex gap-2 items-center bg-zinc-900 rounded-md p-2"
          >
            {/* Thumbnail */}
            <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-zinc-700 flex items-center justify-center">
              {img.url ? (
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon size={16} className="text-zinc-500" />
              )}
            </div>

            {/* Alt input */}
            <Input
              value={img.alt}
              onChange={(e) => updateImageAlt(img.id, e.target.value)}
              placeholder="Alt text"
              className="bg-zinc-800 border-zinc-700 text-white text-sm flex-1 h-8"
            />

            {/* Remove */}
            <button
              onClick={() => removeImage(img.id)}
              className="text-zinc-500 hover:text-red-400 p-1 flex-shrink-0"
              aria-label="Remove image"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Upload file */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="w-full border-zinc-700 text-zinc-400 hover:text-white text-xs"
        >
          <Upload size={12} className="me-1" /> Upload Image
        </Button>
      </div>

      {/* Add by URL */}
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">Add by URL</Label>
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addImageByUrl()}
            placeholder="https://..."
            className="bg-zinc-800 border-zinc-700 text-white text-sm flex-1"
          />
          <Button
            onClick={addImageByUrl}
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-400 hover:text-white text-xs flex-shrink-0"
          >
            <Plus size={12} className="me-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}
