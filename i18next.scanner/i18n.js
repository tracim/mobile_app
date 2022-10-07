import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './en/translation.json'
import frTranslation from './fr/translation.json'
import ptTranslation from './pt/translation.json'

export const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  pt: { translation: ptTranslation }
}

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n
