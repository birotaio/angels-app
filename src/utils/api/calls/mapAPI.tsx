import {AxiosPromise} from 'axios';
import callAPI from '..';
import {getStationsApiResponseType} from '../mapTypes';

const getStations = async (): Promise<
  AxiosPromise<getStationsApiResponseType>
> => {
  const api = await callAPI();
  return api.get('stations/?fields=location%2Clabel', {});
};

export const mapApi = {getStations};
