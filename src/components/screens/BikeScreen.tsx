import useTracking from '@navigation/useTracking';
import React, {useEffect, useState} from 'react';
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
  APP_ACTIONS_SAGA_DISCONNECT,
  APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
  APP_ACTIONS_SAGA_LOCK_BIKE,
  APP_ACTIONS_SAGA_REGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_SET_BIKE_BY_ID,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
  APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
} from '@logic/store/app/saga';
import {AppSelector} from '@logic/store/app/selector';
import MyView from '@components/generic/MyView';
import {BikeButton} from '@components/bikes/BikeButton';
import {BikeBleData, bikeDataListener} from '@utils/blemodule';

const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  const dispatch = useDispatch();
  const bike = useSelector(AppSelector.getBike);
  const isLocked = bike?.lock_info?.status === 1;
  const [bleLocked, setBikeLocked] = useState(isLocked);

  useTracking(BikeScreen.navigationName);

  // Get bike datas from backend + connect to our bike
  useEffect(() => {
    if (dispatch && bikeId) {
      console.log('dispatch && bikeId');
      dispatch({type: APP_ACTIONS_SAGA_REGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID, data: {bikeId}});
      dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE, data: {bikeId}});
      bikeDataListener.addListener(
        'BikeDataEvent',
        (bikeBleData: BikeBleData) => {
          console.log('BikeDataEvent', bikeBleData.locked);
          if (bikeBleData.locked !== bleLocked) {
            setBikeLocked(bikeBleData.locked);
          }
        },
      );
    }
    return () => {
      console.log('unmount dispatch && bikeId');
      dispatch({type: APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_DISCONNECT, data: {bikeId}});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bikeId]);

  useEffect(() => {
    console.log('call setBike');
    dispatch({
      type: APP_ACTIONS_SAGA_SET_BIKE_BY_ID,
      data: {bikeId, locked: bleLocked},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bleLocked]);

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
            onPress={() =>
              dispatch({
                type: isLocked
                  ? APP_ACTIONS_SAGA_UNLOCK_BIKE
                  : APP_ACTIONS_SAGA_LOCK_BIKE,
              })
            }
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
