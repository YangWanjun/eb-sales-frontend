import { config } from '../utils/config';
import { logout, common } from '../utils/common';

export const userService = {
    login,
    logout,
    getMe
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            username,
            password
          }
        )
    };

    return fetch(config.api.authenticate, requestOptions)
        .then(handleResponse)
        .then(data => {
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(data.token));
            }

            return data;
        });
}

function getMe() {
    return common.fetchPost(config.api.me);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
