import {StringMap} from '@interface/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOG_LEVEL} from '@utils/config/log';
import constants from '@utils/constants';
import message from '@utils/message';
import {AxiosInstance} from 'axios';

const axios = require('axios').default;
export const REQUEST_HEADERS = {
  xwwwformurlencoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(KEY_TKN);
};
export const setToken = async (token: string): Promise<void> => {
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
      Cookie: await getToken(),
    },
    withCredentials: false,
    validateStatus: function (status: number) {
      return (status >= 200 && status < 300) || status === 409; // default
    },
    transformResponse: (response: any) => {
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

      return response;
    },
  });
};

const KEY_TKN = '@keytokn';

export default callAPI;
