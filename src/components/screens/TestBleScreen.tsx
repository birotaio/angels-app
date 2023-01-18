import layoutStyle from '@style/layoutStyle';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  APP_ACTIONS_SAGA_CONNECT_BIKE,
  APP_ACTIONS_SAGA_DISCONNECT,
  APP_ACTIONS_SAGA_LOCK_BIKE,
  APP_ACTIONS_SAGA_SETUP_BLE,
  APP_ACTIONS_SAGA_UNLOCK_BATTERY,
  APP_ACTIONS_SAGA_UNLOCK_BIKE,
} from '@logic/store/app/saga';

const TestBleScreen = () => {
  const bikeId = 113919;
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch) {
      dispatch({type: APP_ACTIONS_SAGA_SETUP_BLE});
    }
  }, [dispatch]);
  return (
    <View style={layoutStyle.flexCenter}>
      <Text>TestBleScreen</Text>
      <Text>BikeId : 113919</Text>
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
    </View>
  );
};

TestBleScreen.navigationName = 'Test';
TestBleScreen.navigationOptions = {headerShown: true};

export {TestBleScreen};
