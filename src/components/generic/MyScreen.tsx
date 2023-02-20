import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  View,
  ViewProps,
} from 'react-native';
import MyStatusBar from './MyStatusBar';
import MyView, {MyViewProps} from './MyView';

const MyScreen: React.FC<
  ViewProps &
    MyViewProps & {background?: ImageSourcePropType; showStatusBar?: boolean}
> = ({children, noPadding, style, background, showStatusBar, ...props}) => {
  return (
    <MyView backgroundWhite style={layoutStyle.flex} {...props}>
      {background && (
        <Image
          style={[layoutStyle.absFill, layoutStyle.w100, layoutStyle.h100]}
          source={background}
        />
      )}
      <View style={layoutStyle.flex}>
        {showStatusBar && <MyStatusBar />}
        <MyView
          style={[layoutStyle.container, !noPadding && layoutStyle.p5, style]}
          {...props}>
          {children}
        </MyView>
      </View>
      <SafeAreaView />
    </MyView>
  );
};
export default MyScreen;
