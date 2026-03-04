"use client";

import { PageConfig, Section, HeroContent, ForWhomContent, BenefitsContent, FomoContent, RegistrationFormContent } from "@/lib/types";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FomoSection from "@/components/sections/FomoSection";
import RegistrationFormSection from "@/components/sections/RegistrationFormSection";

type Props = {
  config: PageConfig;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

function SectionWrapper({
  section,
  isSelected,
  onSelect,
  children,
}: {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  if (!section.visible) return null;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer transition-all ${
        isSelected ? "ring-2 ring-yellow-400 ring-inset" : "hover:ring-1 hover:ring-zinc-600 hover:ring-inset"
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
          Selected
        </div>
      )}
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}

export default function CenterPreview({ config, selectedId, onSelect }: Props) {
  const sorted = [...config.sections].sort((a, b) => a.order - b.order);

  function renderSection(section: Section) {
    switch (section.type) {
      case "hero":
        return (
          <HeroSection
            meta={config.meta}
            content={section.content as HeroContent}
            isPreview
          />
        );
      case "forWhom":
        return <ForWhomSection meta={config.meta} content={section.content as ForWhomContent} />;
      case "benefits":
        return <BenefitsSection meta={config.meta} content={section.content as BenefitsContent} />;
      case "fomo":
        return <FomoSection meta={config.meta} content={section.content as FomoContent} />;
      case "registrationForm":
        return (
          <RegistrationFormSection
            meta={config.meta}
            content={section.content as RegistrationFormContent}
            pageId="preview"
            isPreview
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-900">
      <div className="min-h-full" style={{ backgroundColor: config.meta.colorTheme.background }}>
        {sorted.map((section) => (
          <SectionWrapper
            key={section.id}
            section={section}
            isSelected={selectedId === section.id}
            onSelect={() => onSelect(section.id)}
          >
            {renderSection(section)}
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
}
