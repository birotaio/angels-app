import {ApiResponse} from '@fifteen/sdk';
import fifteenSDK from '..';

export type GetStationType = ApiResponse<'get', '/stations'>;
const getStations = async () => {
  return (await fifteenSDK()).api.get('/stations', {
    params: {fields: 'location,label'},
  });
};

export const mapApi = {getStations};
