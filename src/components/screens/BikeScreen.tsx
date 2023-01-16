import useTracking from '@navigation/useTracking';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {ScreenProps} from '.';

import layoutStyle from '@style/layoutStyle';
import MyScreen from '@components/generic/MyScreen';
import MyText from '@components/generic/MyText';
import MyStatusBar from '@components/generic/MyStatusBar';
import {BikeCard} from '@components/bikes/BikeCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  APP_ACTIONS_SAGA_CONNECT_BIKE,
  APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
} from '@logic/store/app/saga';
import {AppSelector} from '@logic/store/app/selector';
import MyView from '@components/generic/MyView';
import {BikeButton} from '@components/bikes/BikeButton';
const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  const dispatch = useDispatch();
  const bike = useSelector(AppSelector.getBike);

  useTracking(BikeScreen.navigationName);
  // Get bike Infos
  useEffect(() => {
    if (dispatch && bikeId) {
      dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID, data: {bikeId}});
      dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE});
    }
  }, [dispatch, bikeId]);
  const isLocked = bike?.lock_info?.status === 1;
  return (
    <MyScreen noPadding style={layoutStyle.flex}>
      <MyStatusBar />
      <MyView flex p5>
        <MyText
          _color_secondary
          _title
          _style_bold
          style={[styles.text, layoutStyle.mb16]}
          keyText={'bike-sheet'}
        />
        <BikeCard bike={bike} />
        <MyView flex />
        {bike && (
          <BikeButton
            keyText={isLocked ? 'bike-action-unlock' : 'bike-action-lock'}
            icon={isLocked ? 'Unlock' : 'Lock'}
            onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BIKE})}
          />
        )}
        {/* <BikeButton
          keyText={'bike-action-change-battery'}
          icon="BatterySmall"
        />
        <BikeButton keyText={'bike-action-signal-problem'} icon="Checklist" />
        <BikeButton keyText={'bike-action-pickup'} icon="Pickup" /> */}
      </MyView>
    </MyScreen>
  );
};

BikeScreen.navigationName = 'Bike';
BikeScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  text: {},
});

export {BikeScreen};
