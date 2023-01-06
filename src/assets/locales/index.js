import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import en_error from './en_error.json';
import fr from './fr.json';
import fr_error from './fr_error.json';

const locale = RNLocalize.getLocales()?.[0]?.languageCode;

i18n.defaultLocale = 'en';
i18n.locale = locale;
i18n.fallbacks = true;
i18n.translations = {en: {...en, ...en_error}, fr: {...fr, ...fr_error}};

export default i18n;
