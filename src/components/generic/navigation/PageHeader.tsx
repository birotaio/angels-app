import {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyStatusBar from '../MyStatusBar';
import layoutStyle from '@style/layoutStyle';
import MyText from '../MyText';
import colors from '@style/colors';
import {FAB} from 'react-native-paper';
import navigator from '@navigation/navigator';
import textstyle from '@style/textStyle';

export interface HeaderProps extends NativeStackHeaderProps {
  options: NativeStackNavigationOptions & {backFn: () => void};
}

const PageHeader: React.FC<NativeStackHeaderProps> = ({options: {title}}) => {
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      <MyStatusBar barStyle={'default'} />
      {/* Menu */}
      <View
        style={[layoutStyle.rowCenter, layoutStyle.pv16, layoutStyle.ph10p]}>
        <FAB
          mode="flat"
          onPress={() => navigator.pop()}
          color={colors.BLACK}
          icon="close"
          style={styles.close}
        />
        <MyText
          style={[layoutStyle.ml24, textstyle.f32]}
          _title
          negColor
          text={title}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    alignSelf: 'flex-end',
    color: colors.BLACK,
    borderRadius: 16,
    elevation: 0,
    backgroundColor: colors.PRIMARY_LIGHT,
  },
});

export default PageHeader;
