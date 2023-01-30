import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setAppState} from './reducer';
import axios, {AxiosError} from 'axios';
import {appApi} from '@utils/api/calls/appApi';
import {getRefreshToken, getToken} from '@utils/api';
import BleModule, {BLE_MODULE_UNLOCK_TIMEOUT} from '@utils/blemodule';
import constants from '@utils/constants';
import {checkAndAskBluetoothPermission} from '@permissions/bluetooth';
import message from '@utils/message';
import navigator from '@navigation/navigator';
import {ScanScreen} from '@components/screens';
import {BikeData} from './types';

export const APP_ACTIONS_SAGA_GET_BIKE_BY_ID =
  'APP_ACTIONS_SAGA_GET_BIKE_BY_ID';
export const APP_ACTIONS_SAGA_CHECK_PERMISSIONS_AND_SCAN =
  'APP_ACTIONS_SAGA_CHECK_PERMISSIONS_AND_SCAN';
export const APP_ACTIONS_SAGA_SETUP_BLE = 'APP_ACTIONS_SAGA_SETUP_BLE';
export const APP_ACTIONS_SAGA_CONNECT_BIKE = 'APP_ACTIONS_SAGA_CONNECT_BIKE';
export const APP_ACTIONS_SAGA_DISCONNECT = 'APP_ACTIONS_SAGA_DISCONNECT';
export const APP_ACTIONS_SAGA_UNLOCK_BIKE = 'APP_ACTIONS_SAGA_UNLOCK_BIKE';
export const APP_ACTIONS_SAGA_LOCK_BIKE = 'APP_ACTIONS_SAGA_LOCK_BIKE';
export const APP_ACTIONS_SAGA_REGISTER_BIKE_DATA =
  'APP_ACTIONS_SAGA_REGISTER_BIKE_DATA';
export const APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA =
  'APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA';
export const APP_ACTIONS_SAGA_GET_BIKE_DATAS =
  'APP_ACTIONS_SAGA_GET_BIKE_DATAS';
export const APP_ACTIONS_SAGA_UNLOCK_BATTERY =
  'APP_ACTIONS_SAGA_UNLOCK_BATTERY';

export function* _getBikeById(payload: {data: {bikeId: number}}) {
  const {bikeId} = payload?.data;
  yield put(setAppState({isLoading: true}));
  try {
    const result: any = yield appApi.getBikeById(bikeId);
    const data = result?.data;

    if (data) {
      yield put(setAppState({bike: data.bike, isLoading: false}));
    } else {
      yield put(setAppState({isLoading: false}));
      setAppState({isLoading: false, error: '_getBikeById error'});
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e: AxiosError = error;
      setAppState({isLoading: false, error: e.toJSON()});
    } else {
      setAppState({isLoading: false, error: '_getBikeById error'});
    }
  }
}

export function* _setUp() {
  yield put(setAppState({isLoading: true}));
  const token: string = yield getToken();
  const refreshToken: string = yield getRefreshToken();
  console.log('_initBle data ok ?', token !== null, refreshToken !== null);
  BleModule.setUp(constants.API_URL, token, refreshToken);
  yield put(setAppState({isLoading: false}));
}
export function* _checkPermissionAndScan() {
  // navigator.navigate(ScanScreen.navigationName);
  const status: boolean = yield call(checkAndAskBluetoothPermission, true);
  console.log('_setUpAppPermissions', status);
  // TODO send to manual entry if no permission
  if (status) {
    navigator.navigate(ScanScreen.navigationName);
  } else {
    message.showError('scan-need-permission');
  }
}

export function* _connectBike(payload: {data: {bikeId: number}}) {
  const {bikeId} = payload?.data;
  console.log('_connectBike', bikeId);

  yield put(setAppState({isLoading: true}));
  try {
    const _result: number = yield BleModule.connect(bikeId);
    console.log('_connectBike', 'success : ' + _result);
  } catch (e) {
    console.log('_connectBike', 'failure : ' + e);
  }
  yield put(setAppState({isLoading: false}));
}

export function* _disconnect() {
  yield put(setAppState({isLoading: true}));
  console.log('_disconnect');
  BleModule.disconnect();
  yield put(setAppState({isLoading: false}));
}

export function* _unlockBike() {
  yield put(setAppState({isLoading: true}));
  try {
    const _result: number = yield BleModule.unlockBike(
      BLE_MODULE_UNLOCK_TIMEOUT,
    );
    console.log('_unlockBike', 'success : ' + _result);
  } catch (e) {
    console.log('_unlockBike', 'failure : ' + e);
  }
  // fetch new bike data
  const state = yield select();
  yield put({
    type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
    data: {bikeId: state.app?.bike?.serial_number},
  });
}

export function* _lockBike() {
  yield put(setAppState({isLoading: true}));
  try {
    const _result: number = yield BleModule.lockBike();
    console.log('_lockBike', 'success : ' + _result);
  } catch (e) {
    console.log('_lockBike', 'failure : ' + e);
  }
  yield put(setAppState({isLoading: false}));
  // fetch new bike data
  const state = yield select();
  yield put({
    type: APP_ACTIONS_SAGA_GET_BIKE_BY_ID,
    data: {bikeId: state.app?.bike?.serial_number},
  });
}

export function* _unlockBattery() {
  yield put(setAppState({isLoading: true}));
  try {
    const _result: number = yield BleModule.unlockBattery();
    console.log('_unlockBattery', 'success : ' + _result);
  } catch (e) {
    console.log('_unlockBattery', 'failure : ' + e);
  }
  yield put(setAppState({isLoading: false}));
}

export function* _getBikeDatas() {
  yield put(setAppState({isLoading: true}));
  try {
    const _result: string = yield BleModule.getBikeData();
    try {
      const bikeData: BikeData = yield JSON.parse(_result);
      yield put(setAppState({isLoading: false, bikeData}));
    } catch (e) {
      console.log('_getBikeDatas', 'parse JSON failure : ' + e);
    }

    // console.log('_getBikeDatas', 'success : ' + _result);
  } catch (e) {
    console.log('_getBikeDatas', 'failure : ' + e);
  }
  yield put(setAppState({isLoading: false}));
}

export function* _registerBikeDatas() {
  yield put(setAppState({isLoading: true}));
  yield BleModule.addEventListener();
  yield put(setAppState({isLoading: false}));
}

export function* _unregisterBikeDatas() {
  yield put(setAppState({isLoading: true}));
  yield BleModule.removeEventListener();
  yield put(setAppState({isLoading: false}));
}

export default function* appSaga() {
  yield takeLatest(APP_ACTIONS_SAGA_GET_BIKE_BY_ID, _getBikeById);
  yield takeLatest(
    APP_ACTIONS_SAGA_CHECK_PERMISSIONS_AND_SCAN,
    _checkPermissionAndScan,
  );
  yield takeLatest(APP_ACTIONS_SAGA_SETUP_BLE, _setUp);
  yield takeLatest(APP_ACTIONS_SAGA_CONNECT_BIKE, _connectBike);
  yield takeLatest(APP_ACTIONS_SAGA_DISCONNECT, _disconnect);
  yield takeLatest(APP_ACTIONS_SAGA_LOCK_BIKE, _lockBike);
  yield takeLatest(APP_ACTIONS_SAGA_UNLOCK_BIKE, _unlockBike);
  yield takeLatest(APP_ACTIONS_SAGA_UNLOCK_BATTERY, _unlockBattery);
  yield takeLatest(APP_ACTIONS_SAGA_GET_BIKE_DATAS, _getBikeDatas);
  yield takeLatest(APP_ACTIONS_SAGA_REGISTER_BIKE_DATA, _registerBikeDatas);
  yield takeLatest(APP_ACTIONS_SAGA_UNREGISTER_BIKE_DATA, _unregisterBikeDatas);
}
