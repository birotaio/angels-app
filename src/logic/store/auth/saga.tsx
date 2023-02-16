import {takeLatest, put, call} from 'redux-saga/effects';

import {
  authAPI,
  GetPrivilegeType,
  getToken,
  removeLoginData,
  setLoginData,
} from '@utils/api/calls/authAPI';
import {setAuthState} from './reducer';
import NativeSplashScreen from 'react-native-splash-screen';

import message from '@utils/message';
import i18n from '@assets/locales';
import navigator from '@navigation/navigator';
import {LoginScreen, MapScreen} from '@components/screens';
import {ApiSchema} from '@fifteen/sdk';

export const AUTH_ACTIONS_SAGA_CHECK_LOGIN = 'AUTH_ACTIONS_SAGA_CHECK_LOGIN';
export const AUTH_ACTIONS_SAGA_GET_PRIVILEGE =
  'AUTH_ACTIONS_SAGA_GET_PRIVILEGE';
export const AUTH_ACTIONS_SAGA_LOGIN = 'AUTH_ACTIONS_SAGA_LOGIN';
export const AUTH_ACTIONS_SAGA_LOGOUT = 'AUTH_ACTIONS_SAGA_LOGOUT';

/**
 * Verify storage token for passthrough login screen
 **/

export function* _checkLogin() {
  const token: string = yield getToken();
  yield put(setAuthState({isLogged: token ? true : false}));
  if (token) {
    const responseToken: ApiSchema['auth.RefreshTokenResponse'] = yield call(
      authAPI.refreshToken,
    );
    if (responseToken?.token) {
      yield setLoginData(responseToken.token);
    }

    yield put({type: AUTH_ACTIONS_SAGA_GET_PRIVILEGE});
    navigator.reset(MapScreen.navigationName);
  } else {
    navigator.reset(LoginScreen.navigationName);
  }
  NativeSplashScreen.hide();
}

/**
 * Login process :
 * save token, refreshToken, user in local storage
 * @param email user email
 * @param password user password
 *
 **/
export function* _login(payload: {data: {email: string; password: string}}) {
  const {email, password} = payload?.data;

  yield put(setAuthState({isLoading: true}));
  try {
    const data: {token?: string; refreshToken?: string} = yield authAPI.login(
      email,
      password,
    );

    if (data?.token) {
      yield setLoginData(data.token, email, data.refreshToken); // save login data in async storage
      yield put(setAuthState({isLogged: true, isLoading: false}));
      message.show(`${i18n.t('login-ok')} : ${email}`, 'success', false);
      navigator.navigate(MapScreen.navigationName);
      yield put({type: AUTH_ACTIONS_SAGA_GET_PRIVILEGE}); // get privilege from new user
    } else {
      yield put(setAuthState({isLoading: false}));
      message.show('something-wrong-happened', 'danger');
    }
  } catch (e: any) {
    yield put(
      setAuthState({isLoading: false, isLogged: false, error: e?.message}),
    );
  }
}

/**
 * Logout process
 * @returns void : clear local storage
 **/
export function* _logout() {
  yield put(setAuthState({isLoading: true}));
  yield removeLoginData();
  yield put(setAuthState({isLogged: false, isLoading: false, privilege: []}));
  message.show(`${i18n.t('login-out-ok')} `, 'success', false);
  navigator.reset(LoginScreen.navigationName);
}

/**
 * getPrivilege
 * @returns void : setPrivileges in state.auth.privileges
 **/
export function* _getPrivilege() {
  yield put(setAuthState({isLoading: true}));
  try {
    const data: GetPrivilegeType = yield authAPI.getPrivileges();
    yield put(setAuthState({isLoading: false, privileges: data.data}));
  } catch (e: any) {
    yield put(
      setAuthState({isLoading: false, isLogged: false, error: e?.message}),
    );
  }
}

export default function* authSaga() {
  yield takeLatest(AUTH_ACTIONS_SAGA_CHECK_LOGIN, _checkLogin);
  yield takeLatest(AUTH_ACTIONS_SAGA_GET_PRIVILEGE, _getPrivilege);
  yield takeLatest(AUTH_ACTIONS_SAGA_LOGIN, _login);
  yield takeLatest(AUTH_ACTIONS_SAGA_LOGOUT, _logout);
}
