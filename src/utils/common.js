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
  toNumComma: function(num) {
    if (num) {
      const int_comma = (num + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      return int_comma;
    } else {
      return '0';
    }
  },

  /**
   * 整数に変更する
   * @param {String} num 
   */
  toInteger: function(num, radix=10) {
    let val = parseInt(num, radix);
    return isNaN(val) ? 0 : val;
  },

  /**
   * 文字列をフォーマットする
   * @param {String} format 
   *
   * 使用方法：utils.format('This is argument: %s', arg1);
   */
  formatStr: function(format) {
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
   * 日付をフォーマットする
   * @param {Date} date 
   * @param {String} format 
   */
  formatDate: function (date, format) {
    if (!format) {
        format = 'YYYY-MM-DD hh:mm:ss.SSS';
    }
    if (typeof date === "string") {
        date = new Date(date);
    }
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
        var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
        var length = format.match(/S/g).length;
        for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
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
   * QueryStringから並び替えの項目名と昇順／降順を取得
   * @param {String} order_by 例：-nameの場合は「name」項目の降順
   */
  getOrderParams: function(order_by) {
    let order = 'asc';
    let orderBy = '';
    if (order_by) {
      if (order_by.substr(0, 1) === '-') {
        order = 'desc';
        orderBy = order_by.substr(1);
      } else {
        order = 'asc';
        orderBy = order_by;
      }
    }
    return {orderBy, order};
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
   * URLの引数をJSONに変換する
   * @param {String} text QueryString
   * @param {String} sep 
   * @param {String} eq 
   * @param {Boolean} isDecode 
   */
  parseQuerystring: function(text, sep, eq, isDecode) {
    if (!text) {
      return {};
    }
    sep = sep || '&';
    eq = eq || '=';
    var decode = (isDecode) ? decodeURIComponent : function(a) { return a; };
    return this.trim(text, '?').split(sep).reduce(function(obj, v) {
      var pair = v.split(eq);
      obj[pair[0]] = decode(pair[1]);
      return obj;
    }, {});
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
    if (!response.ok) {
      store.dispatch(changeStatusCode(response.status));
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
      } else if (response.status === 500) {
        // Internal Server Error
        store.dispatch(replace('/error'));
      }
      return response.json().then(data => {
        return Promise.reject(data);
      });
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
