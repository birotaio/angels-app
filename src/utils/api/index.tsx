import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '@utils/constants';
import {Platform} from 'react-native';
import {useSdk, Sdk} from '@fifteen/sdk';

const KEY_CID = '@keycid';
const KEY_TKN = '@keytokn';
const KEY_RFH_TKN = '@keyRefreshtokn';

export const REQUEST_HEADERS = {
  xwwwformurlencoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
export const getCliendId = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_CID)) ?? '';
};
export const getToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_TKN)) ?? '';
};
export const getRefreshToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_RFH_TKN)) ?? '';
};

export const setLoginData = async (
  token: string,
  email?: string,
  refreshToken?: string,
): Promise<void> => {
  if (email) {
    await AsyncStorage.setItem(KEY_CID, email);
  }
  if (refreshToken) {
    await AsyncStorage.setItem(KEY_RFH_TKN, refreshToken);
  }

  return await AsyncStorage.setItem(KEY_TKN, token);
};

export const removeToken = async (): Promise<void> => {
  return await AsyncStorage.removeItem(KEY_TKN);
};

// callAPI2.api
//   .get('/bikes/{SerialNumber}', {
//     pathParameters: {SerialNumber: 113919},
//   })
//   .then(data => {
//     console.log(data.bike?.area_id);
//   });

// callAPI2.login('basic').then(({token, refreshToken}) => {});

// callAPI2.hook('token-refreshed', ({token}) => {
//   console.log(token);
// });

const fifteenSDK = async (): Promise<Sdk> => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSdk({
    baseURL: constants.API_URL,
    clientId:
      Platform.OS === 'android'
        ? constants.API_CLIENT_ID_ANDROID
        : constants.API_CLIENT_ID_IOS,
    token,
    refreshToken,
  });
};

export default fifteenSDK;
