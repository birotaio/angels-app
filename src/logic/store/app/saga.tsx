import {takeLatest, put} from 'redux-saga/effects';
import {setAppState} from './reducer';
import axios, {AxiosError} from 'axios';
import {appApi} from '@utils/api/calls/appApi';

export const APP_ACTIONS_SAGA_GET_BIKE_BY_ID =
  'APP_ACTIONS_SAGA_GET_BIKE_BY_ID';
export const APP_ACTIONS_SAGA_CONNECT_BIKE = 'APP_ACTIONS_SAGA_CONNECT_BIKE';
export const APP_ACTIONS_SAGA_UNLOCK_BIKE = 'APP_ACTIONS_SAGA_UNLOCK_BIKE';

export function* _getBikeById(payload) {
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

export function* _connectBike() {
  yield put(setAppState({isLoading: true}));
  console.log('TODO connect');
  yield put(setAppState({isLoading: false}));
}

export function* _unlockBike() {
  yield put(setAppState({isLoading: true}));
  console.log('TODO unlock');
  yield put(setAppState({isLoading: false}));
}

export default function* appSaga() {
  yield takeLatest(APP_ACTIONS_SAGA_GET_BIKE_BY_ID, _getBikeById);
  yield takeLatest(APP_ACTIONS_SAGA_CONNECT_BIKE, _connectBike);
  yield takeLatest(APP_ACTIONS_SAGA_UNLOCK_BIKE, _unlockBike);
}
