import layoutStyle from '@style/layoutStyle';
import textstyle from '@style/textStyle';
import themeStyle from '@style/themeStyle';
import React, {useState} from 'react';
import MyText from './MyText';
import {TextInput} from 'react-native-paper';
import {TextInputProps, TextStyle, View, ViewStyle} from 'react-native';
import TextLink from '@components/generic/TextLink';
import {TranslateKeyProps} from '@assets/locales/locale';
import {DeepPartial} from '@interface/index';
import componentStyle from '@style/componentStyle';

export type MyInputTypeProps = TextInputProps & {
  label?: string;
  error?: string;
  link?: {
    action: () => void;
    keyText: TranslateKeyProps;
    style?: TextStyle;
    containerStyle?: ViewStyle;
    disabled?: boolean;
  };
  theme?: DeepPartial<ReactNativePaper.Theme>;
};
const MyTextInput: React.FC<MyInputTypeProps> = ({
  error,
  secureTextEntry,
  link,
  style,
  theme,
  ...props
}) => {
  const [visible, setVisible] = useState(!secureTextEntry);
  const _err = error && error?.length > 0;
  return (
    <View style={layoutStyle.mb4p}>
      <TextInput
        {...props}
        selectionColor={themeStyle.textColorInput.toString()}
        dense
        style={[componentStyle.myTextInput, style]}
        placeholderTextColor={themeStyle.placeholderTextColor}
        mode="outlined"
        activeOutlineColor={themeStyle.placeholderTextColor.toString()}
        outlineColor={
          !_err
            ? themeStyle.borderLineColor.toString()
            : themeStyle.errorColor.toString()
        }
        label={props.label}
        secureTextEntry={!visible}
        right={
          secureTextEntry && (
            <TextInput.Icon
              size={24}
              style={layoutStyle.mt16p}
              color={themeStyle.textColorInput.toString()}
              name={visible ? 'eye-off' : 'eye'}
              onPress={() => setVisible(!visible)}
            />
          )
        }
        autoCorrect={false}
        theme={{...theme}}
      />
      {error && (
        <MyText
          style={[
            layoutStyle.ass,
            styles.spacer,
            layoutStyle.mh5,
            textstyle.error,
          ]}
          text={error || ' '}
        />
      )}
      {!link && !error && <View style={styles.spacer} />}
      {link && (
        <TextLink
          textStyle={link.style || textstyle._caption}
          style={{...layoutStyle.mh5, ...styles.spacer, ...link.containerStyle}}
          keyTextLink={link.keyText}
          onPress={link.action}
        />
      )}
      {link && !error && <View style={styles.spacer} />}
    </View>
  );
};
const styles = {
  spacer: {height: 18},
};

export default MyTextInput;
