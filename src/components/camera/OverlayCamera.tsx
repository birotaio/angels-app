import React from 'react';
import {View} from 'react-native';
import layoutStyle from '@style/layoutStyle';
import colors from '@style/colors';

const OverlayCamera = () => {
  return (
    <View style={[layoutStyle.absFill, {backgroundColor: colors.DANGER_500}]} />
  );
};

export {OverlayCamera};
