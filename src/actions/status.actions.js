import { httpStatusConstants } from '../constants';

export const changeStatusCode = (code) => ({
  type: httpStatusConstants.CHANGE_STATUS_CODE,
  httpStatusCode: code,
});
