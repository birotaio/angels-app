import layoutStyle from '@style/layoutStyle';
import React, {useEffect, useLayoutEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  APP_ACTIONS_SAGA_CONNECT_BIKE,
  APP_ACTIONS_SAGA_DISCONNECT,
  APP_ACTIONS_SAGA_GET_BIKE_DATAS,
  APP_ACTIONS_SAGA_LOCK_BIKE,
  // APP_ACTIONS_SAGA_REGISTER_BIKE_DATA,
  APP_ACTIONS_SAGA_SETUP_BLE,
  APP_ACTIONS_SAGA_UNLOCK_BATTERY,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
  // APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA,
} from '@logic/store/app/saga';
import {checkAndAskBluetoothPermission} from '@permissions/bluetooth';
import {bikeDataListener} from '@utils/blemodule';
// import {BikeData} from '@logic/store/app/types';

const TestBleScreen = () => {
  const bikeId = 113919;
  const dispatch = useDispatch();
  // const [listener, setListener] = useState<EmitterSubscription>();
  useEffect(() => {
    if (dispatch) {
      console.log('APP_ACTIONS_SAGA_SETUP_BLE', 'Listener init');
      dispatch({type: APP_ACTIONS_SAGA_SETUP_BLE});
      // const _listener =
      bikeDataListener.addListener('BikeDataEvent', data => {
        console.log('BikeDataEvent', data);
        // try {
        //   const _bikeData: BikeData = JSON.parse(data.bikeData);
        //   console.log(
        //     'BikeDataEvent',
        //     JSON.stringify(_bikeData.serialNumber),
        //   );
        // } catch (e) {
        //   console.log('BikeDataEvent error', e);
        // }
      });
      // setListener(_listener);
    }
    // Listen bike Data
  }, [dispatch]);
  useLayoutEffect(() => {
    return () => {
      // console.log('useLayoutEffect', 'Listener remove');
      // listener?.remove();
    };
  });
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
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_LOCK_BIKE})}>
        Lock
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BIKE})}>
        Unlock
      </Button>
      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNLOCK_BATTERY})}>
        Unlock batterry
      </Button>

      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_GET_BIKE_DATAS})}>
        Get Bike Datas
      </Button>

      {/* <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_REGISTER_BIKE_DATA})}>
        Register Bike datas
      </Button>

      <Button
        style={layoutStyle.mt16p}
        mode="contained"
        onPress={() => dispatch({type: APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA})}>
        Unregister Bike datas
      </Button> */}
    </View>
  );
};

TestBleScreen.navigationName = 'Test';
TestBleScreen.navigationOptions = {headerShown: true};

export {TestBleScreen};
