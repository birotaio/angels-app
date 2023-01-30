import {takeLatest, put, call} from 'redux-saga/effects';
import {authAPI} from '@utils/api/calls/authAPI';
import {setAuthState} from './reducer';
import message from '@utils/message';
import {getToken, setLoginData} from '@utils/api';
import i18n from '@assets/locales';
import navigator from '@navigation/navigator';
import {MapScreen} from '@components/screens';

export const AUTH_ACTIONS_SAGA_CHECK_LOGIN = 'AUTH_ACTIONS_SAGA_CHECK_LOGIN';
export const AUTH_ACTIONS_SAGA_LOGIN = 'AUTH_ACTIONS_SAGA_LOGIN';

export function* _checkLogin() {
  const token: string = yield getToken();
  yield put(setAuthState({isLogged: token ? true : false}));
}

export function* _login(payload: {data: {email: string; password: string}}) {
  const {email, password} = payload?.data;

  yield put(setAuthState({isLoading: true}));
  try {
    const data: {token?: string; refreshToken?: string} = yield authAPI.login(
      email,
      password,
    );
    console.log(data);

    if (data?.token) {
      yield setLoginData(data.token, email, data.refreshToken);
      yield put(setAuthState({isLogged: true, isLoading: false}));
      message.show(`${i18n.t('login-ok')} : ${email}`, 'success', false);
      navigator.navigate(MapScreen.navigationName);
    } else {
      yield put(setAuthState({isLoading: false}));
      message.show('something-wrong-happened', 'danger');
    }
  } catch (e: any) {
    message.show('something-wrong-happened', 'danger');
    yield put(setAuthState({isLoading: false}));
    yield put(setAuthState({isLogged: false, error: e?.message}));
  }
}

export default function* authSaga() {
  yield takeLatest(AUTH_ACTIONS_SAGA_CHECK_LOGIN, _checkLogin);
  yield takeLatest(AUTH_ACTIONS_SAGA_LOGIN, _login);
}
