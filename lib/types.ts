export type ColorTheme = {
  primary: string;
  background: string;
  text: string;
};

export type PageMeta = {
  memberName: string;
  memberPhoto: string;
  whatsappNumber: string;
  colorTheme: ColorTheme;
};

export type ForWhomItem = {
  id: string;
  icon: string;
  text: string;
};

export type BenefitItem = {
  id: string;
  text: string;
};

export type FomoItem = {
  id: string;
  text: string;
};

export type HeroContent = {
  headline: string;
  subheadline: string;
  ctaText: string;
};

export type ForWhomContent = {
  title: string;
  items: ForWhomItem[];
};

export type BenefitsContent = {
  title: string;
  items: BenefitItem[];
};

export type FomoContent = {
  title: string;
  items: FomoItem[];
};

export type RegistrationFormContent = {
  title: string;
  submitButtonText: string;
  successMessage: string;
};

export type SectionType = "hero" | "forWhom" | "benefits" | "fomo" | "registrationForm";

export type SectionContent =
  | HeroContent
  | ForWhomContent
  | BenefitsContent
  | FomoContent
  | RegistrationFormContent;

export type Section = {
  id: string;
  type: SectionType;
  visible: boolean;
  order: number;
  content: SectionContent;
};

export type PageConfig = {
  meta: PageMeta;
  sections: Section[];
};

export const DEFAULT_PAGE_CONFIG: PageConfig = {
  meta: {
    memberName: "Your Name",
    memberPhoto: "",
    whatsappNumber: "",
    colorTheme: {
      primary: "#d4af37",
      background: "#0a0a0a",
      text: "#ffffff",
    },
  },
  sections: [
    {
      id: "hero_1",
      type: "hero",
      visible: true,
      order: 0,
      content: {
        headline: "Join Our Exclusive Webinar",
        subheadline: "Learn proven strategies to grow your business online",
        ctaText: "Reserve Your Spot Now",
      } as HeroContent,
    },
    {
      id: "forwhom_1",
      type: "forWhom",
      visible: true,
      order: 1,
      content: {
        title: "This Webinar Is For You If...",
        items: [
          { id: "1", icon: "target", text: "You want to grow your online presence" },
          { id: "2", icon: "trending-up", text: "You're ready to scale your business" },
          { id: "3", icon: "users", text: "You want to build a loyal audience" },
        ],
      } as ForWhomContent,
    },
    {
      id: "benefits_1",
      type: "benefits",
      visible: true,
      order: 2,
      content: {
        title: "What You Will Learn",
        items: [
          { id: "1", text: "The #1 strategy top marketers use to get clients" },
          { id: "2", text: "How to create content that converts" },
          { id: "3", text: "The exact funnel that generates leads daily" },
        ],
      } as BenefitsContent,
    },
    {
      id: "fomo_1",
      type: "fomo",
      visible: true,
      order: 3,
      content: {
        title: "Why You Cannot Miss This",
        items: [
          { id: "1", text: "Limited seats available — only 100 spots" },
          { id: "2", text: "Live Q&A session with the expert" },
          { id: "3", text: "Exclusive bonuses for attendees only" },
        ],
      } as FomoContent,
    },
    {
      id: "form_1",
      type: "registrationForm",
      visible: true,
      order: 4,
      content: {
        title: "Register Now — It's Free!",
        submitButtonText: "Save My Spot",
        successMessage: "You're registered! Check your WhatsApp for details.",
      } as RegistrationFormContent,
    },
  ],
};
