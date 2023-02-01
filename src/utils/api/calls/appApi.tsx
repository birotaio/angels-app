import {AxiosPromise} from 'axios';
import callAPI from '..';

const getBikeById = async (bikeId: number): Promise<AxiosPromise<any>> => {
  const api = await callAPI();
  return api.get(`bikes/${bikeId}`);
};

const setBikeLockById = async (
  bikeId: number,
  locked: boolean,
): Promise<AxiosPromise<any>> => {
  const api = await callAPI();
  return api.post(`bikes/${bikeId}/set_bike_info`, {
    bike_state_meta: {
      bike_state: {
        lock_state: locked ? 1 : 2,
      },
    },
  });
};

export const appApi = {getBikeById, setBikeLockById};
