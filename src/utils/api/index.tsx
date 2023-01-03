import {StringMap} from '@interface/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOG_LEVEL} from '@utils/config/log';
import constants from '@utils/constants';
import message from '@utils/message';
import axios, {AxiosInstance} from 'axios';
import {authAPI} from './calls/authAPI';

const KEY_CID = '@keycid';
const KEY_TKN = '@keytokn';
const KEY_RFH_TKN = '@keyRefreshtokn';
const REFRESH_TOKEN_CODE = 3003;

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

const callAPI = async (
  headers: StringMap = {},
  url?: string,
): Promise<AxiosInstance> => {
  return axios.create({
    baseURL: url || constants.API_URL,
    timeout: 7000,
    headers: {
      ...headers,
      'X-Zoov-ClientId': constants.API_CLIENT_ID,
      'X-ApiKey': constants.API_KEY,
      Cookie: await getToken(),
    },
    withCredentials: false,
    validateStatus: (status: number) => {
      if (LOG_LEVEL.API) {
        console.log('API CALL STATUS', status);
      }
      return (status >= 200 && status < 300) || status === 409; // default
    },
    transformResponse: response => {
      if (typeof response === 'string') {
        try {
          response = JSON.parse(response);
        } catch (e) {
          console.log('APIerror', 'bad json response', response);
        }
      }
      if (LOG_LEVEL.API) {
        console.log('API CALL RESPONSE', response);
      }
      if (response?.error) {
        message.show(response?.error);
      }

      // Add interceptor for REFRESH_TOKEN_CODE case
      if (response?.code === REFRESH_TOKEN_CODE) {
        authAPI.refreshToken();
      }

      return response;
    },
  });
};

export default callAPI;
