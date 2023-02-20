import {TranslateKeyProps} from '@assets/locales/locale';
import MyIcon from '@components/generic/MyIcon';
import MyText from '@components/generic/MyText';
import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

export const BikeButton = ({
  keyText,
  icon,
  onPress,
}: {
  keyText: TranslateKeyProps;
  icon: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <MyText
      style={layoutStyle.flex}
      keyText={keyText}
      _style_bold
      negColor
      _title
    />
    <MyIcon icon={icon} size={42} color={themeStyle.accentThird} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    ...layoutStyle.rowCenter,
    marginVertical: 6,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 2,
    borderRadius: 24,
    borderColor: themeStyle.accentThird,
  },
});
