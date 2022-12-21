import {ApiDataType} from './types';

type GbfsDataType = ApiDataType & {
  last_updated?: number;
  version?: number;
  ttl?: number;
};

export type Station = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: number[];
  };
  properties: StationStatusInformation & StationStatus;
};

export type StationStatus = {
  station_id?: string;
  bikeStatus?: BikeStatus[];
  num_bikes_available?: number;
  vehicle_types_available?: {vehicle_type_id?: string; count?: number}[];
  num_bikes_disabled?: number | null;
  num_docks_available?: number;
  vehicle_docks_available?: {vehicle_type_ids?: string[]; count?: number}[];
  is_installed?: boolean;
  is_renting?: boolean;
  is_charging_station?: boolean;
  is_returning?: boolean;
  last_reported?: number;
  // processed data
  ebikes: number;
  bikes: number;
  total_bikes: number;
};
export type BikeStatus = {
  dock_id: number;
  current_range_meters: number;
  bike_id: string;
  is_reserved: boolean;
  is_disabled: boolean;
  vehicle_type_id: string;
  last_reported: number;
  station_id: string;
  // add
  isEbike: boolean;
};

export interface StationStatusDataType extends GbfsDataType {
  data: {
    data: {
      stations: StationStatus[];
    };
  };
}

export interface BikeDataType extends GbfsDataType {
  data: {
    data: {
      bikes: BikeStatus[];
    };
  };
}

export type StationStatusInformation = {
  station_id?: string;
  name?: string;
  lat?: number;
  lon?: number;
  capacity?: number;
  vehicle_type_capacity?: {'1': number; '2': number};
  is_charging_station?: boolean;
  // Mapbox
  type?: string;
  coordinates?: number[];
  status?: string;
};

export interface StationInformationDataType extends GbfsDataType {
  data: {
    data: {
      stations: StationStatusInformation[];
    };
  };
}
