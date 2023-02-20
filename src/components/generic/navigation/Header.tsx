import MyStatusBar from '@components/generic/MyStatusBar';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import themeStyle from '@style/themeStyle';
import MyIcon, {IconSetName} from '@components/generic/MyIcon';
import {LogoRow} from '@assets/svg';
import componentStyle from '@style/componentStyle';

const Header: React.FC<DrawerHeaderProps> = ({navigation}) => {
  return (
    <View style={componentStyle.header}>
      <MyStatusBar />
      {/* Menu */}
      <View style={layoutStyle.rowCenter}>
        <TouchableOpacity
          style={[layoutStyle.rowCenter, layoutStyle.ml12]}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <MyIcon
            icon="menu"
            size={24}
            color={themeStyle.textColor}
            setName={IconSetName.MaterialIcon}
          />
        </TouchableOpacity>

        <View style={layoutStyle.flex} />
        {/* Logo  */}
        <LogoRow width={140} height={60} />
      </View>
    </View>
  );
};

export default Header;
