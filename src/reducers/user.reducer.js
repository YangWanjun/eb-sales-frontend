import { userConstants } from '../constants';

const initialState = {
  loading: false,
  me: {},
  perms: {},
};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case userConstants.GET_ME_SUCCESS:
      return {
        ...state,
        loading: false,
        me: action.payload.me,
        perms: action.payload.perms,
      };
    case userConstants.GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case userConstants.CLEAR_ME:
      return {
        ...state,
        me: {},
      }
    default:
      return state
  }
}
