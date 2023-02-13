import React from 'react';
import {View, ViewProps} from 'react-native';

const NoTouchView = (props: ViewProps) => (
  <View
    {...props}
    onStartShouldSetResponder={() => true}
    onTouchEnd={e => e.stopPropagation()}
  />
);

export default NoTouchView;
