"use client";

import { useRef } from "react";
import { PageConfig, PageMeta, Section, SectionContent, HeroContent, ForWhomContent, BenefitsContent, FomoContent, RegistrationFormContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import HeroEditor from "./editors/HeroEditor";
import ForWhomEditor from "./editors/ForWhomEditor";
import BenefitsEditor from "./editors/BenefitsEditor";
import FomoEditor from "./editors/FomoEditor";
import FormEditor from "./editors/FormEditor";
import { toast } from "sonner";

const COLOR_PRESETS = [
  { name: "Gold", primary: "#d4af37", background: "#0a0a0a", text: "#ffffff" },
  { name: "Blue", primary: "#3b82f6", background: "#0a0a0a", text: "#ffffff" },
  { name: "Green", primary: "#22c55e", background: "#0a0a0a", text: "#ffffff" },
  { name: "Purple", primary: "#a855f7", background: "#0a0a0a", text: "#ffffff" },
  { name: "Red", primary: "#ef4444", background: "#0a0a0a", text: "#ffffff" },
];

type Props = {
  config: PageConfig;
  selectedId: string | null;
  onMetaChange: (meta: PageMeta) => void;
  onSectionChange: (sectionId: string, content: SectionContent) => void;
  onPhotoUpload: (url: string) => void;
};

export default function RightPanel({ config, selectedId, onMetaChange, onSectionChange, onPhotoUpload }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedSection = config.sections.find((s) => s.id === selectedId);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const loadingToast = toast.loading("Uploading photo...");
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        const data = await res.json();
        if (data.url) {
          onPhotoUpload(data.url);
          toast.success("Photo uploaded!", { id: loadingToast });
        }
      } catch {
        toast.error("Upload failed", { id: loadingToast });
      }
    };
    reader.readAsDataURL(file);
  }

  function updateMeta(field: keyof PageMeta, value: string) {
    onMetaChange({ ...config.meta, [field]: value });
  }

  function updateColorTheme(preset: typeof COLOR_PRESETS[0]) {
    onMetaChange({ ...config.meta, colorTheme: { primary: preset.primary, background: preset.background, text: preset.text } });
  }

  return (
    <div className="w-[320px] flex-shrink-0 border-l border-zinc-800 flex flex-col">
      {/* Page Settings */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Page Settings</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Member Name</Label>
            <Input
              value={config.meta.memberName}
              onChange={(e) => updateMeta("memberName", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">WhatsApp Number</Label>
            <Input
              value={config.meta.whatsappNumber}
              onChange={(e) => updateMeta("whatsappNumber", e.target.value)}
              placeholder="201012345678"
              className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Profile Photo</Label>
            <div className="flex items-center gap-2">
              {config.meta.memberPhoto && (
                <img src={config.meta.memberPhoto} alt="" className="w-10 h-10 rounded-full object-cover" />
              )}
              <button
                onClick={() => fileRef.current?.click()}
                className="flex-1 py-1.5 px-3 rounded border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-xs transition-colors"
              >
                {config.meta.memberPhoto ? "Change Photo" : "Upload Photo"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">Color Theme</Label>
            <div className="flex gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateColorTheme(preset)}
                  title={preset.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    config.meta.colorTheme.primary === preset.primary
                      ? "border-white scale-110"
                      : "border-transparent hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: preset.primary }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Editor */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedSection ? (
          <>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Edit Section
            </h3>
            <SectionEditorSwitch
              section={selectedSection}
              onChange={(content) => onSectionChange(selectedSection.id, content)}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-32 text-zinc-600 text-sm text-center">
            Click a section in the preview to edit it
          </div>
        )}
      </div>
    </div>
  );
}

function SectionEditorSwitch({
  section,
  onChange,
}: {
  section: Section;
  onChange: (content: SectionContent) => void;
}) {
  switch (section.type) {
    case "hero":
      return <HeroEditor content={section.content as HeroContent} onChange={onChange} />;
    case "forWhom":
      return <ForWhomEditor content={section.content as ForWhomContent} onChange={onChange} />;
    case "benefits":
      return <BenefitsEditor content={section.content as BenefitsContent} onChange={onChange} />;
    case "fomo":
      return <FomoEditor content={section.content as FomoContent} onChange={onChange} />;
    case "registrationForm":
      return <FormEditor content={section.content as RegistrationFormContent} onChange={onChange} />;
    default:
      return null;
  }
}
