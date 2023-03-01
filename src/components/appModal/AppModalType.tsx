import {TranslateKeyProps} from '@assets/locales/locale';

export type AppModalType = {
  title: TranslateKeyProps;
  description: TranslateKeyProps;
  image: string;
  button1?: {
    text: TranslateKeyProps;
    action: () => void;
  };
  button2?: {
    text: TranslateKeyProps;
    action: () => void;
  };
};
