import layoutStyle from '@style/layoutStyle';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EmitterSubscription, Platform, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  APP_ACTIONS_SAGA_CONNECT_BIKE,
  APP_ACTIONS_SAGA_DISCONNECT,
  APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
  APP_ACTIONS_SAGA_LOCK_BIKE,
  APP_ACTIONS_SAGA_REGISTER_BIKE_DATA,
  // APP_ACTIONS_SAGA_REGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_SETUP_BLE,
  // APP_ACTIONS_SAGA_UNLOCK_BATTERY,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
  APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_USE_BLE_DATA,
  // APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
} from '@logic/store/app/saga';
import {checkAndAskBluetoothPermission} from '@permissions/bluetooth';
import {bikeDataListener} from '@utils/blemodule';
import NativeSplashScreen from 'react-native-splash-screen';
import {BikeModal, BikeModalType} from '@components/bikes/BikeModal';
import {AppSelector} from '@logic/store/app/selector';

const TestBleScreen = () => {
  NativeSplashScreen.hide();
  const bikeId = 113919;
  const appData = useSelector(AppSelector.getApp);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [bikeModalData, setBikeModalData] = useState<BikeModalType | null>(
    null,
  );
  const [listener, setListener] = useState<EmitterSubscription | null>(null);
  useEffect(() => {
    if (dispatch) {
      console.log('APP_ACTIONS_SAGA_SETUP_BLE', 'Listener init');
      dispatch({type: APP_ACTIONS_SAGA_REGISTER_BIKE_DATA});
      dispatch({type: APP_ACTIONS_SAGA_SETUP_BLE});
      dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE, data: {bikeId}});
      dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID, data: {bikeId}});
      const _listener = bikeDataListener.addListener(
        'BikeDataEvent',
        bikeBleData => {
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
    // Listen bike Data
    return () => {
      console.log('dispatch unmount');
      listener?.remove();
      dispatch({type: APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <View style={layoutStyle.flexCenter}>
      <Text>TestBleScreen</Text>
      <Text>BikeId : 113919</Text>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={async () => {
          const status = await checkAndAskBluetoothPermission(true);
          console.log('checkAndAskBluetoothPermission', status);
        }}>
        Permission
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() =>
          dispatch({type: APP_ACTIONS_SAGA_CONNECT_BIKE, data: {bikeId}})
        }>
        Connect
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_DISCONNECT})}>
        Disconnect
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => {
          setBikeModalData({
            description: 'bike-lock',
            title: 'bike-action-lock',
            image: 'BatterySmall',
            button1: {
              text: 'validate',
              action: () => {
                setShowModal(false);
              },
            },
            isLoadingSelector: AppSelector.getDataProcessed,
            successCondition: (data: any) =>
              data?.bike?.lock_info?.status === 1,
            failureCondition: (data: any) =>
              data?.bike?.lock_info?.status === 2,
          });
          dispatch({type: APP_ACTIONS_SAGA_LOCK_BIKE});
          setShowModal(true);
        }}>
        Lock
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => {
          setBikeModalData({
            description: 'bike-unlock',
            title: 'bike-action-unlock',
            image: 'BatterySmall',
            button1: {
              text: 'validate',
              action: () => {
                setShowModal(false);
              },
            },
            isLoadingSelector: AppSelector.getDataProcessed,
            successCondition: (data: any) =>
              data?.bike?.lock_info?.status === 2,
            failureCondition: (data: any) =>
              data?.bike?.lock_info?.status === 1,
          });
          dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BIKE});
          setShowModal(true);
        }}>
        Unlock
      </Button>
      {/* <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BATTERY})}>
        Unlock batterry
      </Button> */}

      {bikeModalData && (
        <BikeModal
          show={showModal}
          data={appData}
          bikeModalData={bikeModalData}
          onClose={() => setShowModal(false)}
        />
      )}
    </View>
  );
};

TestBleScreen.navigationName = 'Test';
TestBleScreen.navigationOptions = {headerShown: true};

export {TestBleScreen};
