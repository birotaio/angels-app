import React from 'react';
import MyText from '@components/generic/MyText';
import layoutStyle from '@style/layoutStyle';
import MyView from '@components/generic/MyView';
import {Velo} from '@assets/svg';
import colors from '@style/colors';
import {ApiSchema} from '@fifteen/sdk';
import {StyleSheet, View} from 'react-native';
import {getBikeStatusDisplay} from '@utils/fifteen/bike';

const iconParams = {
  height: 24,
  width: 24,
  fill: colors.BLACK,
};
export const BikeCard = ({bike}: {bike: ApiSchema['bike.Bike']}) => {
  const bikeDisplay = getBikeStatusDisplay(bike);

  return (
    bike && (
      <View style={styles.card}>
        <MyView style={layoutStyle.aic} p24>
          <Velo fill={colors.BLACK} />
          <MyText _color_primary _title _style_bold>
            {bike.serial_number}
          </MyText>
        </MyView>
        <MyView flex p24 style={layoutStyle.jsb}>
          <MyView rowCenter>
            <bikeDisplay.statusIcon {...iconParams} />
            <MyText
              style={[layoutStyle.ml12]}
              _subtitle
              negColor
              keyText={bikeDisplay.status}
            />
          </MyView>
          <MyView rowCenter>
            <bikeDisplay.lockIcon {...iconParams} />
            <MyText
              style={[layoutStyle.ml12]}
              _subtitle
              negColor
              keyText={bikeDisplay?.lockStatus}
            />
          </MyView>
          <MyView rowCenter>
            <bikeDisplay.batteryIcon {...iconParams} />
            <MyText style={[layoutStyle.ml12]} _subtitle negColor>
              {bikeDisplay.batteryLevel}
            </MyText>
          </MyView>
        </MyView>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.NEUTRAL_LIGHT_02,
    borderColor: colors.NEUTRAL_LIGHT_03,
    borderWidth: 1,
    borderRadius: 24,
  },
});
