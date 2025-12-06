import React from 'react';

// Global declaration for gtag (Google Analytics)
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void; // Changed from any[] to unknown[]
    ym: {
      (id: number, method: 'hit', url: string): void;
      (id: number, method: 'reachGoal', target: string, params?: Record<string, unknown>): void; // Changed from any to unknown
      (id: number, method: string, ...args: unknown[]): void; // Changed from any[] to unknown[]
      a?: unknown[]; // Added for Yandex Metrika initialization
      l?: number; // Added for Yandex Metrika initialization
    };
    dataLayer: unknown[]; // Added for Google Analytics initialization
    requestIdleCallback: ((callback: IdleRequestCallback, options?: IdleRequestOptions) => IdleCallbackHandle) | undefined;
    cancelIdleCallback: ((handle: IdleCallbackHandle) => void) | undefined;
  }
}

interface IdleRequestOptions {
  timeout?: number;
}

type IdleCallbackHandle = number;

interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): DOMHighResTimeStamp;
}

type IdleRequestCallback = (deadline: IdleDeadline) => void;

export interface TranslationKeys {
  nav: {
    home: string;
    about: string;
    benefits: string;
    testimonials: string;
    contact: string;
    faq: string;
    products: string;
    trackOrder: string; // Added
    armenian: string;
    russian: string;
    english: string;
    open: string;
    close: string;
  };
  seo?: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  hero: {
    title: string;
    facebookFollow: string;
    subtitle: string;
    tagline: string;
    cta: string;
    consultation: string;
    guarantee: string;
    qrVerificationTitle: string;
    qrVerificationSubtitle: string;
    seo_title_addon: string;
    qrBlockTitle: string;
    qrBlockDescription: string;
  };
  stats: {
    customers: string;
    experience: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    content: string;
    natural: { title: string; desc: string; };
    proven: { title: string; desc: string; };
    safe: { title: string; desc: string; };
    fast: { title: string; desc: string; };
    whyChooseUsTitle: string;
    whyChooseUsOriginal: string;
    whyChooseUsSafety: string;
    whyChooseUsNoAdditives: string;
    whyChooseUsTrust: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    appetite: { title: string; desc: string; };
    weight: { title: string; desc: string; };
    immunity: { title: string; desc: string; };
    energy: { title: string; desc: string; };
    metabolism: { title: string; desc: string; };
    mood: { title: string; desc: string; };
  };
  testimonials: {
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    namePlaceholder: string;
    reviewPlaceholder: string;
    submitButton: string;
    thankYou: string;
    newReviewLabel: string;
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    hours: string;
    phoneNumbers: {
      number1: string;
      number2: string;
      description: string;
    };
    callNowButton: string;
    whatsappButton: string;
  };
  footer: {
    about: string;
    products: string;
    support: string;
    follow: string;
    legalAndWarning: string; // Added this new key
    howToDistinguishButton: string;
    productOriginal: string;
    productAuthenticity: string;
    productUsage: string;
    allRightsReserved: string;
    caution: string;
  };
  contactModal: {
    chooseCall: string;
    chooseMessage: string;
    call: string;
    whatsapp: string;
    facebookMessenger: string;
    callNumbers: {
      number1: string;
      number2: string;
    };
    callUsButton: string;
    callbackButton: string;
  };
  orderModal: {
    title: string;
    deliveryInfo1: string;
    deliveryInfo2: string;
    addressPlaceholder: string;
    phonePlaceholder: string;
    orderButton: string;
    orderSuccess1: string;
    orderSuccess2: string;
    invalidPhone: string;
    selectProducts: string;
    freeDeliveryMessage: string;
  };
  authenticity: {
    title: string;
    howToDistinguish: string;
    attention: string;
    certificateDesc: string;
    differencesDesc: string;
    waitingForLink: string;
    qrScanInstructions: string;
    qrScanSuccess: string;
    qrScanError: string;
    processingRequest: string;
    recordingInstructions: string;
    recordingSuccess: string;
    recordingError: string;
    purchaseWarning: string;
    disclaimer: string;
    fakeWarning: string;
    fakeWarningText: string;
    originalTitle: string;
    originalFeature1: string;
    originalFeature2: string;
    originalFeature3: string;
    originalFeature4: string;
    originalFeature5: string;
    fakeTitle: string;
    fakeFeature1: string;
    fakeFeature2: string;
    fakeFeature3: string;
    fakeFeature4: string;
    fakeFeature5: string;
    verificationTitle: string;
    verificationStep1: string;
    verificationStep2: string;
    verificationStep3: string;
    verificationStep4: string;
    verifyButton: string;
  };
  article: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    title: string;
    subtitle: string;
    intro: string;
    sections: {
      id: string;
      heading: string;
      description: string;
      bullets?: string[];
    }[];
    conclusion: string;
    ctaLabel: string;
    ctaLink: string;
  };
  loadingLinkModal: {
    title: string;
    message: string;
    waitingForAdmin: string;
  };
  productShowcase: {
    weightGainLabel: string;
    weightLossLabel: string;
    weightGainDesc: string;
    weightLossDesc: string;
    orderWeightGain: string;
    orderWeightLoss: string;
    weightGainAlt: string;
    weightLossAlt: string;
    seoHeading: string;
    seoSubheading: string;
    seoParagraph: string;
  };
  faq: {
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
    q7: string;
    a7: string;
  };
  callbackRequest: {
    title: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    productTypeLabel: string;
    weightGainOption: string;
    weightLossOption: string;
    purposeLabel: string;
    purposeDetails: string;
    purposeOrders: string;
    purposeOther: string;
    submitButton: string;
    successMessage: string;
    invalidPhone: string;
    selectProductType: string;
    selectPurpose: string;
  };
  trackOrder: { // New section for track order page
    title: string;
    subtitle: string;
    orderIdPlaceholder: string;
    trackButton: string;
    // Removed status-related keys as they are no longer used in the UI
    // statusPending: string;
    // statusProcessing: string;
    // statusShipped: string;
    // statusDelivered: string;
    // statusCancelled: string;
    statusNotFound: string; // Still useful for input validation if needed
    // estimatedDelivery: string;
    // deliveryDate: string;
    // deliveryTime: string;
    // deliveryLocation: string;
    // deliveryAgent: string;
    noOrderId: string;
    enterOrderId: string;
    processingRequest: string; // Added for loading state
  };
}

export interface Testimonial {
  id: string;
  name: string;
  nameRu: string;
  nameEn: string;
  image: string;
  rating: number;
  result: string;
  textHy: string;
  textRu: string;
  textEn: string;
}

// New interface for reviews directly from the database
export interface DbReview {
  id: string;
  user_id: string | null;
  name: string;
  text: string;
  rating: number;
  created_at: string;
}

export interface StatItem {
  number: string;
  key: 'customers' | 'experience';
}

export type SectionId = 'home' | 'about' | 'benefits' | 'products' | 'authenticity' | 'cta' | 'testimonials' | 'contact' | 'faq' | 'track-order';

export type ContactModalType = 'call' | 'message';

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export interface ContactInfoItem {
  key: 'address' | 'phone' | 'hours';
  icon: Icon;
  titleKey: StringKeys<TranslationKeys['contact']>;
  details: string;
  color: string;
}

export interface ProductShowcaseItem {
  src: string;
  alt?: string;
  altKey?: 'weightGainAlt' | 'weightLossAlt';
  labelKey: 'weightGainLabel' | 'weightLossLabel';
  descKey: 'weightLossDesc' | 'weightGainDesc';
  buttonTextKey: 'orderWeightGain' | 'orderWeightLoss';
  price: number;
}

export interface BenefitItem {
  key: 'appetite' | 'weight' | 'immunity' | 'energy' | 'metabolism' | 'mood';
  icon: Icon;
  gradient: string;
}

export type OpenOrderModalFunction = (productKey?: ProductShowcaseItem['labelKey']) => void;

export type FaqQuestionKey = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'q7';
export type FaqAnswerKey = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7';
export type FaqTranslationKey = FaqQuestionKey | FaqAnswerKey;

export type Icon = React.ElementType;

export interface NavbarProps {}
export interface AuthenticityInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
}
export interface AboutSectionProps {}
export interface BenefitsSectionProps {}
export interface ProductShowcaseSectionProps {}
export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  currentLang: string;
  userTestimonial: Testimonial | null;
}
export interface ContactSectionProps {
  translations?: TranslationKeys;
}
export interface FaqSectionProps {
  params: { lang: string };
}
export interface HeroSectionProps {
  stats: StatItem[];
}
export interface MobileNavProps {
  scrolled: boolean; // Updated to reflect the new prop
}

export interface ReviewFormProps {
  onReviewSubmitted: (review: DbReview) => void;
}

export interface UseReviewFormHookParams {
  onReviewSubmitted: (review: DbReview) => void;
  t: TranslationKeys;
  initialName?: string;
}

export interface NavSection {
  id: SectionId;
  labelKey: keyof TranslationKeys['nav'];
}

export type ProductType = 'weightGain' | 'weightLoss' | '';
export type CallbackPurpose = 'details' | 'orders' | 'other' | '';

export interface CallbackRequestFormData {
  name: string;
  phone: string;
  productType: ProductType;
  purpose: CallbackPurpose;
}

export interface CallbackRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationKeys;
  currentLang: string;
}

export interface LayoutContextType {
  t: TranslationKeys;
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  openContactModal: (type: ContactModalType) => void;
  openOrderModal: (productKey?: ProductShowcaseItem['labelKey']) => void;
  openAuthenticityModal: () => void;
  openCallbackRequestModal: () => void;
  openLoadingLinkModal: () => void;
  getLinkClasses: (sectionId: SectionId) => string;
  getHomePath: () => string;
  getSectionPath: (sectionId: SectionId) => string;
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface NotifyVisitBody {
  lat: number | null;
  lon: number | null;
  screenWidth: number;
  screenHeight: number;
  isQrScan?: boolean;
  pagePath: string;
  deviceVendor?: string | null;
  deviceModel?: string | null;
  cpuArchitecture?: string | null;
  clientTimezone?: string;
}

export interface NotifyVisitQueryParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export interface TelegramPhotoData {
  photoBase64: string;
  caption: string;
}

export interface TelegramVideoData {
  videoBlob: Blob;
  caption: string;
  filename: string;
}

export interface ProductsLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface TestimonialsLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface FaqLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface AboutLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface BenefitsLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface ContactLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface QrVerifyLayoutProps {
  children: React.ReactNode;
  params: { lang: string };
}

export interface TrackOrderLayoutProps { // New layout prop interface
  children: React.ReactNode;
  params: { lang: string };
}
