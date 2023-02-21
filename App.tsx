import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import MainRouter from '@navigation/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from '@navigation/navigator';

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
import {AppModal} from '@components/appModal/AppModal';
import {StatusBar} from 'react-native';
const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  roundness: 32,
  fonts: {
    regular: {fontFamily: 'ES Build Regular'},
    thin: {fontFamily: 'ES Build Regular'},
    light: {fontFamily: 'ES Build Regular'},
    medium: {fontFamily: 'ES Build Medium'},
  },
  colors: {
    ...DefaultTheme.colors,
    primary: themeStyle.accentPrimary.toString(),
    text: themeStyle.textColorInput,
  },
};

const App = () => {
  React.useEffect(() => {
    codepushUpdate({
      exitHandler: newVersion => {
        if (newVersion) {
          // show alert
          message.showAlert({
            title: i18n.t('update-title'),
            message: i18n.t('update-text'),
            onConfirm: () => {
              codePush.restartApp();
            },
            cancelable: false,
            oneButton: true,
          });
        }
      },
    });

    messaging.inAppMessaging().setMessagesDisplaySuppressed(true);
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <MainRouter />

            <FlashMessage
              style={{marginTop: StatusBar.currentHeight}}
              position="top"
            />

            <AppModal />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App);
