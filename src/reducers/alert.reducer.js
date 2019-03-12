import { constants } from '../utils/constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case constants.reducerAlertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case constants.reducerAlertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case constants.reducerAlertConstants.CLEAR:
      return {};
    default:
      return state
  }
}