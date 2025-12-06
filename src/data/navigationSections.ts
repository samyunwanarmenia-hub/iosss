import { SectionId, TranslationKeys } from '@/types/global';

export interface NavSection {
  id: SectionId;
  labelKey: keyof TranslationKeys['nav'];
}

export const navigationSections: NavSection[] = [
  { id: 'home', labelKey: 'home' },
  { id: 'about', labelKey: 'about' },
  { id: 'benefits', labelKey: 'benefits' },
  { id: 'products', labelKey: 'products' },
  { id: 'testimonials', labelKey: 'testimonials' },
  { id: 'faq', labelKey: 'faq' },
  { id: 'contact', labelKey: 'contact' },
  { id: 'track-order', labelKey: 'trackOrder' }, // New navigation item
];
