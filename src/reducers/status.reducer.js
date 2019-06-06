import { httpStatusConstants, loadingStatusConstants } from '../constants';

const initialState = {
  httpStatusCode: 200,
  loading: false,
};

export function status(state = initialState, action) {
  switch (action.type) {
    case httpStatusConstants.CHANGE_STATUS_CODE:
      return {
        ...state,
        httpStatusCode: action.httpStatusCode,
      };
    case loadingStatusConstants.LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state
  }
}
