import {AxiosPromise} from 'axios';
import callAPI from '..';

const getBikeById = async (bikeId: number): Promise<AxiosPromise<any>> => {
  const api = await callAPI();
  return api.get(`bikes/${bikeId}`);
};

const setBikeLockById = async (
  bikeId: number,
  lockState: number,
): Promise<AxiosPromise<any>> => {
  const api = await callAPI();
  return api.post(`bikes/${bikeId}/set_lock_info`, {
    lock_info: {
      status: lockState,
    },
    sn: bikeId,
  });
};

export const appApi = {getBikeById, setBikeLockById};
