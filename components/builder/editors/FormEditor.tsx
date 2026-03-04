import { RegistrationFormContent } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  content: RegistrationFormContent;
  onChange: (content: RegistrationFormContent) => void;
};

export default function FormEditor({ content, onChange }: Props) {
  function update(field: keyof RegistrationFormContent, value: string) {
    onChange({ ...content, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Form Title</Label>
        <Input
          value={content.title}
          onChange={(e) => update("title", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Submit Button Text</Label>
        <Input
          value={content.submitButtonText}
          onChange={(e) => update("submitButtonText", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-zinc-300 text-xs">Success Message</Label>
        <Textarea
          value={content.successMessage}
          onChange={(e) => update("successMessage", e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white text-sm resize-none"
          rows={3}
        />
      </div>
    </div>
  );
}
