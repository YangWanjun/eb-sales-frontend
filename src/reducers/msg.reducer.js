import { msgConstants } from '../constants';

const initialState = {
  errorMessages: [],
  warningMessages: [],
  successMessages: [],
  infoMessages: [],
};

export function msg(state = initialState, action) {
  switch (action.type) {
    case msgConstants.ERROR_MESSAGE:
      let errorMessages = [].concat(state.errorMessages);
      errorMessages.push(action.message);
      return {
        ...state,
        errorMessages: errorMessages,
      };
    case msgConstants.WARNING_MESSAGE:
      let warningMessages = [].concat(state.warningMessages);
      warningMessages.push(action.message);
      return {
        ...state,
        warningMessages: warningMessages,
      };
    case msgConstants.SUCCESS_MESSAGE:
      let successMessages = [].concat(state.successMessages);
      successMessages.push(action.message);
      return {
        ...state,
        successMessages: successMessages,
      };
    case msgConstants.INFO_MESSAGE:
      let infoMessages = [].concat(state.infoMessages);
      infoMessages.push(action.message);
      return {
        ...state,
        infoMessages: infoMessages,
      };
    default:
      return state
  }
}
