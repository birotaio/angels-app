import {StationFeature, StationFeatureCollection} from './types';

const getStations = ({
  map,
}: {
  map: {stations: {[key: string]: StationFeature}};
}): StationFeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: map.stations && Object.values(map.stations),
  };
};

export const MapSelector = {
  getStations,
};
