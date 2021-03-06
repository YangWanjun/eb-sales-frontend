import { authConstants } from '../constants';
import { userService } from '../services';
import { push } from 'react-router-redux';

export const login = (username, password) => {
  return dispatch => {
    dispatch(loginRequest({ username }));

    userService.login(username, password)
      .then(
        data => {
          dispatch(loginSuccess(data));
          dispatch(push('/'));
        },
        error => {
          dispatch(loginFailure(error));
        }
      );
  };
}

export const logoutAndRedirect = () => {
  return dispatch => {
    userService.logout();
    dispatch(logout());
    dispatch(push('/login'));
  }
};

const logout = () => ({
  type: authConstants.LOGOUT
});

const loginRequest = data => ({
  type: authConstants.LOGIN_REQUEST,
});

const loginSuccess = data => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: data
});

const loginFailure = error => ({
  type: authConstants.LOGIN_FAILURE,
  payload: error
});
