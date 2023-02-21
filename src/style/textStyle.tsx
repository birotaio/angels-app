import {StyleSheet, TextStyle} from 'react-native';
import themeStyle from './themeStyle';

type TextStyleProp = {
  f16: TextStyle;
  f20: TextStyle;
  f22: TextStyle;
  f24: TextStyle;
  f30: TextStyle;
  f32: TextStyle;
  f40: TextStyle;
  colorPrimary: TextStyle;
  alignStart: TextStyle;
  center: TextStyle;
  error: TextStyle;
  buttonDisabled: TextStyle;
  button: TextStyle;
  header: TextStyle;
  textBold: TextStyle;
  textSemibold: TextStyle;
  textLight: TextStyle;
  textLightItalic: TextStyle;
  subInput: TextStyle;
  title: TextStyle;
  link: TextStyle;
  bigLink: TextStyle;
  infoItalic: TextStyle;
  codeFieldText: TextStyle;
  headerRounded: TextStyle;
  _title: TextStyle;
  _subtitle: TextStyle;
  _subtitle_uppercase: TextStyle;
  _subtitle_underline: TextStyle;
  _body: TextStyle;
  _numbers_big: TextStyle;
  _numbers_normal: TextStyle;
  _numbers_small: TextStyle;
  _caption_italic: TextStyle;
  _caption: TextStyle;
  _caption_big_bold: TextStyle;
  _caption_big: TextStyle;
  _caption_thin: TextStyle;
  _caption_bold: TextStyle;
  _caption_small: TextStyle;
  _button_label_giant: TextStyle;
};

const textstyle: TextStyleProp = StyleSheet.create({
  f16: {
    fontSize: 16,
  },
  f20: {
    fontSize: 20,
  },
  f22: {
    fontSize: 22,
  },
  f24: {
    fontSize: 24,
  },
  f30: {
    fontSize: 30,
  },
  f32: {
    fontSize: 32,
  },
  f40: {
    fontSize: 40,
  },
  colorPrimary: {
    color: themeStyle.textColor,
  },
  alignStart: {alignSelf: 'flex-start', textAlign: 'left'},
  center: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  underlined: {textDecorationLine: 'underline'},
  button: {
    fontSize: 18,
  },
  buttonDisabled: {},
  header: {
    fontSize: 20,
  },
  headerRounded: {
    fontSize: 32,
  },
  text: {
    fontSize: 16,
    lineHeight: 16,
  },
  textBold: {
    fontFamily: 'ES Build Bold',
  },
  textSemibold: {
    fontSize: 16,
  },
  textLight: {
    fontSize: 16,
    fontFamily: 'ES Build Regular',
  },
  textLightItalic: {
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: themeStyle.errorColor,
  },
  title: {
    fontSize: 24,
    color: themeStyle.accentPrimary,
  },
  subInput: {
    fontSize: 14,
  },
  bigLink: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 16,
    fontWeight: '400',
    color: themeStyle.accentPrimary,
  },
  infoItalic: {
    fontSize: 14,
    lineHeight: 16.71,
  },
  codeFieldText: {
    fontSize: 24,
    lineHeight: 24,
    color: themeStyle.accentPrimary,
  },
  _title: {
    fontFamily: 'ES Build Bold',
    fontSize: 24,
  },
  _subtitle: {
    fontFamily: 'ES Build Regular',
    fontSize: 20,
  },
  _subtitle_uppercase: {
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  _subtitle_underline: {
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 22,
    textDecorationLine: 'underline',
  },
  _body: {
    fontFamily: 'ES Build Regular',
    fontSize: 16,
  },
  _numbers_big: {
    fontStyle: 'normal',
    fontSize: 36,
    lineHeight: 38,
  },
  _numbers_normal: {
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 30,
  },
  _numbers_small: {
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
  },
  _caption: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_big: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
  },
  _caption_big_bold: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
  },
  _caption_thin: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_italic: {
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_bold: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_small: {
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 16,
  },
  _button_label_giant: {
    fontFamily: 'ES Build Bold',
    fontSize: 22,
    lineHeight: 28,
  },
});

export default textstyle;
