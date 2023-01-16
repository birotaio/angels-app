import {StyleSheet} from 'react-native';
import themeStyle from './themeStyle';

export default StyleSheet.create({
  myTextInput: {
    fontSize: 16,
    fontFamily: 'ES Build Regular',
    paddingVertical: 6,
    color: themeStyle.textColorInput,
  },
  MyButton: {
    paddingHorizontal: 4,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeStyle.accentPrimary,
    borderRadius: 72,
    color: themeStyle.textColor,
  },
  MyButtonDisabled: {
    backgroundColor: themeStyle.placeholderTextColor,
    color: themeStyle.textColor,
  },
  // Navigation
  header: {
    backgroundColor: themeStyle.accentPrimary,
  },
  // Map
  mapFab: {
    borderRadius: 24,
    backgroundColor: themeStyle.background,
  },
});
