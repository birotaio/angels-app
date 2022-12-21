import React from 'react';
import * as Icons from '@assets/svg';
import {ColorValue} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import themeStyle from '@style/themeStyle';

export const IconSetName = {
  MaterialIcon: 'MaterialIcon',
};

export type MyIconProps = {
  icon: string;
  setName?: string;
  size?: number;
  color?: ColorValue;
};

const MyIcon: React.FC<MyIconProps> = ({
  icon,
  size,
  color,
  setName,
  ...props
}) =>
  Icons[icon] ? (
    React.createElement(Icons[icon], {
      width: size,
      height: size,
      fill: color,
      color,
      ...props,
    })
  ) : setName === IconSetName.MaterialIcon ? (
    <MaterialIcon
      name={icon}
      size={size || 28}
      color={color || themeStyle.textColor}
    />
  ) : (
    <MaterialCommunityIcons
      name={icon}
      size={size || 28}
      color={color || themeStyle.textColor}
    />
  );

export default MyIcon;
