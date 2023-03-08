import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import {TranslateKeyProps} from '@assets/locales/locale';
import lottie from '@assets/lottie';
import MyIcon from '@components/generic/MyIcon';
import MyText from '@components/generic/MyText';
import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import colors from '@style/colors';

export const BikeButton = ({
  keyText,
  icon,
  onPress,
  isLoading,
}: {
  keyText: TranslateKeyProps;
  icon: string;
  onPress: () => void;
  isLoading?: boolean;
}) => (
  <TouchableOpacity
    disabled={isLoading}
    style={[styles.container, isLoading && styles.isLoading]}
    onPress={onPress}>
    <MyText
      style={layoutStyle.flex}
      keyText={keyText}
      _style_bold
      negColor
      _title
    />
    {isLoading ? (
      <Lottie
        style={styles.loader}
        autoSize
        source={lottie.buttonLoader}
        autoPlay
        loop
        colorFilters={[
          {keypath: 'fifteen-stroke', color: themeStyle.accentThird},
        ]}
      />
    ) : (
      <MyIcon icon={icon} size={42} color={themeStyle.accentThird} />
    )}
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
  loader: {width: 42, height: 42},
  isLoading: {backgroundColor: colors.NEUTRAL_LIGHT_03},
});
