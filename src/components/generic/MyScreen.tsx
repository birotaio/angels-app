import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  View,
  ViewProps,
} from 'react-native';
import MyView, {MyViewProps} from './MyView';

const MyScreen: React.FC<
  ViewProps & MyViewProps & {background?: ImageSourcePropType}
> = ({children, noPadding, style, background, ...props}) => {
  return (
    <View style={layoutStyle.flex}>
      {background && (
        <Image
          style={[layoutStyle.absFill, layoutStyle.w100, layoutStyle.h100]}
          source={background}
        />
      )}
      <SafeAreaView style={layoutStyle.flex}>
        <MyView
          bg0
          style={[layoutStyle.container, !noPadding && layoutStyle.p5, style]}
          {...props}>
          {children}
        </MyView>
      </SafeAreaView>
    </View>
  );
};
export default MyScreen;
