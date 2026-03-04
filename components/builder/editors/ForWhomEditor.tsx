import { ForWhomContent, ForWhomItem } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

const ICON_OPTIONS = ["target", "trending-up", "users", "star", "zap", "check"];

type Props = {
  content: ForWhomContent;
  onChange: (content: ForWhomContent) => void;
};

export default function ForWhomEditor({ content, onChange }: Props) {
  function updateTitle(title: string) {
    onChange({ ...content, title });
  }

  function updateItem(id: string, field: keyof ForWhomItem, value: string) {
    onChange({
      ...content,
      items: content.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  }

  function addItem() {
    const newItem: ForWhomItem = {
      id: Date.now().toString(),
      icon: "target",
      text: "New item",
    };
    onChange({ ...content, items: [...content.items, newItem] });
  }

  function removeItem(id: string) {
    onChange({ ...content, items: content.items.filter((item) => item.id !== id) });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Section Title</Label>
        <Input
          value={content.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-300 text-xs">Items</Label>
        {content.items.map((item) => (
          <div key={item.id} className="flex gap-2 items-start">
            <select
              value={item.icon}
              onChange={(e) => updateItem(item.id, "icon", e.target.value)}
              className="bg-zinc-800 border border-zinc-700 text-white text-xs rounded px-2 py-2 flex-shrink-0"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <Input
              value={item.text}
              onChange={(e) => updateItem(item.id, "text", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white text-sm flex-1"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="text-zinc-500 hover:text-red-400 p-2 flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <Button
          onClick={addItem}
          variant="outline"
          size="sm"
          className="w-full border-zinc-700 text-zinc-400 hover:text-white text-xs"
        >
          <Plus size={12} className="mr-1" /> Add Item
        </Button>
      </div>
    </div>
  );
}
