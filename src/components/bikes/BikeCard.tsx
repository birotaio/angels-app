import React from 'react';
import MyText from '@components/generic/MyText';
import layoutStyle from '@style/layoutStyle';
import MyView from '@components/generic/MyView';
import themeStyle from '@style/themeStyle';
import {Lock, Power, Station, Velo} from '@assets/svg';

export const BikeCard = ({bike}) =>
  bike && (
    <MyView
      style={[
        layoutStyle.row,
        layoutStyle.screenCard,
        {backgroundColor: themeStyle.gray},
      ]}>
      <MyView p12>
        <Velo />
        <MyText _color_primary _title _style_bold>
          {bike.serial_number}
        </MyText>
      </MyView>
      <MyView flex p24>
        <MyView rowCenter>
          <Station height={20} width={20} />
          <MyText
            style={layoutStyle.ml12}
            _title
            negColor
            keyText="bike-station"
          />
        </MyView>
        <MyView rowCenter>
          <Lock height={20} width={20} />
          <MyText
            style={layoutStyle.ml12}
            _title
            negColor
            keyText="bike-lock"
          />
        </MyView>
        <MyView rowCenter>
          <Power height={20} width={20} />
          <MyText style={layoutStyle.ml12} _title negColor>{`${
            bike.battery_community?.state_of_charge ?? 0
          }%`}</MyText>
        </MyView>
      </MyView>
    </MyView>
  );
