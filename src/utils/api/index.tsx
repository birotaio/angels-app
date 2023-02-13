import constants from '@utils/constants';
import {Platform} from 'react-native';
import {useSdk, Sdk} from '@fifteen/sdk';
import {
  getRefreshToken,
  getToken,
  removeLoginData,
  setLoginData,
} from './calls/authAPI';
import message from '@utils/message';
import CodePush from 'react-native-code-push';
import BleModule from '@utils/blemodule';

const fifteenSDK = async (): Promise<Sdk> => {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sdk = useSdk({
    baseURL: constants.API_URL,
    clientId:
      Platform.OS === 'android'
        ? constants.API_CLIENT_ID_ANDROID
        : constants.API_CLIENT_ID_IOS,
    token,
    refreshToken,
  });
  sdk.api.hook('api-error', apiHookErrorData => {
    const code = apiHookErrorData.error?.response?._data?.code;
    const _message = apiHookErrorData.error?.response?._data?.message;
    console.log('api-error', code, _message);
    message.show(
      code?.toString() ?? 'something-wrong-happened',
      'warning',
      true,
    );
  });
  sdk.api.hook('token-refreshed', hookData => {
    setLoginData(hookData.token);
    // Change ZoovBLE token
    BleModule.setUp(constants.API_URL, hookData.token, refreshToken);
  });
  sdk.api.hook('refresh-token-error', async () => {
    console.log('refresh-token-error');
    await removeLoginData();
    CodePush.restartApp();
  });
  return sdk;
};

export default fifteenSDK;
