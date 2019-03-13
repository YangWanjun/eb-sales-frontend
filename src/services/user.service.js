import { authHeader } from '../utils/authHeader';
import { config } from '../utils/config';
import { common } from '../utils/common';

const apiHost = 'http://192.168.99.100:8001/api';

export const userService = {
    login,
    logout: common.logout,
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
    return fetchGet(`${apiHost}/me`);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                common.logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

/**
 * 
 * @param {String} url ＵＲＬ
 * @param {Object} params パラメーター
 */
export function fetchGet(url, params) {
    return fetchCommon(url, 'GET', params);
}

/**
 * 
 * @param {String} url ＵＲＬ
 * @param {Object} params パラメーター
 */
export function fetchPost(url, params) {
    return fetchCommon(url, 'POST', params);
}

/**
 * ＡＰＩを呼び出す
 * @param {String} url ＵＲＬ
 * @param {String} method GET|POST|PUT|DELETE
 * @param {Object} params パラメーター
 */
function fetchCommon(url, method, params) {
    const requestOptions = {
        method: method,
        headers: authHeader(),
    };

    return fetch(url, requestOptions).then(handleResponse);
}
