import {TranslateKeyProps} from '@assets/locales/locale';
import Lottie from 'lottie-react-native';
import navigator from '@navigation/navigator';
import componentStyle from '@style/componentStyle';
import layoutStyle from '@style/layoutStyle';
import React, {FunctionComponent} from 'react';
import {
  ColorValue,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import MyIcon, {MyIconProps} from './MyIcon';
import MyText from './MyText';
import lottie from '@assets/lottie';

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
        !isLoading && layoutStyle.pv16,
        props.style,
        disabled && componentStyle.MyButtonDisabled,
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
        <Lottie
          style={styles.loader}
          autoSize
          source={lottie.buttonLoader}
          autoPlay
          loop
        />
      ) : icon ? (
        <MyIcon {...icon} />
      ) : iconComponent ? (
        React.createElement(iconComponent, {color: iconComponentColor})
      ) : (
        <MyText
          keyTextString={keyTextString}
          _button_label_giant
          style={[
            disabled && {color: componentStyle.MyButtonDisabled.color},
            {
              color: color || componentStyle.MyButton.color,
            },
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
  loader: {width: 52, height: 52},
};

export default MyButton;
