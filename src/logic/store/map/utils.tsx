import {ApiResponse} from '@fifteen/sdk';
import {StationFeature} from './types';

export type Station = ApiResponse<'get', '/stations/{Id}'>['station'];

const convertStationToFeature = (station: Station): StationFeature => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: station?.location?.coordinates ?? [],
    },
    properties: {
      ...station,
    },
  };
};

export {convertStationToFeature};
