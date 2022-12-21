import MyStatusBar from '@components/generic/MyStatusBar';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import navigator from './navigator';
import themeStyle from '@style/themeStyle';
import MyIcon from '@components/generic/MyIcon';
export interface HeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions;
  backFn: () => void;
}

const Header = ({back, options}: HeaderProps): React.ReactElement => {
  const hasBack =
    back &&
    (options.headerBackVisible === undefined || options.headerBackVisible);
  const hasBackFn = options?.backFn;
  const hasTools = false;

  return (
    <SafeAreaView
      style={[
        layoutStyle.rowCenter,
        layoutStyle.headerContainer,
        layoutStyle.borderShadow,

        {backgroundColor: themeStyle.bg0},
      ]}>
      <MyStatusBar />
      {hasBack ? (
        <TouchableOpacity
          style={[layoutStyle.headerButtonContainer]}
          onPress={() => {
            if (hasBackFn) {
              hasBackFn?.();
            } else {
              navigator.pop();
            }
          }}>
          <MyIcon
            icon="chevron-left"
            size={24}
            color={themeStyle.accentPrimary}
          />
        </TouchableOpacity>
      ) : (
        <View style={layoutStyle.headerButtonContainer} />
      )}
      {/* logo place */}
      <View style={layoutStyle.flexCenter} />
      {hasTools ? (
        <TouchableOpacity
          style={layoutStyle.headerButtonContainer}
          onPress={() => {}}>
          <Icon name="dots-vertical" size={24} />
        </TouchableOpacity>
      ) : (
        <View style={layoutStyle.headerButtonContainer} />
      )}
    </SafeAreaView>
  );
};

export default Header;
