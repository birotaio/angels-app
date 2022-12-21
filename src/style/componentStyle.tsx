import {StyleSheet} from 'react-native';
import themeStyle from './themeStyle';

export default StyleSheet.create({
  myTextInput: {
    fontSize: 16,
    fontFamily: 'SF Pro Text Regular',
    fontWeight: '400',
    lineHeight: 48,
    height: 48,
    marginTop: 6,
    marginBottom: 4,
    paddingHorizontal: '0.5%',
    marginHorizontal: 0,
    color: themeStyle.textColorInput,
  },
  MyButton: {
    paddingHorizontal: 4,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyle.accentSecondary,
    borderRadius: 24,
    color: themeStyle.textColor,
  },
  MyButtonDisabled: {
    backgroundColor: themeStyle.placeholderTextColor,
    color: themeStyle.textColor,
  },
  // Map
  mapFab: {
    borderRadius: 24,
    backgroundColor: themeStyle.background,
  },
});
