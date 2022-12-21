import {TranslateKeyProps} from '@assets/locales/locale';
import navigator from '@navigation/navigator';
import componentStyle from '@style/componentStyle';
import layoutStyle from '@style/layoutStyle';
import textstyle from '@style/textStyle';
import themeStyle from '@style/themeStyle';
import React, {FunctionComponent} from 'react';
import {
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SvgProps} from 'react-native-svg';
import MyIcon, {MyIconProps} from './MyIcon';
import MyText from './MyText';

type MyButtonProps = {
  spaceBottom?: boolean;
  spaceTop?: boolean;
  disabled?: boolean;
  text?: string;
  keyText?: TranslateKeyProps;
  keyTextString?: string;
  nextScreen?: string;
  icon?: MyIconProps;
  iconComponent?: FunctionComponent<SvgProps>;
  iconComponentColor?: ColorValue;
  uppercase?: boolean;
  fab?: boolean;
  noShadow?: boolean;
  isLoading?: boolean;
  outlined?: boolean;
  square?: boolean;
  expand?: boolean;
  color?: ColorValue;
};

const MyButton: React.FC<MyButtonProps & TouchableOpacityProps> = ({
  keyText,
  keyTextString,
  text,
  spaceBottom,
  spaceTop,
  disabled,
  nextScreen,
  icon,
  iconComponent,
  iconComponentColor,
  uppercase,
  fab,
  isLoading,
  noShadow,
  outlined,
  square,
  color,
  expand,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        !icon && componentStyle.MyButton,
        !disabled && !noShadow && !outlined && layoutStyle.shadow,
        disabled && componentStyle.MyButtonDisabled,
        spaceBottom && layoutStyle.mb5,
        spaceTop && layoutStyle.mt5,
        icon || iconComponent ? layoutStyle.iconContainer : null,
        fab && styles.borderMax,
        outlined && [layoutStyle.outlinedButton, {borderColor: color}],
        square && [layoutStyle.squareButton],
        expand && layoutStyle.w100,
        props.style,
      ]}
      disabled={disabled}
      onPress={
        props.onPress
          ? props.onPress
          : nextScreen
          ? () => {
              navigator.navigate(nextScreen);
            }
          : undefined
      }>
      {isLoading ? (
        <ActivityIndicator
          color={
            outlined
              ? themeStyle.accentPrimary.toString()
              : themeStyle.errorColor.toString()
          }
        />
      ) : icon ? (
        <MyIcon {...icon} />
      ) : iconComponent ? (
        React.createElement(iconComponent, {color: iconComponentColor})
      ) : (
        <MyText
          keyTextString={keyTextString}
          _subtitle
          style={[
            disabled && {color: componentStyle.MyButtonDisabled.color},
            {color: color || componentStyle.MyButton.color},
          ]}
          keyText={keyText}
          text={text}
          uppercase={uppercase}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = {
  borderMax: {borderRadius: 200},
};

export default MyButton;
