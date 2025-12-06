"use client";

import { useCallback } from 'react';
import { SectionId } from '@/types/global';

const useNavigationUtils = (currentLang: string) => {
  const getHomePath = useCallback(() => {
    return `/${currentLang}`;
  }, [currentLang]);

  const getSectionPath = useCallback((sectionId: SectionId) => {
    // These sections are now dedicated pages
    const pageRoutes: SectionId[] = ['products', 'about', 'benefits', 'testimonials', 'faq', 'contact', 'track-order'];
    
    if (pageRoutes.includes(sectionId)) {
      return `/${currentLang}/${sectionId}`;
    }
    // For sections that are still anchors on the home page (if any remain, though none do after this change)
    return `/${currentLang}#${sectionId}`;
  }, [currentLang]);

  return { getHomePath, getSectionPath };
};

export default useNavigationUtils;
