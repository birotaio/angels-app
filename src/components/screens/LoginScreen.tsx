import images from '@assets/images';
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

const LoginScreen: ScreenProps = () => {
  const dispatch = useDispatch();

  useTracking(LoginScreen.navigationName);

  return (
    <MyScreen background={images.login_bg}>
      <MyKeyboardAvoidingView>
        {/* TODO remove press */}
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
                    message: i18n.t('email-required'),
                  },
                  pattern: {
                    value: emailFormat,
                    message: i18n.t('email-required'),
                  },
                },
                inputProps: {
                  keyboardType: 'email-address',
                  value: 'sylvain.levy@fifteen.eu',
                },
              },
              {
                name: i18n.t('password'),
                label: 'password',
                rules: {
                  required: {
                    value: true,
                    message: i18n.t('password-required'),
                  },
                  minLength: {
                    value: 4,
                    message: i18n.t('password-required'),
                  },
                },
                inputProps: {
                  secureTextEntry: true,
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
