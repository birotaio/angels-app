import {AxiosPromise} from 'axios';
import callAPI from '..';
import {getStationsApiResponseType} from '../mapTypes';

const getStations = async (): Promise<
  AxiosPromise<getStationsApiResponseType>
> => {
  const api = await callAPI();
  return api.get('stations/', {
    params: {
      fields: 'location,label',
    },
  });
};

export const mapApi = {getStations};
