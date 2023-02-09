import {ApiResponse} from '@fifteen/sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fifteenSDK from '..';

const login = async (email: string, password: string) => {
  return (await fifteenSDK()).login('basic', {email, password});
};

// local storage login datas
const KEY_CID = '@keycid';
const KEY_TKN = '@keytokn';
const KEY_RFH_TKN = '@keyRefreshtokn';

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

export const removeLoginData = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEY_CID);
  await AsyncStorage.removeItem(KEY_RFH_TKN);
  return await AsyncStorage.removeItem(KEY_TKN);
};

// Get privileges
export type GetPrivilegeType = ApiResponse<'get', '/auth/privileges'>;
const getPrivileges = async () => {
  return (await fifteenSDK()).api.get('/auth/privileges');
};

export const authAPI = {login, getPrivileges};
