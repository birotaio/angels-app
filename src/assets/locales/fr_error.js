import {ApiErrorCode} from '@fifteen/sdk';

const fr_error = {
  [ApiErrorCode.AuthUserNotFound]: 'AuthUserNotFound',
  [ApiErrorCode.AuthInvalidPassword]: 'AuthInvalidPassword',
  [ApiErrorCode.AuthInvalidEmailFormat]: 'AuthInvalidEmailFormat',
};
export default fr_error;
