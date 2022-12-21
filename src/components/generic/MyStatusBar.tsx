import themeStyle from '@style/themeStyle';
import React from 'react';
import {StatusBar, StatusBarProps} from 'react-native';

const MyStatusBar: React.FC<StatusBarProps> = props => (
  <StatusBar
    barStyle={'dark-content'}
    backgroundColor={themeStyle.bg0}
    {...props}
  />
);
export default MyStatusBar;
