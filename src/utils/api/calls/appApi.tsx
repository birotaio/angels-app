import {AxiosPromise} from 'axios';
import callAPI from '..';

const getBikeById = async (bikeId: number): Promise<AxiosPromise<any>> => {
  const api = await callAPI();
  return api.get(`bikes/${bikeId}`);
};

export const appApi = {getBikeById};
