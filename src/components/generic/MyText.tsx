import {TranslateKeyProps} from '@assets/locales/locale';
import layoutStyle from '@style/layoutStyle';
import textStyle from '@style/textStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {ColorValue, Text, TextProps, TextStyle, View} from 'react-native';
import i18n from '../../assets/locales';
import MyIcon, {MyIconProps} from './MyIcon';

type MyTextProps = {
  color?: ColorValue;
  text?: string | ((props: {children: string}) => React.ReactNode);
  keyText?: TranslateKeyProps | false;
  keyTextString?: string;
  style?: TextStyle;
  uppercase?: boolean;
  icon?: MyIconProps;
  lineHeight?: number;
  onPress?: () => void;
  _title?: boolean;
  _subtitle?: boolean;
  _subtitle_uppercase?: boolean;
  _subtitle_underline?: boolean;
  _body?: boolean;
  _numbers_big?: boolean;
  _numbers_normal?: boolean;
  _numbers_small?: boolean;
  _caption_italic?: boolean;
  _caption?: boolean;
  _caption_big?: boolean;
  _caption_big_bold?: boolean;
  _caption_bold?: boolean;
  _caption_small?: boolean;
  _caption_thin?: boolean;
  _button_label_giant?: boolean;
  _color_text_primary?: boolean;
  _color_text_secondary?: boolean;
  _color_primary?: boolean;
  _color_secondary?: boolean;
  _color_grey?: boolean;
};

const MyText: React.FC<MyTextProps & TextProps> = ({
  style,
  color,
  text,
  keyText,
  keyTextString,
  uppercase,
  icon,
  lineHeight,
  onPress,
  _title,
  _subtitle,
  _subtitle_uppercase,
  _subtitle_underline,
  _body,
  _numbers_big,
  _numbers_normal,
  _numbers_small,
  _caption_italic,
  _caption,
  _caption_big,
  _caption_bold,
  _caption_big_bold,
  _caption_small,
  _caption_thin,
  _button_label_giant,
  _color_text_primary,
  _color_text_secondary,
  _color_primary,
  _color_secondary,
  _color_grey,
  ...props
}): React.ReactElement => {
  const _key = keyText || keyTextString;
  const _t = _key ? i18n.t(_key) : text || '';
  const _text = _t && (uppercase ? _t?.toUpperCase() : _t);
  const _style = [
    _title && textStyle._title,
    _subtitle && textStyle._subtitle,
    _subtitle_uppercase && textStyle._subtitle_uppercase,
    _subtitle_underline && textStyle._subtitle_underline,
    _body && textStyle._body,
    _numbers_big && textStyle._numbers_big,
    _numbers_normal && textStyle._numbers_normal,
    _numbers_small && textStyle._numbers_small,
    _caption_italic && textStyle._caption_italic,
    _caption && textStyle._caption,
    _caption_big && textStyle._caption_big,
    _caption_big_bold && textStyle._caption_big_bold,
    _caption_bold && textStyle._caption_bold,
    _caption_small && textStyle._caption_small,
    _caption_thin && textStyle._caption_thin,
    _button_label_giant && textStyle._button_label_giant,
  ];
  const _color = _color_primary
    ? themeStyle.accentPrimary
    : _color_secondary
    ? themeStyle.accentSecondary
    : color || themeStyle.textColor;

  return icon ? (
    <View style={layoutStyle.rowCenter}>
      {icon && (
        <MyIcon
          {...icon}
          size={icon.size || style?.fontSize}
          color={icon.color || _color || style?.color}
        />
      )}
      <Text
        style={[
          textStyle.center,
          {color: _color},
          style,
          icon && layoutStyle.mh12p,
          {lineHeight: Math.max(style?.fontSize || 0, icon?.size || 0)},
          _style,
        ]}
        {...props}>
        {_text}
        {props?.children}
      </Text>
    </View>
  ) : (
    <Text
      onPress={onPress}
      style={[
        {color: _color},
        icon && layoutStyle.mh12p,
        _style,
        style,
        {lineHeight: lineHeight || style?.fontSize},
      ]}
      {...props}>
      {_text}
      {props?.children}
    </Text>
  );
};

export default MyText;
