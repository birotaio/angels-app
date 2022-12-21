import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {SafeAreaView, ViewProps} from 'react-native';
import MyView, {MyViewProps} from './MyView';

const MyScreen: React.FC<ViewProps & MyViewProps> = ({
  children,
  noPadding,
  style,
  ...props
}) => {
  return (
    <SafeAreaView
      style={[
        layoutStyle.flex,
        {backgroundColor: themeStyle.accentPrimary.toString()},
      ]}>
      <MyView
        bg0
        style={[layoutStyle.container, !noPadding && layoutStyle.p5, style]}
        {...props}>
        {children}
      </MyView>
    </SafeAreaView>
  );
};
export default MyScreen;
