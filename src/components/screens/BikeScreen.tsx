import useTracking from '@navigation/useTracking';
import React, {useEffect, useState} from 'react';
import {EmitterSubscription, Platform, StyleSheet} from 'react-native';
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
  APP_ACTIONS_SAGA_UNLOCK_BATTERY,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
  APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_USE_BLE_DATA,
} from '@logic/store/app/saga';
import {AppSelector} from '@logic/store/app/selector';
import MyView from '@components/generic/MyView';
import {BikeButton} from '@components/bikes/BikeButton';
import {bikeDataListener} from '@utils/blemodule';
import navigator from '@navigation/navigator';
import {AuthSelector} from '@logic/store/auth/selector';
import {PRIVILEGES_TYPE} from '@logic/store/auth/utils';

const BIKE_LOCKED = 1;

const BikeScreen: ScreenProps = ({
  route: {
    params: {bikeId},
  },
}: {
  route: {params: {bikeId: number}};
}) => {
  const dispatch = useDispatch();
  const bike = useSelector(AppSelector.getBike);
  const privileges = useSelector(AuthSelector.getAngelBikePrivilege); // try selector with params
  const backLockedStatus = bike?.lock_info?.status;
  const [listener, setListener] = useState<EmitterSubscription | null>(null);
  useTracking(BikeScreen.navigationName);

  // Get bike datas from backend + connect to our bike
  useEffect(() => {
    if (dispatch && bikeId) {
      console.log('dispatch && bikeId');
      dispatch({type: APP_ACTIONS_SAGA_REGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID, data: {bikeId}});
      dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE, data: {bikeId}});
      const _listener = bikeDataListener.addListener(
        'BikeDataEvent',
        (bikeBleData: string) => {
          const data =
            Platform.OS === 'ios' ? JSON.parse(bikeBleData) : bikeBleData;
          dispatch({
            type: APP_ACTIONS_SAGA_USE_BLE_DATA,
            data: {bikeId, bleLockState: data.lockState},
          });
        },
      );
      setListener(_listener);
    }
    return () => {
      console.log('unmount dispatch && bikeId');
      listener?.remove();
      dispatch({type: APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_DISCONNECT, data: {bikeId}});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bikeId]);

  const isLockedFromBack = backLockedStatus === BIKE_LOCKED;
  return (
    <MyScreen noPadding style={layoutStyle.flex}>
      <MyStatusBar />
      <MyView flex p5>
        <MyText
          onPress={() => {
            navigator.pop();
          }}
          _color_secondary
          _title
          _style_bold
          style={[styles.text, layoutStyle.mb16]}
          keyText={'bike-sheet'}
        />
        <BikeCard bike={bike} />
        <MyView flex />
        {bike &&
          privileges.includes(
            PRIVILEGES_TYPE.ANGELS.privileges.BIKE.permissions.UNLOCK,
          ) && (
            <BikeButton
              keyText={
                isLockedFromBack ? 'bike-action-unlock' : 'bike-action-lock'
              }
              icon={isLockedFromBack ? 'Unlock' : 'Lock'}
              onPress={() =>
                dispatch({
                  type: isLockedFromBack
                    ? APP_ACTIONS_SAGA_UNLOCK_BIKE
                    : APP_ACTIONS_SAGA_LOCK_BIKE,
                })
              }
            />
          )}
        {bike &&
          privileges.includes(
            PRIVILEGES_TYPE.ANGELS.privileges.BIKE.permissions.UNLOCK,
          ) && (
            <BikeButton
              keyText={'bike-action-change-battery'}
              icon="BatterySmall"
              onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BATTERY})}
            />
          )}
        {/*
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
