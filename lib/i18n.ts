export type Lang = "en" | "ar";

const translations = {
  en: {
    // Auth
    signIn: "Sign in to your account",
    email: "Email",
    password: "Password",
    signingIn: "Signing in...",
    signInBtn: "Sign In",
    invalidCredentials: "Invalid email or password",

    // Common
    signOut: "Sign Out",
    cancel: "Cancel",
    published: "Published",
    draft: "Draft",
    delete: "Delete",
    duplicate: "Duplicate",
    add: "Add",
    save: "Save",
    upload: "Upload",

    // Admin
    admin: "Admin",
    members: "Members",
    leads: "Leads",
    teamMembers: "Team Members",
    addMember: "+ Add Member",
    fullName: "Full Name",
    creating: "Creating...",
    createMember: "Create Member",
    noMembers: "No members yet. Add your first team member.",

    // Builder header
    builder: "Builder",
    preview: "Preview",
    unpublish: "Unpublish",
    publish: "Publish",
    saved: "Saved ✓",
    saving: "Saving...",
    unsaved: "Unsaved",
    failedSave: "Failed to save",
    pagePublished: "Page published!",
    pageUnpublished: "Page unpublished",
    failedPublish: "Failed to toggle publish",

    // Left Panel / Section labels
    sections: "Sections",
    addSection: "+ Add Section",
    hero: "Hero",
    forWhom: "For Whom",
    benefits: "Benefits",
    fomo: "FOMO",
    registrationForm: "Registration Form",
    gallery: "Photo Gallery",
    video: "Video",
    testimonials: "Testimonials",
    carousel: "Carousel",
    ratings: "Ratings",
    faq: "FAQ",
    countdown: "Countdown Timer",
    visitorCounter: "Visitor Counter",
    limitedSeats: "Limited Seats",
    registerNow: "Register Now CTA",

    // Right Panel
    pageSettings: "Page Settings",
    memberName: "Member Name",
    whatsappNumber: "WhatsApp Number",
    profilePhoto: "Profile Photo",
    uploadPhoto: "Upload Photo",
    changePhoto: "Change Photo",
    colorTheme: "Color Theme",
    editSection: "Edit Section",
    clickSection: "Click a section in the preview to edit it",
    uploadingPhoto: "Uploading photo...",
    photoUploaded: "Photo uploaded!",
    uploadFailed: "Upload failed",
    sectionStyle: "Section Style",
    backgroundColor: "Background Color",
    textColor: "Text Color",
    fontSize: "Font Size",
    fontSizeSm: "Small",
    fontSizeBase: "Default",
    fontSizeLg: "Large",
    resetStyle: "Reset to Default",

    // Editors — common
    headline: "Headline",
    subheadline: "Subheadline",
    ctaButtonText: "CTA Button Text",
    sectionTitle: "Section Title",
    items: "Items",
    addItem: "Add Item",
    benefitItems: "Benefits",
    addBenefit: "Add Benefit",
    urgencyPoints: "Urgency Points",
    addPoint: "Add Point",
    formTitle: "Form Title",
    submitButtonText: "Submit Button Text",
    successMessage: "Success Message",

    // Gallery editor
    galleryImages: "Gallery Images",
    addImage: "Add Image",
    imageUrl: "Image URL",
    imageAlt: "Alt Text",
    uploadImage: "Upload Image",
    uploadingImage: "Uploading image...",
    imageUploaded: "Image uploaded!",

    // Video editor
    videoUrl: "Video URL",
    videoUrlHint: "YouTube, Vimeo, or direct video URL",

    // Testimonials editor
    addTestimonial: "Add Testimonial",
    reviewerName: "Name",
    reviewerRole: "Role / Title",
    reviewerPhoto: "Photo",
    starRating: "Star Rating",
    reviewText: "Review Text",

    // Carousel editor
    slides: "Slides",
    addSlide: "Add Slide",
    slideCaption: "Caption",
    slideSubcaption: "Subcaption",
    slideImage: "Slide Image",
    autoplaySpeed: "Autoplay Speed (ms)",

    // Ratings editor
    overallRating: "Overall Rating",
    totalReviews: "Total Reviews",
    ratingBreakdown: "Rating Breakdown",
    starsCount: "{stars} Stars",

    // FAQ editor
    addQuestion: "Add Question",
    question: "Question",
    answer: "Answer",

    // Countdown editor
    targetDate: "Target Date & Time",
    countdownLabel: "Label Below Timer",

    // Visitor counter editor
    baseCount: "Base Visitor Count",
    minCount: "Minimum Count",
    maxCount: "Maximum Count",
    counterMessage: "Message",
    updateInterval: "Update Interval (ms)",

    // Limited seats editor
    totalSeats: "Total Seats",
    remainingSeats: "Remaining Seats",
    seatsMessage: "Message (use {remaining} for count)",
    urgencyMessage: "Urgency Message",

    // Register Now editor
    urgencyText: "Urgency Text",

    // Add section modal
    chooseSectionType: "Choose Section Type",
    sectionTypes: "Section Types",

    // Mobile tabs
    settings: "Settings",

    // Registration Form (public)
    fullNamePlaceholder: "Full Name",
    emailAddressPlaceholder: "Email Address",
    phonePlaceholder: "Phone / WhatsApp",
    submitting: "Submitting...",
    formError: "Something went wrong. Please try again.",
    formDisabled: "Form disabled in preview",
  },
  ar: {
    // Auth
    signIn: "تسجيل الدخول إلى حسابك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signingIn: "جارٍ تسجيل الدخول...",
    signInBtn: "تسجيل الدخول",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",

    // Common
    signOut: "تسجيل الخروج",
    cancel: "إلغاء",
    published: "منشور",
    draft: "مسودة",
    delete: "حذف",
    duplicate: "نسخ",
    add: "إضافة",
    save: "حفظ",
    upload: "رفع",

    // Admin
    admin: "الإدارة",
    members: "الأعضاء",
    leads: "العملاء المحتملون",
    teamMembers: "أعضاء الفريق",
    addMember: "+ إضافة عضو",
    fullName: "الاسم الكامل",
    creating: "جارٍ الإنشاء...",
    createMember: "إنشاء عضو",
    noMembers: "لا يوجد أعضاء حتى الآن. أضف أول عضو في فريقك.",

    // Builder header
    builder: "المنشئ",
    preview: "معاينة",
    unpublish: "إلغاء النشر",
    publish: "نشر",
    saved: "محفوظ ✓",
    saving: "جارٍ الحفظ...",
    unsaved: "غير محفوظ",
    failedSave: "فشل الحفظ",
    pagePublished: "تم نشر الصفحة!",
    pageUnpublished: "تم إلغاء نشر الصفحة",
    failedPublish: "فشل تغيير حالة النشر",

    // Left Panel / Section labels
    sections: "الأقسام",
    addSection: "+ إضافة قسم",
    hero: "القسم الرئيسي",
    forWhom: "لمن هذا",
    benefits: "المزايا",
    fomo: "الإلحاحية",
    registrationForm: "نموذج التسجيل",
    gallery: "معرض الصور",
    video: "فيديو",
    testimonials: "شهادات العملاء",
    carousel: "عرض شرائح",
    ratings: "التقييمات",
    faq: "الأسئلة الشائعة",
    countdown: "عداد تنازلي",
    visitorCounter: "عداد الزوار",
    limitedSeats: "المقاعد المحدودة",
    registerNow: "سجل الآن",

    // Right Panel
    pageSettings: "إعدادات الصفحة",
    memberName: "اسم العضو",
    whatsappNumber: "رقم واتساب",
    profilePhoto: "الصورة الشخصية",
    uploadPhoto: "رفع صورة",
    changePhoto: "تغيير الصورة",
    colorTheme: "نمط الألوان",
    editSection: "تعديل القسم",
    clickSection: "انقر على قسم في المعاينة لتعديله",
    uploadingPhoto: "جارٍ رفع الصورة...",
    photoUploaded: "تم رفع الصورة!",
    uploadFailed: "فشل رفع الصورة",
    sectionStyle: "تنسيق القسم",
    backgroundColor: "لون الخلفية",
    textColor: "لون النص",
    fontSize: "حجم الخط",
    fontSizeSm: "صغير",
    fontSizeBase: "افتراضي",
    fontSizeLg: "كبير",
    resetStyle: "إعادة الضبط",

    // Editors — common
    headline: "العنوان الرئيسي",
    subheadline: "العنوان الفرعي",
    ctaButtonText: "نص زر الدعوة للعمل",
    sectionTitle: "عنوان القسم",
    items: "العناصر",
    addItem: "إضافة عنصر",
    benefitItems: "المزايا",
    addBenefit: "إضافة ميزة",
    urgencyPoints: "نقاط الإلحاح",
    addPoint: "إضافة نقطة",
    formTitle: "عنوان النموذج",
    submitButtonText: "نص زر الإرسال",
    successMessage: "رسالة النجاح",

    // Gallery editor
    galleryImages: "صور المعرض",
    addImage: "إضافة صورة",
    imageUrl: "رابط الصورة",
    imageAlt: "النص البديل",
    uploadImage: "رفع صورة",
    uploadingImage: "جارٍ رفع الصورة...",
    imageUploaded: "تم رفع الصورة!",

    // Video editor
    videoUrl: "رابط الفيديو",
    videoUrlHint: "يوتيوب، فيميو، أو رابط مباشر",

    // Testimonials editor
    addTestimonial: "إضافة شهادة",
    reviewerName: "الاسم",
    reviewerRole: "المسمى الوظيفي",
    reviewerPhoto: "الصورة",
    starRating: "التقييم بالنجوم",
    reviewText: "نص التقييم",

    // Carousel editor
    slides: "الشرائح",
    addSlide: "إضافة شريحة",
    slideCaption: "العنوان",
    slideSubcaption: "العنوان الفرعي",
    slideImage: "صورة الشريحة",
    autoplaySpeed: "سرعة التشغيل التلقائي (مللي ثانية)",

    // Ratings editor
    overallRating: "التقييم الإجمالي",
    totalReviews: "إجمالي التقييمات",
    ratingBreakdown: "توزيع التقييمات",
    starsCount: "{stars} نجوم",

    // FAQ editor
    addQuestion: "إضافة سؤال",
    question: "السؤال",
    answer: "الإجابة",

    // Countdown editor
    targetDate: "التاريخ والوقت المستهدف",
    countdownLabel: "النص أسفل العداد",

    // Visitor counter editor
    baseCount: "عدد الزوار الأساسي",
    minCount: "الحد الأدنى",
    maxCount: "الحد الأقصى",
    counterMessage: "الرسالة",
    updateInterval: "فترة التحديث (مللي ثانية)",

    // Limited seats editor
    totalSeats: "إجمالي المقاعد",
    remainingSeats: "المقاعد المتبقية",
    seatsMessage: "الرسالة (استخدم {remaining} للعدد)",
    urgencyMessage: "رسالة الإلحاح",

    // Register Now editor
    urgencyText: "نص الإلحاح",

    // Add section modal
    chooseSectionType: "اختر نوع القسم",
    sectionTypes: "أنواع الأقسام",

    // Mobile tabs
    settings: "الإعدادات",

    // Registration Form (public)
    fullNamePlaceholder: "الاسم الكامل",
    emailAddressPlaceholder: "البريد الإلكتروني",
    phonePlaceholder: "الهاتف / واتساب",
    submitting: "جارٍ الإرسال...",
    formError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    formDisabled: "النموذج معطل في المعاينة",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type Translations = { [K in TranslationKey]: string };

export function getTranslations(lang: Lang): Translations {
  return translations[lang];
}

export function memberCreatedMsg(lang: Lang, name: string): string {
  return lang === "ar" ? `تم إنشاء العضو "${name}"!` : `Member "${name}" created!`;
}
