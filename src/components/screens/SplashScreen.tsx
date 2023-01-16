import layoutStyle from '@style/layoutStyle';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AUTH_ACTIONS_SAGA_CHECK_LOGIN} from '@logic/store/auth/saga';
import {Image, View} from 'react-native';
import images from '@assets/images';

const SplashScreen = () => {
  const dispatch = useDispatch();
  // const [progress, setProgress] = useState<DownloadProgress | null>(null);
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
      {/* {progress && (
        <ProgressBar
          style={[layoutStyle.mt5, layoutStyle.w100]}
          progress={progress.receivedBytes / progress.totalBytes}
          color={themeStyle.bg0.toString()}
        />
      )} */}
    </View>
  );
};

SplashScreen.navigationName = 'Splash';
SplashScreen.navigationOptions = {headerShown: false};

export {SplashScreen};
