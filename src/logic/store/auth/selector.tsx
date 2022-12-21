import {AnyMap} from '@interface/index';

const getAuth = (state: AnyMap): AnyMap => state.auth;
const isLogged = (state: AnyMap): boolean => state.auth.isLogged;
const isLoading = (state: AnyMap): boolean => state.auth.isLoading;

export const AuthSelector = {
  isLogged,
  getAuth,
  isLoading,
};
