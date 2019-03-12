import { constants } from '../utils/constants';

export function users(state = {}, action) {
  switch (action.type) {
    case constants.reducerUserConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case constants.reducerUserConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case constants.reducerUserConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}