import {takeLatest, put} from 'redux-saga/effects';
import {setMapState} from './reducer';
import {mapApi} from '@utils/api/calls/mapAPI';
import {getStationsApiResponseType} from '@utils/api/mapTypes';
import axios, {AxiosError} from 'axios';
import _ from 'lodash';
import {convertStationToFeature} from './utils';

export const MAP_ACTIONS_SAGA_GET_STATIONS = 'MAP_ACTIONS_SAGA_GET_STATIONS';

export function* _getStations() {
  yield put(setMapState({isLoading: true}));
  try {
    const result: getStationsApiResponseType = yield mapApi.getStations();
    const data = result?.data;

    if (data) {
      const stationsByKey = _.reduce(
        data.stations,
        (acc, {id, ...params}) => ({
          ...acc,
          [id]: convertStationToFeature({id, ...params}),
        }),
        {},
      );
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
