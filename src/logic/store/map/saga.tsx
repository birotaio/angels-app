import {takeLatest, put} from 'redux-saga/effects';
import {setMapState} from './reducer';
import {GetStationType, mapApi} from '@utils/api/calls/mapAPI';
import axios, {AxiosError} from 'axios';
import {convertStationToFeature} from './utils';
import {StationFeature} from './types';

export const MAP_ACTIONS_SAGA_GET_STATIONS = 'MAP_ACTIONS_SAGA_GET_STATIONS';

export function* _getStations() {
  yield put(setMapState({isLoading: true}));
  try {
    const data: GetStationType = yield mapApi.getStations();

    if (data?.stations?.length) {
      const stationsByKey: Record<string, StationFeature> = {};
      data.stations?.forEach(_s => {
        if (_s.id && _s.location?.coordinates?.length) {
          stationsByKey[_s.id] = convertStationToFeature(_s);
        }
      });
      console.log('stationsByKey');
      yield put(setMapState({stations: stationsByKey, isLoading: false}));
    } else {
      yield put(setMapState({isLoading: false}));
      setMapState({isLoading: false, error: '_getStations error'});
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e: AxiosError = error;

      setMapState({isLoading: false, error: e.toJSON()});
    } else {
      setMapState({isLoading: false, error: '_getStations error'});
    }
  }
}

export default function* authSaga() {
  yield takeLatest(MAP_ACTIONS_SAGA_GET_STATIONS, _getStations);
}
