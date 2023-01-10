import MyStatusBar from '@components/generic/MyStatusBar';
import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import themeStyle from '@style/themeStyle';
import MyIcon, {IconSetName} from '@components/generic/MyIcon';
import {LogoRow} from '@assets/svg';
import MyText from '@components/generic/MyText';
import componentStyle from '@style/componentStyle';
export interface HeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & {backFn: () => void};
}

const Header = ({}: HeaderProps): React.ReactElement => {
  return (
    <View style={componentStyle.header}>
      <MyStatusBar />
      {/* Menu */}
      <View style={layoutStyle.rowCenter}>
        {false && (
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
        )}
        <View style={layoutStyle.flex} />
        {/* Logo  */}
        <LogoRow width={140} height={60} />
      </View>
    </View>
  );
};

export default Header;
