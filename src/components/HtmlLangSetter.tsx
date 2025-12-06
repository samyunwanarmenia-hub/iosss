"use client";

import { useEffect } from 'react';

import { LOCALE_CODES, type SupportedLang } from '@/config/locales';

interface HtmlLangSetterProps {
  lang: SupportedLang;
}

const HtmlLangSetter = ({ lang }: HtmlLangSetterProps) => {
  useEffect(() => {
    document.documentElement.lang = LOCALE_CODES[lang] || lang;
  }, [lang]);

  return null;
};

export default HtmlLangSetter;
