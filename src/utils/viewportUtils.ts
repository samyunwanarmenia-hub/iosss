import { cookies, headers } from "next/headers";
import { translations } from "@/i18n/translations";

const DEFAULT_LANG = "hy";

const FALLBACK_TITLES: Record<string, string> = {
  hy: translations.hy?.hero?.title || "Samyun Wan Armenia",
  ru: translations.ru?.hero?.title || "Самьюн Ван Армения",
  en: translations.en?.hero?.title || "Samyun Wan Armenia",
};

const resolveLangFromHeaders = () => {
  const headerList = headers();
  const acceptLang = headerList.get("accept-language");
  if (!acceptLang) return DEFAULT_LANG;
  const [primary] = acceptLang.split(",");
  return primary?.split("-")[0] || DEFAULT_LANG;
};

export const getPreferredLang = () => {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get("current_lang")?.value;
  if (cookieLang) return cookieLang.split("-")[0];
  return resolveLangFromHeaders();
};

export const getPreferredLangTitle = () => {
  const lang = getPreferredLang();
  return FALLBACK_TITLES[lang] || FALLBACK_TITLES[DEFAULT_LANG];
};
