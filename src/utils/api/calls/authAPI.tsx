import {ApiResponse} from '@fifteen/sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fifteenSDK from '..';

// local storage login datas
const KEY_CID = '@keycid';
const KEY_TKN = '@keytokn';
const KEY_RFH_TKN = '@keyRefreshtokn';

/**
 * getCliendId
 * @returns clientId : email from user
 */
export const getCliendId = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_CID)) ?? '';
};
/**
 * getToken
 * @returns token : token for api request
 */
export const getToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_TKN)) ?? '';
};
/**
 * getRefreshToken
 * @returns refreshToken : used to refresh our api token
 */
export const getRefreshToken = async (): Promise<string> => {
  return (await AsyncStorage.getItem(KEY_RFH_TKN)) ?? '';
};
/**
 * setLoginData
 * @param token : api Token
 * @param email : user email
 * @param refreshToken : refreshToken
 * @returns Promise<void> on token writing
 */
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
/**
 * removeLoginData :
 * remove data from storage
 * @returns Promise<void>
 */
export const removeLoginData = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEY_CID);
  await AsyncStorage.removeItem(KEY_RFH_TKN);
  return await AsyncStorage.removeItem(KEY_TKN);
};

// Login
const login = async (email: string, password: string) => {
  return (await fifteenSDK()).auth.login('basic', {email, password});
};
const refreshToken = async () => {
  return (await fifteenSDK()).auth.refresh();
};

// Get privileges
export type GetPrivilegeType = ApiResponse<'get', '/auth/privileges'>;
const getPrivileges = async () => {
  return (await fifteenSDK()).api.get('/auth/privileges');
};

export const authAPI = {login, refreshToken, getPrivileges};
