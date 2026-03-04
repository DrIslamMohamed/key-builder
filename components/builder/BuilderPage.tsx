"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { PageConfig, SectionContent, PageMeta } from "@/lib/types";
import LeftPanel from "./LeftPanel";
import CenterPreview from "./CenterPreview";
import RightPanel from "./RightPanel";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { LayoutList, Eye, Settings } from "lucide-react";

type Props = {
  initialConfig: PageConfig;
  initialPublished: boolean;
  initialSlug: string;
  userName: string;
};

type MobileTab = "sections" | "preview" | "settings";

export default function BuilderPage({ initialConfig, initialPublished, initialSlug, userName }: Props) {
  const [config, setConfig] = useState<PageConfig>(initialConfig);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [published, setPublished] = useState(initialPublished);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [publishing, setPublishing] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("preview");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleAutoSave = useCallback((newConfig: PageConfig) => {
    setSaveStatus("unsaved");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        const res = await fetch("/api/pages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ config: newConfig }),
        });
        if (res.ok) {
          setSaveStatus("saved");
        } else {
          setSaveStatus("unsaved");
          toast.error("Failed to save");
        }
      } catch {
        setSaveStatus("unsaved");
        toast.error("Failed to save");
      }
    }, 2000);
  }, []);

  function updateConfig(newConfig: PageConfig) {
    setConfig(newConfig);
    scheduleAutoSave(newConfig);
  }

  function handleMetaChange(meta: PageMeta) {
    updateConfig({ ...config, meta });
  }

  function handlePhotoUpload(url: string) {
    updateConfig({ ...config, meta: { ...config.meta, memberPhoto: url } });
  }

  function handleSectionChange(sectionId: string, content: SectionContent) {
    const newSections = config.sections.map((s) =>
      s.id === sectionId ? { ...s, content } : s
    );
    updateConfig({ ...config, sections: newSections });
  }

  function handleToggleVisible(sectionId: string) {
    const newSections = config.sections.map((s) =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    updateConfig({ ...config, sections: newSections });
  }

  function handleReorder(activeId: string, overId: string) {
    const sorted = [...config.sections].sort((a, b) => a.order - b.order);
    const oldIndex = sorted.findIndex((s) => s.id === activeId);
    const newIndex = sorted.findIndex((s) => s.id === overId);
    const reordered = arrayMove(sorted, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));
    updateConfig({ ...config, sections: reordered });
  }

  function handleSelectSection(id: string) {
    setSelectedId(id);
    setMobileTab("settings");
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      const res = await fetch("/api/pages/publish", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setPublished(data.published);
        toast.success(data.published ? "Page published!" : "Page unpublished");
      } else {
        toast.error("Failed to toggle publish");
      }
    } catch {
      toast.error("Failed to toggle publish");
    } finally {
      setPublishing(false);
    }
  }

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const saveStatusBadge = (
    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
      saveStatus === "saved" ? "bg-green-500/20 text-green-400" :
      saveStatus === "saving" ? "bg-yellow-500/20 text-yellow-400" :
      "bg-zinc-700 text-zinc-400"
    }`}>
      {saveStatus === "saved" ? "Saved ✓" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
    </span>
  );

  return (
    <div className="h-[100dvh] flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-zinc-800 flex-shrink-0 gap-2">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-lg sm:text-xl font-bold text-yellow-400">KEY</span>
          <span className="text-zinc-500 text-xs sm:text-sm hidden sm:inline">Builder</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 overflow-x-auto">
          {/* Save status — hidden on very small screens, shown via tab */}
          <span className="hidden sm:inline">{saveStatusBadge}</span>
          <span className="text-xs text-zinc-400 hidden sm:inline truncate max-w-[100px]">{userName}</span>

          <a
            href={`/p/${initialSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors whitespace-nowrap"
          >
            Preview
          </a>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded font-semibold transition-colors disabled:opacity-70 whitespace-nowrap ${
              published
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                : "bg-yellow-400 text-black hover:bg-yellow-500"
            }`}
          >
            {publishing ? "..." : published ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-zinc-500 hover:text-zinc-300 hidden sm:inline"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Desktop: 3-column | Mobile: single panel controlled by tabs */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — desktop always visible, mobile only on "sections" tab */}
        <div className={`lg:flex lg:flex-shrink-0 ${mobileTab === "sections" ? "flex flex-1" : "hidden"} lg:w-auto`}>
          <LeftPanel
            sections={config.sections}
            selectedId={selectedId}
            onSelect={(id) => { setSelectedId(id); setMobileTab("preview"); }}
            onToggleVisible={handleToggleVisible}
            onReorder={handleReorder}
          />
        </div>

        {/* Center Preview — desktop always visible, mobile only on "preview" tab */}
        <div className={`${mobileTab === "preview" ? "flex flex-1" : "hidden"} lg:flex lg:flex-1 overflow-hidden`}>
          <CenterPreview
            config={config}
            selectedId={selectedId}
            onSelect={handleSelectSection}
          />
        </div>

        {/* Right Panel — desktop always visible, mobile only on "settings" tab */}
        <div className={`${mobileTab === "settings" ? "flex flex-1 overflow-y-auto" : "hidden"} lg:flex lg:flex-shrink-0`}>
          <RightPanel
            config={config}
            selectedId={selectedId}
            onMetaChange={handleMetaChange}
            onSectionChange={handleSectionChange}
            onPhotoUpload={handlePhotoUpload}
          />
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden flex-shrink-0 border-t border-zinc-800 bg-zinc-900 flex">
        {([
          { id: "sections", label: "Sections", icon: LayoutList },
          { id: "preview",  label: "Preview",  icon: Eye },
          { id: "settings", label: "Settings", icon: Settings },
        ] as { id: MobileTab; label: string; icon: React.ComponentType<{ size?: number }> }[]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMobileTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
              mobileTab === id ? "text-yellow-400" : "text-zinc-500"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
        {/* Save status in tab bar */}
        <div className="flex-1 flex flex-col items-center justify-center py-3">
          {saveStatusBadge}
        </div>
      </nav>
    </div>
  );
}
