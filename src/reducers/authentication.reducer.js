import { constants } from '../utils/constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case constants.reducerUserConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case constants.reducerUserConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case constants.reducerUserConstants.LOGIN_FAILURE:
      return {};
    case constants.reducerUserConstants.LOGOUT:
      return {};
    default:
      return state
  }
}