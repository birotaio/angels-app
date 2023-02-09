import {AnyMap} from '@interface/index';
import {GetPrivilegeType} from '@utils/api/calls/authAPI';
import {PRIVILEGES_TYPE} from './utils';

const getAuth = (state: AnyMap): AnyMap => state.auth;
const getAngelBikePrivilege = (state: AnyMap): (string | undefined)[] => {
  const privileges: GetPrivilegeType['data'] = state.auth.privileges;
  const rootAngelBike = `${PRIVILEGES_TYPE.ANGELS.root}${PRIVILEGES_TYPE.ANGELS.privileges.BIKE.root}`;
  return privileges
    ? privileges
        .filter(a => a.permission?.startsWith(rootAngelBike))
        .map(a => a.permission)
    : [];
};
const isLogged = (state: AnyMap): boolean => state.auth.isLogged;
const isLoading = (state: AnyMap): boolean => state.auth.isLoading;

export const AuthSelector = {
  getAngelBikePrivilege,
  isLogged,
  getAuth,
  isLoading,
};
