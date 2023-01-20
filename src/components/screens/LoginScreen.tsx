import images from '@assets/images';
import i18n from '@assets/locales';
import {Logo} from '@assets/svg';
import MyForm from '@components/generic/MyForm';
import MyScreen from '@components/generic/MyScreen';
import MyText from '@components/generic/MyText';
import MyView from '@components/generic/MyView';
import {AUTH_ACTIONS_SAGA_LOGIN} from '@logic/store/auth/saga';
import {AuthSelector} from '@logic/store/auth/selector';
import useTracking from '@navigation/useTracking';
import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import {emailFormat} from '@utils/strings/regex';
import {getAppVersion} from '@utils/version';
import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenProps} from '.';

const LoginScreen: ScreenProps = () => {
  const dispatch = useDispatch();

  useTracking(LoginScreen.navigationName);

  return (
    <MyScreen background={images.login_bg}>
      {/* TODO remove press */}
      <View style={layoutStyle.asc}>
        <Logo
          width={layoutStyle.dim.height / 3}
          height={layoutStyle.dim.height / 3}
        />
      </View>

      <MyView flex p5>
        <MyForm
          button={{
            textColor: themeStyle.textColor,
            backgroundColor: themeStyle.textNegColor,
          }}
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
        <MyText>{getAppVersion()}</MyText>
      </MyView>
    </MyScreen>
  );
};

LoginScreen.navigationName = 'Login';
LoginScreen.navigationOptions = {headerShown: false};

export {LoginScreen};
