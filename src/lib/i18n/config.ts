
/**
 * @fileOverview Institutional Localization Configuration (i18n)
 * Provides the architectural foundation for multi-language support in global hubs.
 */

export type SupportedLanguage = 'en' | 'ar' | 'hi' | 'fr';

export interface LocalizationConfig {
  defaultLanguage: SupportedLanguage;
  fallbackLanguage: SupportedLanguage;
  supportedLanguages: SupportedLanguage[];
  translations: Record<SupportedLanguage, Record<string, string>>;
}

export const I18N_CONFIG: LocalizationConfig = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  supportedLanguages: ['en', 'ar', 'hi', 'fr'],
  translations: {
    en: {
      'nav.home': 'Home',
      'nav.archive': 'Registry',
      'nav.curation': 'Curation',
      'product.inquire': 'Inquire Privately',
      'footer.charter': 'Founding Charter 1924'
    },
    ar: {
      'nav.home': 'الرئيسية',
      'nav.archive': 'السجل',
      'nav.curation': 'تقييم',
      'product.inquire': 'استفسار خاص',
      'footer.charter': 'ميثاق التأسيس ١٩٢٤'
    },
    hi: {
      'nav.home': 'होम',
      'nav.archive': 'रजिस्ट्री',
      'nav.curation': 'क्यूरेशन',
      'product.inquire': 'निजी तौर पर पूछताछ करें',
      'footer.charter': 'स्थापना चार्टर १९२४'
    },
    fr: {
      'nav.home': 'Accueil',
      'nav.archive': 'Registre',
      'nav.curation': 'Curation',
      'product.inquire': 'S’informer en privé',
      'footer.charter': 'Charte de Fondation 1924'
    }
  }
};

/**
 * Localization Resolver
 */
export function t(key: string, lang: SupportedLanguage = 'en'): string {
  return I18N_CONFIG.translations[lang]?.[key] || I18N_CONFIG.translations['en'][key] || key;
}
