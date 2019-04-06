import { replace } from 'react-router-redux';
import { authHeader } from '../utils/authHeader';
import { logoutAndRedirect } from '../actions/auth.actions';
import { clearMe } from '../actions/user.actions';
import { changeStatusCode } from '../actions/status.actions';
import { store } from '../utils/store';

export const common = {
  /**
   * 数字をカンマ区切りで表示
   * @param {Integer} num 数字
   */
  toNumComma: function (num) {
    if (num) {
      const int_comma = (num + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return int_comma;
    } else {
      return '0';
    }
  },

  /**
   * 文字列をフォーマットする
   * @param {String} format 
   *
   * 使用方法：utils.format('This is argument: %s', arg1);
   */
  formatStr: function (format) {
    var i = 0,
        j = 0,
        r = "",
        next = function(args){
          j += 1; i += 1;
          return args[j] !== void 0 ? args[j] : "";
        };

    for(i=0; i<format.length; i++){
      if(format.charCodeAt(i) === 37){
        switch(format.charCodeAt(i+1)){
          case 115: r += next(arguments); break;
          case 100: r += Number(next(arguments)); break;
          default: r += format[i]; break;
        }
      } else {
        r += format[i];
      }
    }
    return r;
  },

  /**
   * オブジェクトは空白なのか
   * @param {Object} obj 
   */
  isEmpty: function(obj) {
    if (Array.isArray(obj)) {
      return obj.length === 0;
    }
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  },

  /**
   * JSON項目のリストから項目を取得
   * @param {Array} columns 
   * @param {String} value 
   */
  getColumnByName: function(columns, value, key='id') {
    if (columns.length === 0) {
      return 0;
    } else if (!value) {
      return null;
    } else {
      if (typeof value === 'string') {
        value = value.split('__')[0];
      }
      let cols = columns.filter(col => col[key] === value);
      return cols.length > 0 ? cols[0] : null;
    }
  },

  /**
   * アルファベットの一文字目だけ大文字に
   * @param {String} s 
   */
  capitalize: function(s) {
    if (s) {
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    } else {
      return '';
    }
  },

  /**
   * 文字列の両端に特定の文字を消す
   * @param {String} s 文字列
   * @param {String} c 置換する文字列
   */
  trim: function(s, c) {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
      "^[" + c + "]+|[" + c + "]+$", "g"
    ), "");
  },

  /**
   * 二つのＵＲＬを結合する
   * @param {String} url1 ＵＲＬ
   * @param {String} url2 ＵＲＬ
   */
  joinUrl: function(url1, url2) {
    return this.trim(url1, '/') + '/' + this.trim(url2, '/');
  },

  /**
   * JSONデータをＵＲＬ用のパラメーターに変換する
   * @param {Object} data JSONデータ
   */
  jsonToUrlParameters: function(data) {
    return Object.keys(data).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');
  },

  /**
   * ＵＲＬにパラメーターを追加する
   * @param {String} url ＵＲＬ
   * @param {Object} data JSON型のパラメーター
   */
  addUrlParameter: function(url, data) {
    url = this.trim(this.trim(url, '?'), '&');
    const params = this.jsonToUrlParameters(data);
    if (url.indexOf('?') < 0) {
      url += '?';
    }
    return url + '&' + params;
  },

  /**
   * 
   * @param {String} url ＵＲＬ
   * @param {Object} params パラメーター
   */
  fetchGet: function(url, params) {
    return this.fetchCommon(url, 'GET', params);
  },

  /**
   * 
   * @param {String} url ＵＲＬ
   * @param {Object} params パラメーター
   */
  fetchPost: function(url, params) {
    return this.fetchCommon(url, 'POST', params);
  },

  /**
   * 
   * @param {String} url ＵＲＬ
   * @param {Object} params パラメーター
   */
  fetchOptions: function(url) {
    return this.fetchCommon(url, 'OPTIONS');
  },

  /**
   * ＡＰＩを呼び出す
   * @param {String} url ＵＲＬ
   * @param {String} method GET|POST|PUT|DELETE
   * @param {Object} params パラメーター
   */
  fetchCommon: function(url, method, params) {
    const requestOptions = {
      method: method,
      headers: authHeader(),
      // credentials: 'same-origin',
    };
    if (params && !this.isEmpty(params)) {
      requestOptions['body'] = JSON.stringify(params)
    }

    url = this.addUrlParameter(url, {'format': 'json'});
    return fetch(url, requestOptions)
      .then(this.handleStatus)
      .then(this.handleResponse);
  },

  handleStatus: function(response) {
    store.dispatch(changeStatusCode(response.status));
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        store.dispatch(logoutAndRedirect());
        store.dispatch(clearMe());
          //location.reload(true);
      } else if (response.status === 405) {
        // Method Not Allowed
        store.dispatch(replace('/forbidden'));
      } else if (response.status === 404) {
        // Page Not Found
        store.dispatch(replace('/notfound'));
      }
      const error = response.statusText;
      return Promise.reject(error);
    } else {
      return response;
    }
  },

  handleResponse: function(response) {
    return response.text().then(text => {
      let data = text;
      try {
        data = JSON.parse(text);
      } catch (e) { }

      return data;
    });
  },

  /**
   * 現在ログイン中のユーザーに指定の権限があるかどうか
   * @param {String} perm 権限名称
   */
  hasPerm: function(perm) {
    if (!store.getState()) {
      return false;
    }
    const user = store.getState().user;
    if (user.me.is_superuser) {
      return true;
    }
    if (this.isEmpty(user.perms)) {
      return false;
    }
    return user.perms.indexOf(perm) >= 0;
  }
};
