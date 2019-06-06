import { httpStatusConstants, loadingStatusConstants } from '../constants';

export const changeStatusCode = (code) => ({
  type: httpStatusConstants.CHANGE_STATUS_CODE,
  httpStatusCode: code,
});

export const loading = (open) => ({
  type: loadingStatusConstants.LOADING,
  loading: open,
});
