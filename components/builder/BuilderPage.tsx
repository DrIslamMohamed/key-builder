"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { PageConfig, SectionContent, PageMeta } from "@/lib/types";
import LeftPanel from "./LeftPanel";
import CenterPreview from "./CenterPreview";
import RightPanel from "./RightPanel";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

type Props = {
  initialConfig: PageConfig;
  initialPublished: boolean;
  initialSlug: string;
  userName: string;
};

export default function BuilderPage({ initialConfig, initialPublished, initialSlug, userName }: Props) {
  const [config, setConfig] = useState<PageConfig>(initialConfig);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [published, setPublished] = useState(initialPublished);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [publishing, setPublishing] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced auto-save
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

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-yellow-400">KEY</span>
          <span className="text-zinc-500 text-sm">Builder</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-400">{userName}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            saveStatus === "saved" ? "bg-green-500/20 text-green-400" :
            saveStatus === "saving" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-zinc-700 text-zinc-400"
          }`}>
            {saveStatus === "saved" ? "Saved ✓" : saveStatus === "saving" ? "Saving..." : "Unsaved"}
          </span>
          <a
            href={`/p/${initialSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm rounded border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
          >
            Preview
          </a>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className={`px-4 py-1.5 text-sm rounded font-semibold transition-colors disabled:opacity-70 ${
              published
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30"
                : "bg-yellow-400 text-black hover:bg-yellow-500"
            }`}
          >
            {publishing ? "..." : published ? "Unpublish" : "Publish"}
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-xs text-zinc-500 hover:text-zinc-300"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          sections={config.sections}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onToggleVisible={handleToggleVisible}
          onReorder={handleReorder}
        />
        <CenterPreview
          config={config}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <RightPanel
          config={config}
          selectedId={selectedId}
          onMetaChange={handleMetaChange}
          onSectionChange={handleSectionChange}
          onPhotoUpload={handlePhotoUpload}
        />
      </div>
    </div>
  );
}
