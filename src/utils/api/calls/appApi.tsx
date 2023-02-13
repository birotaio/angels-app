import {ApiResponse} from '@fifteen/sdk';
import fifteenSDK from '..';

export type GetBike = ApiResponse<'get', '/bikes/{SerialNumber}'>['bike'];
export type GetBikeBySNResponseType = ApiResponse<
  'get',
  '/bikes/{SerialNumber}'
>;
const getBikeBySN = async (serialNumber: number) => {
  return (await fifteenSDK()).api.get('/bikes/{SerialNumber}', {
    pathParameters: {
      SerialNumber: serialNumber,
    },
  });
};

const setBikeLockBySN = async (serialNumber: number, lockStatus: number) => {
  if (serialNumber && lockStatus) {
    return (await fifteenSDK()).api.post(
      '/bikes/{SerialNumber}/set_bike_info',
      {
        pathParameters: {
          SerialNumber: serialNumber,
        },
        body: {
          locked: lockStatus === 1,
        },
      },
    );
  }
};

export const appApi = {getBikeBySN, setBikeLockBySN};
