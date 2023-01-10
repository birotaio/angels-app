import layoutStyle from '@style/layoutStyle';
import themeStyle from '@style/themeStyle';
import React from 'react';
import {View, ViewProps} from 'react-native';

export type MyViewProps = {
  noPadding?: boolean;
  card?: boolean;
  // Layout
  row?: boolean;
  rowCenter?: boolean;
  flex?: boolean;
  flexCenter?: boolean;
  center?: boolean;
  shadow?: boolean;
  absFill?: boolean;
  abs?: boolean;
  absBot?: boolean;
  absTop?: boolean;
  absRightTop?: boolean;
  // Sizes
  p5?: boolean;
  ph5?: boolean;
  pv5?: boolean;
  pb5?: boolean;
  pt5?: boolean;
  // Colors
  bg0?: boolean;
  bg1?: boolean;
  bg2?: boolean;
  backgroundAccentPrimary?: boolean;
};

const MyView: React.FC<ViewProps & MyViewProps> = ({
  row,
  rowCenter,
  card,
  backgroundAccentPrimary,
  style,
  flex,
  flexCenter,
  center,
  shadow,
  absFill,
  abs,
  absBot,
  absTop,
  absRightTop,
  p5,
  pt5,
  ph5,
  pv5,
  pb5,
  ...props
}) => {
  return (
    <View
      style={[
        backgroundAccentPrimary && {backgroundColor: themeStyle.accentPrimary},
        row && layoutStyle.row,
        rowCenter && layoutStyle.rowCenter,
        flex && layoutStyle.flex,
        flexCenter && layoutStyle.flexCenter,
        center && layoutStyle.center,
        shadow && layoutStyle.shadow,
        absFill && layoutStyle.absFill,
        abs && layoutStyle.abs,
        absBot && layoutStyle.absBot,
        absTop && layoutStyle.absTop,
        absRightTop && layoutStyle.absTopRight,
        p5 && layoutStyle.p5,
        ph5 && layoutStyle.ph5,
        pv5 && layoutStyle.pv5,
        pt5 && layoutStyle.pt5,
        pb5 && layoutStyle.pb5,
        card && layoutStyle.screenCard,
        style,
      ]}
      {...props}>
      {props.children}
    </View>
  );
};

export default MyView;
