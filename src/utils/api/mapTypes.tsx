import {ApiDataType} from './types';

export type getStationApiInputType = {
  type: string;
  data: {};
};

export interface getStationsApiResponseType extends ApiDataType {
  data: {
    stacks: Station[];
    stations: Station[];
  };
}

export interface Station {
  id: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
  label: string;
}
