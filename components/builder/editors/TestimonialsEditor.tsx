"use client";

import { useRef } from "react";
import { TestimonialsContent, TestimonialItem } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Upload, Star, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
  content: TestimonialsContent;
  onChange: (content: TestimonialsContent) => void;
};

export default function TestimonialsEditor({ content, onChange }: Props) {
  const { t } = useLanguage();
  // One file input ref per testimonial, keyed by index
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function updateTitle(title: string) {
    onChange({ ...content, title });
  }

  function updateItem(id: string, patch: Partial<TestimonialItem>) {
    onChange({
      ...content,
      items: content.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    });
  }

  function removeItem(id: string) {
    onChange({
      ...content,
      items: content.items.filter((item) => item.id !== id),
    });
  }

  function addItem() {
    const newItem: TestimonialItem = {
      id: Date.now().toString(),
      name: "",
      role: "",
      photo: "",
      rating: 5,
      text: "",
    };
    onChange({ ...content, items: [...content.items, newItem] });
  }

  function handlePhotoUpload(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const item = content.items[index];
    if (!item) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const toastId = toast.loading("Uploading photo...");
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        if (!res.ok) throw new Error("Upload failed");
        const { url } = await res.json();
        updateItem(item.id, { photo: url });
        toast.success("Photo uploaded", { id: toastId });
      } catch {
        toast.error("Failed to upload photo", { id: toastId });
      }
    };
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  }

  return (
    <div className="space-y-4">
      {/* Section title */}
      <div className="space-y-1">
        <Label className="text-zinc-400 text-xs">{t("sectionTitle")}</Label>
        <Input
          value={content.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>

      {/* Testimonial list */}
      <div className="space-y-3">
        <Label className="text-zinc-400 text-xs">Testimonials</Label>
        {content.items.map((item, index) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-md p-3 space-y-3"
          >
            {/* Header row: photo + name/role + remove */}
            <div className="flex gap-3 items-start">
              {/* Photo thumbnail + upload */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center">
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircle size={24} className="text-zinc-500" />
                  )}
                </div>
                <input
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(index, e)}
                />
                <button
                  onClick={() => fileInputRefs.current[index]?.click()}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label="Upload photo"
                >
                  <Upload size={11} />
                </button>
              </div>

              {/* Name + Role */}
              <div className="flex-1 space-y-2 min-w-0">
                <Input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  placeholder="Name"
                  className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
                />
                <Input
                  value={item.role}
                  onChange={(e) => updateItem(item.id, { role: e.target.value })}
                  placeholder="Role / Title"
                  className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
                />
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-zinc-500 hover:text-red-400 p-1 flex-shrink-0 mt-0.5"
                aria-label="Remove testimonial"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Star rating */}
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateItem(item.id, { rating: star })}
                    className="focus:outline-none transition-colors"
                    aria-label={`Set rating to ${star}`}
                  >
                    <Star
                      size={18}
                      className={
                        star <= item.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-zinc-600"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review text */}
            <div className="space-y-1">
              <Label className="text-zinc-400 text-xs">Review</Label>
              <Textarea
                value={item.text}
                onChange={(e) => updateItem(item.id, { text: e.target.value })}
                placeholder="Write the testimonial..."
                className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add testimonial */}
      <Button
        onClick={addItem}
        variant="outline"
        size="sm"
        className="w-full border-zinc-700 text-zinc-400 hover:text-white text-xs"
      >
        <Plus size={12} className="me-1" /> Add Testimonial
      </Button>
    </div>
  );
}
