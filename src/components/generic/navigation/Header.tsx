import MyStatusBar from '@components/generic/MyStatusBar';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import themeStyle from '@style/themeStyle';
import MyIcon, {IconSetName} from '@components/generic/MyIcon';
import {LogoRow} from '@assets/svg';
import componentStyle from '@style/componentStyle';
import {useDispatch} from 'react-redux';
import {AUTH_ACTIONS_SAGA_LOGOUT} from '@logic/store/auth/saga';

const Header: React.FC<NativeStackHeaderProps> = () => {
  const dispatch = useDispatch();
  return (
    <View style={componentStyle.header}>
      <MyStatusBar />
      {/* Menu */}
      <View style={layoutStyle.rowCenter}>
        <TouchableOpacity
          style={[layoutStyle.rowCenter, layoutStyle.ml12]}
          onPress={() => dispatch({type: AUTH_ACTIONS_SAGA_LOGOUT})}>
          <MyIcon
            icon="logout"
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
