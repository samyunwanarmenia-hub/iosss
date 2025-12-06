"use client";

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { SectionId } from '../types/global';

const useActiveLink = () => {
  const pathname = usePathname();

  const getLinkClasses = useCallback((sectionId: SectionId) => {
    const baseClasses = "text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors";
    
    const currentPath = pathname || '/';
    const pathSegments = currentPath.split('/').filter(Boolean);
    // The first segment is always the language, e.g., 'hy'
    // The second segment (if present) is the page/section ID, e.g., 'about'
    const currentRouteSection = pathSegments.length > 1 ? pathSegments[1] : 'home'; // Default to 'home' if only lang is present

    let isActive = false;

    if (sectionId === 'home') {
      // 'home' is active if the path is just '/[lang]' (e.g., '/hy')
      isActive = pathSegments.length === 1;
    } else {
      // For other sections, check if the current route matches the sectionId
      isActive = currentRouteSection === sectionId;
    }

    return `${baseClasses} ${isActive ? 'text-primary-600 font-bold' : ''}`;
  }, [pathname]);

  return { getLinkClasses };
};

export default useActiveLink;