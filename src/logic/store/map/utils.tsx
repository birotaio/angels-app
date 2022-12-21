import {Station} from '@utils/api/mapTypes';

const convertStationToFeature = (station: Station) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: station.location.coordinates,
  },
  properties: {
    ...station,
  },
});

export {convertStationToFeature};
