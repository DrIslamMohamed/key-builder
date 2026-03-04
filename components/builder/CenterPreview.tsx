"use client";

import {
  PageConfig, Section,
  HeroContent, ForWhomContent, BenefitsContent, FomoContent, RegistrationFormContent,
  GalleryContent, VideoContent, TestimonialsContent, CarouselContent,
  RatingsContent, FaqContent, CountdownContent, VisitorCounterContent,
  LimitedSeatsContent, RegisterNowContent,
} from "@/lib/types";
import HeroSection from "@/components/sections/HeroSection";
import ForWhomSection from "@/components/sections/ForWhomSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FomoSection from "@/components/sections/FomoSection";
import RegistrationFormSection from "@/components/sections/RegistrationFormSection";
import GallerySection from "@/components/sections/GallerySection";
import VideoSection from "@/components/sections/VideoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CarouselSection from "@/components/sections/CarouselSection";
import RatingsSection from "@/components/sections/RatingsSection";
import FaqSection from "@/components/sections/FaqSection";
import CountdownSection from "@/components/sections/CountdownSection";
import VisitorCounterSection from "@/components/sections/VisitorCounterSection";
import LimitedSeatsSection from "@/components/sections/LimitedSeatsSection";
import RegisterNowSection from "@/components/sections/RegisterNowSection";

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
        <div className="absolute top-2 start-2 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
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
    const { meta } = config;
    const { style } = section;

    switch (section.type) {
      case "hero":
        return <HeroSection meta={meta} content={section.content as HeroContent} isPreview style={style} />;
      case "forWhom":
        return <ForWhomSection meta={meta} content={section.content as ForWhomContent} style={style} />;
      case "benefits":
        return <BenefitsSection meta={meta} content={section.content as BenefitsContent} style={style} />;
      case "fomo":
        return <FomoSection meta={meta} content={section.content as FomoContent} style={style} />;
      case "registrationForm":
        return (
          <RegistrationFormSection
            meta={meta}
            content={section.content as RegistrationFormContent}
            pageId="preview"
            isPreview
            style={style}
          />
        );
      case "gallery":
        return <GallerySection meta={meta} content={section.content as GalleryContent} style={style} />;
      case "video":
        return <VideoSection meta={meta} content={section.content as VideoContent} style={style} />;
      case "testimonials":
        return <TestimonialsSection meta={meta} content={section.content as TestimonialsContent} style={style} />;
      case "carousel":
        return <CarouselSection meta={meta} content={section.content as CarouselContent} style={style} />;
      case "ratings":
        return <RatingsSection meta={meta} content={section.content as RatingsContent} style={style} />;
      case "faq":
        return <FaqSection meta={meta} content={section.content as FaqContent} style={style} />;
      case "countdown":
        return <CountdownSection meta={meta} content={section.content as CountdownContent} style={style} />;
      case "visitorCounter":
        return <VisitorCounterSection meta={meta} content={section.content as VisitorCounterContent} style={style} />;
      case "limitedSeats":
        return <LimitedSeatsSection meta={meta} content={section.content as LimitedSeatsContent} style={style} />;
      case "registerNow":
        return <RegisterNowSection meta={meta} content={section.content as RegisterNowContent} style={style} />;
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
