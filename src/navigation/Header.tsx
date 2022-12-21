import MyStatusBar from '@components/generic/MyStatusBar';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import themeStyle from '@style/themeStyle';
import MyIcon, {IconSetName} from '@components/generic/MyIcon';
import {LogoRow} from '@assets/svg';
import MyText from '@components/generic/MyText';
export interface HeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & {backFn: () => void};
}

const Header = ({}: HeaderProps): React.ReactElement => {
  return (
    <SafeAreaView
      style={[
        layoutStyle.rowCenter,
        layoutStyle.headerContainer,
        layoutStyle.borderShadow,

        {backgroundColor: themeStyle.accentPrimary},
      ]}>
      <MyStatusBar barStyle={'light-content'} />
      {/* Menu */}
      <TouchableOpacity
        style={[layoutStyle.rowCenter, layoutStyle.ml12]}
        onPress={() => {}}>
        <MyIcon
          icon="menu"
          size={24}
          color={themeStyle.textColor}
          setName={IconSetName.MaterialIcon}
        />
        <MyText keyText="menu" />
      </TouchableOpacity>
      <View style={layoutStyle.flex} />
      {/* Logo  */}
      <LogoRow width={140} height={60} />
    </SafeAreaView>
  );
};

export default Header;
