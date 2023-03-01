import i18n from '@assets/locales';
import {TranslateKeyProps} from '@assets/locales/locale';
import {Alert} from 'react-native';
import {MessageType, showMessage} from 'react-native-flash-message';

const SHOW_TIME = 5000;

const showError = (keyMessage: TranslateKeyProps) =>
  showMessage({
    message: i18n.t(keyMessage),
    hideOnPress: true,
    duration: SHOW_TIME,
    floating: true,
    type: 'danger',
    position: 'top',
  });
const show = (
  keyMessage: TranslateKeyProps | string,
  type?: MessageType,
  translate: boolean = true,
) =>
  showMessage({
    message: translate ? i18n.t(keyMessage) : keyMessage,
    hideOnPress: true,
    duration: SHOW_TIME,
    floating: true,
    type: type,
    position: 'top',
  });

const showAlert = ({
  title,
  message,
  onConfirm,
  cancelable,
  oneButton,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  cancelable?: boolean;
  oneButton?: boolean;
}) =>
  Alert.alert(
    title,
    message,
    oneButton
      ? [{text: 'OK', onPress: onConfirm, style: 'cancel'}]
      : [
          {
            text: i18n.t('cancel'),
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: onConfirm},
        ],
    {cancelable},
  );

export default {
  showError,
  show,
  showAlert,
};
