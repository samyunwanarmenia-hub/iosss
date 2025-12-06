import { SupportedLang } from './locales';

export const SEO_KEYWORDS: Record<SupportedLang, string[]> = {
  hy: [
    'Samyun Wan Հայաստան',
    'Սամյուն Վան գնել',
    'քաշի ավելացման դեղ',
    'ХЌХЎХґХµХёЦ‚Х¶ ХЋХЎХ¶',
    'Samyun Wan ХЂХЎХµХЎХЅХїХЎХ¶',
    'ХЌХЎХґХµХёЦ‚Х¶ ХЋХЎХ¶ ХЈХ¶ХҐХ¬',
    'Ц„ХЎХ·Х« ХЎХѕХҐХ¬ХЎЦЃХґХЎХ¶ Х°ХЎХґХЎЦЂ',
    'ХўХ¶ХЎХЇХЎХ¶ Х°ХЎХѕХҐХ¬ХёЦ‚Хґ',
    'Ц…ЦЂХ«ХЈХ«Х¶ХЎХ¬ ХЎХєЦЂХЎХ¶Ц„ ХЂХЎХµХЎХЅХїХЎХ¶',
    'Х¤ХҐХІХЎХ№ХЎЦѓХҐЦЂ Ц„ХЎХ·Х« Х°ХЎХґХЎЦЂ',
    'ХЎХјХЎЦ„ХёЦ‚Хґ ХЂХЎХµХЎХЅХїХЎХ¶',
    'weight gain supplement Armenia',
  ],
  ru: [
    'Samyun Wan Армения купить',
    'капсулы для набора веса',
    'samyun wan',
    'samyun wan РєСѓРїРёС‚СЊ',
    'samyun wan Р°СЂРјРµРЅРёСЏ',
    'samyun wan РєР°РїСЃСѓР»С‹',
    'samyun wan РѕСЂРёРіРёРЅР°Р»',
    'РєСѓРїРёС‚СЊ РІ РµСЂРµРІР°РЅРµ',
    'РґРѕСЃС‚Р°РІРєР° РїРѕ Р°СЂРјРµРЅРёРё',
    'РЅР°С‚СѓСЂР°Р»СЊРЅС‹Р№ РїСЂРѕРґСѓРєС‚',
    'РєР°РїСЃСѓР»С‹ РґР»СЏ РЅР°Р±РѕСЂР° РІРµСЃР°',
    'РІРёС‚Р°РјРёРЅС‹ РґР»СЏ РјР°СЃСЃС‹',
    'РѕСЂРёРіРёРЅР°Р» samyun wan',
  ],
  en: [
    'Samyun Wan Armenia buy',
    'Samuyn Wan',
    'Samyun Wan Armenia',
    'weight gain capsules',
    'natural weight gain product',
    'authentic Samyun Wan',
    'weight gain supplement',
    'buy Samyun Wan Armenia',
  ],
};

export const getSeoKeywords = (lang: SupportedLang) => {
  return SEO_KEYWORDS[lang] || SEO_KEYWORDS.hy;
};
