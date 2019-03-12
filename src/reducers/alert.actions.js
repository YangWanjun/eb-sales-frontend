import { constants } from '../utils/constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: constants.reducerAlertConstants.SUCCESS, message };
}

function error(message) {
    return { type: constants.reducerAlertConstants.ERROR, message };
}

function clear() {
    return { type: constants.reducerAlertConstants.CLEAR };
}