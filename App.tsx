import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainRouter from '@navigation/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from '@navigation/navigator';
import NativeSplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import store from '@logic/store';
import FlashMessage from 'react-native-flash-message';
import codePush from 'react-native-code-push';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import themeStyle from '@style/themeStyle';
import {codepushUpdate} from '@utils/version';
import message from '@utils/message';
import i18n from '@assets/locales';
import messaging from '@utils/firebase/messaging';
const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  roundness: 24,
  colors: {
    ...DefaultTheme.colors,
    primary: themeStyle.accentPrimary.toString(),
  },
};

const UPDATE_TIMEOUT = 2000; // msecs
let splash = true;
const App = () => {
  React.useEffect(() => {
    codepushUpdate({
      exitHandler: newVersion => {
        if (newVersion) {
          if (!splash) {
            // show alert
            message.showAlert({
              title: i18n.t('update'),
              message: i18n.t('update_text'),
              onConfirm: () => {
                codePush.restartApp();
              },
              cancelable: false,
              oneButton: true,
            });
          } else {
            // reboot
            codePush.restartApp();
          }
        } else {
          NativeSplashScreen.hide();
        }
      },
    });

    messaging.inAppMessaging().setMessagesDisplaySuppressed(true);

    setTimeout(() => {
      NativeSplashScreen.hide();
      splash = false;
    }, UPDATE_TIMEOUT);
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <MainRouter />
            <FlashMessage position="top" />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App);
