"use client";

import { useRef } from "react";
import {
  PageConfig, PageMeta, Section, SectionContent, SectionStyle,
  HeroContent, ForWhomContent, BenefitsContent, FomoContent, RegistrationFormContent,
  GalleryContent, VideoContent, TestimonialsContent, CarouselContent,
  RatingsContent, FaqContent, CountdownContent, VisitorCounterContent,
  LimitedSeatsContent, RegisterNowContent,
} from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import HeroEditor from "./editors/HeroEditor";
import ForWhomEditor from "./editors/ForWhomEditor";
import BenefitsEditor from "./editors/BenefitsEditor";
import FomoEditor from "./editors/FomoEditor";
import FormEditor from "./editors/FormEditor";
import GalleryEditor from "./editors/GalleryEditor";
import VideoEditor from "./editors/VideoEditor";
import TestimonialsEditor from "./editors/TestimonialsEditor";
import CarouselEditor from "./editors/CarouselEditor";
import RatingsEditor from "./editors/RatingsEditor";
import FaqEditor from "./editors/FaqEditor";
import CountdownEditor from "./editors/CountdownEditor";
import VisitorCounterEditor from "./editors/VisitorCounterEditor";
import LimitedSeatsEditor from "./editors/LimitedSeatsEditor";
import RegisterNowEditor from "./editors/RegisterNowEditor";
import { toast } from "sonner";
import { useLanguage } from "@/components/LanguageProvider";
import { RotateCcw } from "lucide-react";

const COLOR_PRESETS = [
  { name: "Gold", primary: "#d4af37", background: "#0a0a0a", text: "#ffffff" },
  { name: "Blue", primary: "#3b82f6", background: "#0a0a0a", text: "#ffffff" },
  { name: "Green", primary: "#22c55e", background: "#0a0a0a", text: "#ffffff" },
  { name: "Purple", primary: "#a855f7", background: "#0a0a0a", text: "#ffffff" },
  { name: "Red", primary: "#ef4444", background: "#0a0a0a", text: "#ffffff" },
];

const FONT_SIZE_OPTIONS: { value: NonNullable<SectionStyle["fontSize"]>; labelKey: "fontSizeSm" | "fontSizeBase" | "fontSizeLg" }[] = [
  { value: "sm", labelKey: "fontSizeSm" },
  { value: "base", labelKey: "fontSizeBase" },
  { value: "lg", labelKey: "fontSizeLg" },
];

type Props = {
  config: PageConfig;
  selectedId: string | null;
  onMetaChange: (meta: PageMeta) => void;
  onSectionChange: (sectionId: string, content: SectionContent) => void;
  onSectionStyleChange: (sectionId: string, style: SectionStyle) => void;
  onPhotoUpload: (url: string) => void;
};

export default function RightPanel({
  config,
  selectedId,
  onMetaChange,
  onSectionChange,
  onSectionStyleChange,
  onPhotoUpload,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const selectedSection = config.sections.find((s) => s.id === selectedId);
  const { t } = useLanguage();

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      const loadingToast = toast.loading(t("uploadingPhoto"));
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: base64 }),
        });
        const data = await res.json();
        if (data.url) {
          onPhotoUpload(data.url);
          toast.success(t("photoUploaded"), { id: loadingToast });
        }
      } catch {
        toast.error(t("uploadFailed"), { id: loadingToast });
      }
    };
    reader.readAsDataURL(file);
  }

  function updateMeta(field: keyof PageMeta, value: string) {
    onMetaChange({ ...config.meta, [field]: value });
  }

  function updateColorTheme(preset: typeof COLOR_PRESETS[0]) {
    onMetaChange({
      ...config.meta,
      colorTheme: { primary: preset.primary, background: preset.background, text: preset.text },
    });
  }

  function updateStyle(field: keyof SectionStyle, value: string | undefined) {
    if (!selectedSection) return;
    const current = selectedSection.style ?? {};
    onSectionStyleChange(selectedSection.id, { ...current, [field]: value });
  }

  function resetStyle() {
    if (!selectedSection) return;
    onSectionStyleChange(selectedSection.id, {});
  }

  return (
    <div className="w-[280px] lg:w-[320px] flex-shrink-0 border-s border-zinc-800 flex flex-col">
      {/* Page Settings */}
      <div className="p-4 border-b border-zinc-800 flex-shrink-0">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">{t("pageSettings")}</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">{t("memberName")}</Label>
            <Input
              value={config.meta.memberName}
              onChange={(e) => updateMeta("memberName", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">{t("whatsappNumber")}</Label>
            <Input
              value={config.meta.whatsappNumber}
              onChange={(e) => updateMeta("whatsappNumber", e.target.value)}
              placeholder="201012345678"
              className="bg-zinc-800 border-zinc-700 text-white text-sm h-8"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">{t("profilePhoto")}</Label>
            <div className="flex items-center gap-2">
              {config.meta.memberPhoto && (
                <img src={config.meta.memberPhoto} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              )}
              <button
                onClick={() => fileRef.current?.click()}
                className="flex-1 py-1.5 px-3 rounded border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 text-xs transition-colors"
              >
                {config.meta.memberPhoto ? t("changePhoto") : t("uploadPhoto")}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-zinc-400 text-xs">{t("colorTheme")}</Label>
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
      <div className="flex-1 overflow-y-auto">
        {selectedSection ? (
          <div className="p-4 space-y-5">
            {/* Section Style */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t("sectionStyle")}</h3>
                <button
                  onClick={resetStyle}
                  className="text-zinc-600 hover:text-zinc-400 transition-colors"
                  title={t("resetStyle")}
                >
                  <RotateCcw size={12} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-zinc-400 text-xs">{t("backgroundColor")}</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedSection.style?.bgColor ?? config.meta.colorTheme.background}
                        onChange={(e) => updateStyle("bgColor", e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border border-zinc-700 bg-transparent"
                      />
                      <button
                        onClick={() => updateStyle("bgColor", undefined)}
                        className="text-xs text-zinc-600 hover:text-zinc-400"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-zinc-400 text-xs">{t("textColor")}</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedSection.style?.textColor ?? config.meta.colorTheme.text}
                        onChange={(e) => updateStyle("textColor", e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border border-zinc-700 bg-transparent"
                      />
                      <button
                        onClick={() => updateStyle("textColor", undefined)}
                        className="text-xs text-zinc-600 hover:text-zinc-400"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-zinc-400 text-xs">{t("fontSize")}</Label>
                  <div className="flex gap-1">
                    {FONT_SIZE_OPTIONS.map(({ value, labelKey }) => (
                      <button
                        key={value}
                        onClick={() => updateStyle("fontSize", value)}
                        className={`flex-1 py-1 text-xs rounded border transition-colors ${
                          (selectedSection.style?.fontSize ?? "base") === value
                            ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                            : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        {t(labelKey)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Content Editor */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                {t("editSection")}
              </h3>
              <SectionEditorSwitch
                section={selectedSection}
                onChange={(content) => onSectionChange(selectedSection.id, content)}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-zinc-600 text-sm text-center p-4">
            {t("clickSection")}
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
    case "gallery":
      return <GalleryEditor content={section.content as GalleryContent} onChange={onChange} />;
    case "video":
      return <VideoEditor content={section.content as VideoContent} onChange={onChange} />;
    case "testimonials":
      return <TestimonialsEditor content={section.content as TestimonialsContent} onChange={onChange} />;
    case "carousel":
      return <CarouselEditor content={section.content as CarouselContent} onChange={onChange} />;
    case "ratings":
      return <RatingsEditor content={section.content as RatingsContent} onChange={onChange} />;
    case "faq":
      return <FaqEditor content={section.content as FaqContent} onChange={onChange} />;
    case "countdown":
      return <CountdownEditor content={section.content as CountdownContent} onChange={onChange} />;
    case "visitorCounter":
      return <VisitorCounterEditor content={section.content as VisitorCounterContent} onChange={onChange} />;
    case "limitedSeats":
      return <LimitedSeatsEditor content={section.content as LimitedSeatsContent} onChange={onChange} />;
    case "registerNow":
      return <RegisterNowEditor content={section.content as RegisterNowContent} onChange={onChange} />;
    default:
      return null;
  }
}
