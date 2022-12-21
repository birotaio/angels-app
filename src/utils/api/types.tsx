import {AxiosResponse} from 'axios';

export interface ApiDataType extends AxiosResponse<any, any> {
  status: number;
  error: string;
}

export type LoginApiInputType = {
  type: string;
  data: {
    email: string;
    password: string;
  };
};

export interface LoginApiResponseType extends ApiDataType {
  data: {
    ok: boolean;
    refresh_token: string;
    token: string;
  };
}
