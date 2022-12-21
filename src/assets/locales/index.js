import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import fr from './fr.json';

const locale = RNLocalize.getLocales()?.[0]?.languageCode;

i18n.defaultLocale = 'en';
i18n.locale = locale;
i18n.fallbacks = true;
i18n.translations = {en, fr};

export default i18n;
