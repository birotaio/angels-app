import {TranslateKeyProps} from '@assets/locales/locale';
import MyText from '@components/generic/MyText';
import MyView from '@components/generic/MyView';
import colors from '@style/colors';
import layoutStyle from '@style/layoutStyle';
import React from 'react';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

type TextLinkProps = {
  keyText?: TranslateKeyProps;
  keyTextLink: TranslateKeyProps;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  onPress: () => void;
  underlined?: boolean;
  isLoading?: boolean;
  expand?: boolean;
};

const TextLink: React.FC<TextLinkProps> = ({
  keyText,
  keyTextLink,
  onPress,
  style,
  textStyle,
  isLoading,
  expand,
}) => (
  <MyView
    style={[
      isLoading !== undefined && styles.h24p,
      expand && layoutStyle.w100,
      style,
    ]}
    rowCenter>
    {isLoading && <View style={styles.w48} />}
    {keyText && (
      <MyText
        _body
        style={[layoutStyle.mr4p, {color: colors.GREY}]}
        keyText={keyText}
      />
    )}
    <TouchableOpacity
      style={expand && [layoutStyle.w100, layoutStyle.flex]}
      onPress={onPress}>
      <MyText
        _body
        _color_primary
        style={{...textStyle}}
        keyText={keyTextLink}
      />
    </TouchableOpacity>

    {isLoading && (
      <ActivityIndicator
        style={layoutStyle.mh12p}
        color={textStyle?.color?.toString()}
      />
    )}
  </MyView>
);

const styles = {
  h24p: {height: 24},
  w48: {width: 48},
};

export default TextLink;
