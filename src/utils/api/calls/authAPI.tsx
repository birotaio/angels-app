import message from '@utils/message';
import {AxiosPromise} from 'axios';
import callAPI, {getCliendId, getRefreshToken, setLoginData} from '..';
import {LoginApiResponseType} from '../types';

const login = async (
  email: string,
  password: string,
): Promise<AxiosPromise<LoginApiResponseType>> => {
  const api = await callAPI();
  return api.post('auth/login?grant_type=basic', {
    email,
    password,
  });
};

const refreshToken = async () => {
  const api = await callAPI();
  const response: LoginApiResponseType = await api.post('auth/refresh_token', {
    client_id: await getCliendId(),
    refresh_token: await getRefreshToken(),
  });
  const token = response?.data?.token;
  if (token) {
    setLoginData(token);
    message.show('retry-your-action', 'success');
  }
};

export const authAPI = {login, refreshToken};
