import {StyleSheet, TextStyle} from 'react-native';
import themeStyle from './themeStyle';

type TextStyleProp = {
  f16: TextStyle;
  f20: TextStyle;
  f22: TextStyle;
  f24: TextStyle;
  f30: TextStyle;
  f40: TextStyle;
  colorPrimary: TextStyle;
  alignStart: TextStyle;
  center: TextStyle;
  error: TextStyle;
  buttonDisabled: TextStyle;
  button: TextStyle;
  header: TextStyle;
  text: TextStyle;
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
    fontFamily: 'SF Pro Text Bold',
  },
  buttonDisabled: {},
  header: {
    fontSize: 20,
    fontFamily: 'SF Pro Text Semibold',
  },
  headerRounded: {
    fontSize: 32,
    fontFamily: 'SF Pro Text Bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: 'SF Pro Text Regular',
  },
  textBold: {
    fontSize: 16,
    fontFamily: 'SF Pro Text Bold',
  },
  textSemibold: {
    fontSize: 16,
    fontFamily: 'SF Pro Text Semibold',
  },
  textLight: {
    fontSize: 16,
    fontFamily: 'SF Pro Text Light',
  },
  textLightItalic: {
    fontSize: 16,
    fontFamily: 'SF Pro Text Light Italic',
  },
  error: {
    fontSize: 12,
    color: themeStyle.errorColor,
  },
  title: {
    fontSize: 24,
    fontFamily: 'SF Pro Text Bold',
    color: themeStyle.accentPrimary,
  },

  subInput: {
    fontSize: 14,
    fontFamily: 'SF Pro Text Thin',
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
    fontFamily: 'SF Pro Text Regular',
    color: themeStyle.accentPrimary,
  },
  infoItalic: {
    fontSize: 14,
    lineHeight: 16.71,
    fontFamily: 'SF Pro Text Thin Italic',
  },
  codeFieldText: {
    fontSize: 24,
    lineHeight: 24,
    color: themeStyle.accentPrimary,
  },
  _title: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 24,
    lineHeight: 28,
  },
  _subtitle: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 20,
  },
  _subtitle_uppercase: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  _subtitle_underline: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 22,
    textDecorationLine: 'underline',
  },
  _body: {
    fontFamily: 'SF Pro Text Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 18,
  },
  _numbers_big: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 36,
    lineHeight: 38,
  },
  _numbers_normal: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 28,
    lineHeight: 30,
  },
  _numbers_small: {
    fontFamily: 'Gotham-Bold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 22,
  },
  _caption: {
    fontFamily: 'SF Pro Text Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_big: {
    fontFamily: 'SF Pro Text Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
  },
  _caption_big_bold: {
    fontFamily: 'SF Pro Text Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
  },
  _caption_thin: {
    fontFamily: 'SF Pro Text Thin',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_italic: {
    fontFamily: 'SF Pro Text Thin Italic',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_bold: {
    fontFamily: 'SF Pro Text Bold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
  },
  _caption_small: {
    fontFamily: 'SF Pro Text Thin',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 16,
  },
  _button_label_giant: {
    fontFamily: 'Gotham-Book',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
  },
});

export default textstyle;
