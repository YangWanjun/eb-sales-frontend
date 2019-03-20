import { httpStatusConstants } from '../constants';

const initialState = {
  httpStatusCode: 200,
};

export function status(state = initialState, action) {
  switch (action.type) {
    case httpStatusConstants.STATUS_CHANGE:
      return {
        ...state,
        httpStatusCode: action.httpStatusCode,
      };
    default:
      return state
  }
}
