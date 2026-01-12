import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '../../locales';

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =
  Localization.getLocales().length > 0
    ? Localization.getLocales()[0]
    : fallback;

const initI18n = async () => {
  // Check if there's a stored language preference
  const storedLanguage = await AsyncStorage.getItem('appLanguage');
  
  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      lng: storedLanguage || languageTag,
      fallbackLng: 'en',
      resources: {
        en: { translation: translations.en },
        bn: { translation: translations.bn },
        pt: { translation: translations.pt },
      },
      interpolation: { escapeValue: false },
    });
};

initI18n();

export default i18n;
