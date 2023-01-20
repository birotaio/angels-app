import layoutStyle from '@style/layoutStyle';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AUTH_ACTIONS_SAGA_CHECK_LOGIN} from '@logic/store/auth/saga';
import {Image, View} from 'react-native';
import images from '@assets/images';

const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: AUTH_ACTIONS_SAGA_CHECK_LOGIN});
  }, [dispatch]);
  return (
    <View style={layoutStyle.flexCenter}>
      <Image
        style={[layoutStyle.flex, layoutStyle.w100]}
        source={images.login_bg}
        resizeMode="cover"
      />
    </View>
  );
};

SplashScreen.navigationName = 'Splash';
SplashScreen.navigationOptions = {headerShown: false};

export {SplashScreen};
