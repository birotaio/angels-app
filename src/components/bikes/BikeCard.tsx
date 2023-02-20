import React from 'react';
import MyText from '@components/generic/MyText';
import layoutStyle from '@style/layoutStyle';
import MyView from '@components/generic/MyView';
import {Lock, Power, Station, Unlock, Velo} from '@assets/svg';
import colors from '@style/colors';
import {ApiSchema} from '@fifteen/sdk';
import {StyleSheet, View} from 'react-native';

const iconParams = {
  height: 24,
  width: 24,
  fill: colors.BLACK,
};
export const BikeCard = ({bike}: {bike: ApiSchema['bike.Bike']}) => {
  const isLocked = bike?.lock_info?.status === 1;
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
            <Station {...iconParams} />
            <MyText
              style={[layoutStyle.ml12]}
              _subtitle
              negColor
              keyText="bike-station"
            />
          </MyView>
          <MyView rowCenter>
            {isLocked ? <Lock {...iconParams} /> : <Unlock {...iconParams} />}
            <MyText
              style={[layoutStyle.ml12]}
              _subtitle
              negColor
              keyText={isLocked ? 'bike-lock' : 'bike-unlock'}
            />
          </MyView>
          <MyView rowCenter>
            <Power {...iconParams} />
            <MyText style={[layoutStyle.ml12]} _subtitle negColor>{`${
              bike.battery_community?.state_of_charge ?? 0
            }%`}</MyText>
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
