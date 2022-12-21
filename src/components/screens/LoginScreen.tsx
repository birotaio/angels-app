import i18n from '@assets/locales';
import {Logo} from '@assets/svg';
import MyForm from '@components/generic/MyForm';
import MyKeyboardAvoidingView from '@components/generic/MyKeyboardAvoidingView';
import MyScreen from '@components/generic/MyScreen';
import MyView from '@components/generic/MyView';
import {AUTH_ACTIONS_SAGA_LOGIN} from '@logic/store/auth/saga';
import {AuthSelector} from '@logic/store/auth/selector';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import {emailFormat} from '@utils/strings/regex';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '.';
import Lottie from 'lottie-react-native';
import lottie from '@assets/lottie';

const LoginScreen: ScreenProps = () => {
  const dispatch = useDispatch();

  useTracking(LoginScreen.navigationName);

  return (
    <MyScreen>
      <MyKeyboardAvoidingView>
        <View style={layoutStyle.asc}>
          <Logo />
        </View>

        <MyView flex p5>
          <MyForm
            buttonSpaceTop={48}
            isLoading={useSelector(AuthSelector.isLoading)}
            fields={[
              {
                name: i18n.t('email'),
                label: 'email',
                rules: {
                  required: {
                    value: true,
                    message: i18n.t('email_required'),
                  },
                  pattern: {
                    value: emailFormat,
                    message: i18n.t('email_required'),
                  },
                },
                inputProps: {
                  keyboardType: 'email-address',
                },
              },
              {
                name: i18n.t('password'),
                label: 'password',
                rules: {
                  required: {
                    value: true,
                    message: i18n.t('password_required'),
                  },
                  minLength: {
                    value: 4,
                    message: i18n.t('password_required'),
                  },
                },
              },
            ]}
            ctaLabel={i18n.t('login')}
            handleFormValidation={data =>
              dispatch({type: AUTH_ACTIONS_SAGA_LOGIN, data})
            }
          />
        </MyView>
      </MyKeyboardAvoidingView>
    </MyScreen>
  );
};

LoginScreen.navigationName = 'Login';
LoginScreen.navigationOptions = {headerShown: false};

export {LoginScreen};
