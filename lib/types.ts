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

// Per-section style overrides
export type SectionStyle = {
  bgColor?: string;
  textColor?: string;
  fontSize?: "sm" | "base" | "lg";
};

// --- Existing item types ---
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

// --- New item types ---
export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  photo: string;
  rating: number;
  text: string;
};

export type CarouselSlide = {
  id: string;
  image: string;
  caption: string;
  subcaption: string;
};

export type RatingBreakdown = {
  stars: number;
  count: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

// --- Existing content types ---
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

// --- New content types ---
export type GalleryContent = {
  title: string;
  images: GalleryImage[];
};

export type VideoContent = {
  title: string;
  videoUrl: string;
};

export type TestimonialsContent = {
  title: string;
  items: TestimonialItem[];
};

export type CarouselContent = {
  title: string;
  slides: CarouselSlide[];
  autoplaySpeed: number;
};

export type RatingsContent = {
  title: string;
  overallRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
};

export type FaqContent = {
  title: string;
  items: FaqItem[];
};

export type CountdownContent = {
  title: string;
  targetDate: string;
  label: string;
};

export type VisitorCounterContent = {
  baseCount: number;
  minCount: number;
  maxCount: number;
  message: string;
  updateInterval: number;
};

export type LimitedSeatsContent = {
  totalSeats: number;
  remainingSeats: number;
  message: string;
  urgencyMessage: string;
};

export type RegisterNowContent = {
  headline: string;
  subheadline: string;
  ctaText: string;
  urgencyText: string;
};

export type SectionType =
  | "hero"
  | "forWhom"
  | "benefits"
  | "fomo"
  | "registrationForm"
  | "gallery"
  | "video"
  | "testimonials"
  | "carousel"
  | "ratings"
  | "faq"
  | "countdown"
  | "visitorCounter"
  | "limitedSeats"
  | "registerNow";

export type SectionContent =
  | HeroContent
  | ForWhomContent
  | BenefitsContent
  | FomoContent
  | RegistrationFormContent
  | GalleryContent
  | VideoContent
  | TestimonialsContent
  | CarouselContent
  | RatingsContent
  | FaqContent
  | CountdownContent
  | VisitorCounterContent
  | LimitedSeatsContent
  | RegisterNowContent;

export type Section = {
  id: string;
  type: SectionType;
  visible: boolean;
  order: number;
  content: SectionContent;
  style?: SectionStyle;
};

export type PageConfig = {
  meta: PageMeta;
  sections: Section[];
};

// Default content factories for new section types
export function createDefaultContent(type: SectionType): SectionContent {
  switch (type) {
    case "hero":
      return { headline: "Join Our Exclusive Webinar", subheadline: "Learn proven strategies to grow your business online", ctaText: "Reserve Your Spot Now" } as HeroContent;
    case "forWhom":
      return { title: "This Webinar Is For You If...", items: [{ id: "1", icon: "target", text: "You want to grow your online presence" }] } as ForWhomContent;
    case "benefits":
      return { title: "What You Will Learn", items: [{ id: "1", text: "The #1 strategy top marketers use to get clients" }] } as BenefitsContent;
    case "fomo":
      return { title: "Why You Cannot Miss This", items: [{ id: "1", text: "Limited seats available" }] } as FomoContent;
    case "registrationForm":
      return { title: "Register Now — It's Free!", submitButtonText: "Save My Spot", successMessage: "You're registered! Check your WhatsApp for details." } as RegistrationFormContent;
    case "gallery":
      return { title: "Photo Gallery", images: [] } as GalleryContent;
    case "video":
      return { title: "Watch This First", videoUrl: "" } as VideoContent;
    case "testimonials":
      return {
        title: "What Our Students Say",
        items: [
          { id: "1", name: "Ahmed Hassan", role: "Business Owner", photo: "", rating: 5, text: "This webinar completely transformed my approach to online marketing!" },
          { id: "2", name: "Sara Ahmed", role: "Entrepreneur", photo: "", rating: 5, text: "Incredibly valuable content. I doubled my leads within a month." },
        ],
      } as TestimonialsContent;
    case "carousel":
      return {
        title: "Gallery",
        slides: [
          { id: "1", image: "", caption: "Slide 1", subcaption: "Description here" },
          { id: "2", image: "", caption: "Slide 2", subcaption: "Description here" },
        ],
        autoplaySpeed: 4000,
      } as CarouselContent;
    case "ratings":
      return {
        title: "Student Ratings",
        overallRating: 4.8,
        totalReviews: 234,
        breakdown: [
          { stars: 5, count: 180 },
          { stars: 4, count: 38 },
          { stars: 3, count: 12 },
          { stars: 2, count: 3 },
          { stars: 1, count: 1 },
        ],
      } as RatingsContent;
    case "faq":
      return {
        title: "Frequently Asked Questions",
        items: [
          { id: "1", question: "Who is this webinar for?", answer: "This webinar is for entrepreneurs, business owners, and marketers who want to grow their online presence." },
          { id: "2", question: "Is this webinar free?", answer: "Yes, registration is completely free. Just secure your spot before they run out." },
        ],
      } as FaqContent;
    case "countdown":
      return {
        title: "Webinar Starts In",
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        label: "Don't miss out — limited seats!",
      } as CountdownContent;
    case "visitorCounter":
      return {
        baseCount: 127,
        minCount: 100,
        maxCount: 200,
        message: "people are viewing this page right now",
        updateInterval: 5000,
      } as VisitorCounterContent;
    case "limitedSeats":
      return {
        totalSeats: 100,
        remainingSeats: 23,
        message: "Only {remaining} spots remaining!",
        urgencyMessage: "Seats are filling up fast. Don't miss your chance!",
      } as LimitedSeatsContent;
    case "registerNow":
      return {
        headline: "Register Now — Free!",
        subheadline: "Join thousands of successful entrepreneurs. Secure your spot today.",
        ctaText: "Claim My Free Spot →",
        urgencyText: "⚡ Limited seats — act now before it's too late!",
      } as RegisterNowContent;
  }
}

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
