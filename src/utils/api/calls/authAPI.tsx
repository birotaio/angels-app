import {AxiosPromise} from 'axios';
import callAPI from '..';
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

export const authAPI = {login};
