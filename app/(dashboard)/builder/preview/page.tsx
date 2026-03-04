import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
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

// Always dynamic — never ISR-cached, needs real session cookies
export const dynamic = "force-dynamic";

function renderSection(section: Section, config: PageConfig, pageId: string) {
  if (!section.visible) return null;
  const { style } = section;

  switch (section.type) {
    case "hero":
      return <HeroSection key={section.id} meta={config.meta} content={section.content as HeroContent} style={style} />;
    case "forWhom":
      return <ForWhomSection key={section.id} meta={config.meta} content={section.content as ForWhomContent} style={style} />;
    case "benefits":
      return <BenefitsSection key={section.id} meta={config.meta} content={section.content as BenefitsContent} style={style} />;
    case "fomo":
      return <FomoSection key={section.id} meta={config.meta} content={section.content as FomoContent} style={style} />;
    case "registrationForm":
      return <RegistrationFormSection key={section.id} meta={config.meta} content={section.content as RegistrationFormContent} pageId={pageId} style={style} />;
    case "gallery":
      return <GallerySection key={section.id} meta={config.meta} content={section.content as GalleryContent} style={style} />;
    case "video":
      return <VideoSection key={section.id} meta={config.meta} content={section.content as VideoContent} style={style} />;
    case "testimonials":
      return <TestimonialsSection key={section.id} meta={config.meta} content={section.content as TestimonialsContent} style={style} />;
    case "carousel":
      return <CarouselSection key={section.id} meta={config.meta} content={section.content as CarouselContent} style={style} />;
    case "ratings":
      return <RatingsSection key={section.id} meta={config.meta} content={section.content as RatingsContent} style={style} />;
    case "faq":
      return <FaqSection key={section.id} meta={config.meta} content={section.content as FaqContent} style={style} />;
    case "countdown":
      return <CountdownSection key={section.id} meta={config.meta} content={section.content as CountdownContent} style={style} />;
    case "visitorCounter":
      return <VisitorCounterSection key={section.id} meta={config.meta} content={section.content as VisitorCounterContent} style={style} />;
    case "limitedSeats":
      return <LimitedSeatsSection key={section.id} meta={config.meta} content={section.content as LimitedSeatsContent} style={style} />;
    case "registerNow":
      return <RegisterNowSection key={section.id} meta={config.meta} content={section.content as RegisterNowContent} style={style} />;
    default:
      return null;
  }
}

export default async function BuilderPreviewPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const page = await prisma.page.findUnique({
    where: { userId: session.user.id },
  });
  if (!page) redirect("/builder");

  const config = page.config as PageConfig;
  const sections = [...config.sections].sort((a, b) => a.order - b.order);

  return (
    <main style={{ backgroundColor: config.meta.colorTheme.background }}>
      {sections.map((section) => renderSection(section, config, page.id))}

      {/* WhatsApp float button */}
      {config.meta.whatsappNumber && (
        <a
          href={`https://wa.me/${config.meta.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-lg font-semibold text-white text-sm sm:text-base transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      )}
    </main>
  );
}
