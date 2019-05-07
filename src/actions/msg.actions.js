import { msgConstants } from '../constants';

export const errorMessage = (message) => ({
  type: msgConstants.ERROR_MESSAGE,
  message: message,
});

export const warningMessage = (message) => ({
  type: msgConstants.WARNING_MESSAGE,
  message: message,
});

export const successMessage = (message) => ({
  type: msgConstants.SUCCESS_MESSAGE,
  message: message,
});

export const infoMessage = (message) => ({
  type: msgConstants.INFO_MESSAGE,
  message: message,
});
