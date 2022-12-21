import {Station} from '@utils/api/mapTypes';

export type StationFeature = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
  properties: Station;
};

export type StationFeatureCollection = {
  type: 'FeatureCollection';
  features: StationFeature[];
};
