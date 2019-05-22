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
    if (!obj) {
      return true;
    } else if (Array.isArray(obj)) {
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
    } else if (typeof value === 'undefined') {
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
   * 数字に対して、小数の部分を処理
   * @param {float} num 小数
   * @param {String} decimal_type 小数の処理区分(0: 四捨五入, 1: 切り捨て, 2: 切り上げ)
   */
  getInteger: function(num, decimal_type) {
    if (decimal_type === '0') {
      return Math.round(num);
    } else if (decimal_type === '1') {
      return Math.ceil(num);
    } else if (decimal_type === '2') {
      return Math.floor(num);
    } else {
      return num;
    }
  },

  /**
   * 出勤時間を取得
   * @param {float} num 出勤時間
   * @param {String} attendance_type 出勤の計算区分(1: １５分ごと, 2: ３０分ごと, 3: １時間ごと)
   */
  getAttendanceHours: function(num, attendance_type) {
    const int_part = Math.floor(parseFloat(num));
    const float_part = parseFloat("0."+(String(num)).split(".")[1]);
    if (float_part === 0) {
      return int_part;
    } else if (attendance_type === '1') {
      if (0 <= float_part && float_part < 0.25) {
        return int_part;
      } else if (0.25 <= float_part && float_part < 0.5) {
        return int_part + 0.25;
      } else if (0.5 <= float_part && float_part < 0.75) {
        return int_part + 0.5;
      } else {
        return int_part + 0.75
      }
    } else if (attendance_type === '2') {
      if (0 <= float_part && float_part < 0.5) {
        return int_part;
      } else {
        return int_part + 0.5;
      }
    } else if (attendance_type === '3') {
      return int_part;
    } else {
      return num;
    }
  },

  /**
   * 先月を取得
   * @param {String} year 年
   * @param {String} month 月
   */
  getPrevMonth: function(year, month) {
    let d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return this.addMonths(d, -1);
  },

  /**
   * 次月を取得
   * @param {String} year 年
   * @param {String} month 月
   */
  getNextMonth: function(year, month) {
    let d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return this.addMonths(d, 1);
  },

  /**
   * 
   * @param {Date} srcDate 日付
   * @param {Integer} months 月数
   */
  addMonths: function(srcDate, months=1) {
    let newDate = new Date(srcDate.getTime());
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  },

  /**
   * 
   * @param {Integer} num 整数
   * @param {Integer} places 桁数
   */
  zeroPad: function(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  },

  /**
   * Base64をBlobに変換する
   * @param {Base64} base64 Base64
   * @param {String} mime_ctype 
   */
  toBlob: function(base64, mime_ctype='application/octet-stream') {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try{
        var blob = new Blob([buffer.buffer], {
            type: mime_ctype
        });
    }catch (e){
        return false;
    }
    return blob;
  },

  /**
   * Blobファイルをダウンロード
   * @param {Blob} blob 
   * @param {String} filename ファイル名
   */
  downloadBlog: function(blob, filename) {
    var csvURL = window.URL.createObjectURL(blob);
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', filename);
    tempLink.click();
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
  fetchDelete: function(url, params) {
    return this.fetchCommon(url, 'DELETE', params);
  },

  /**
   * 
   * @param {String} url ＵＲＬ
   * @param {Object} params パラメーター
   */
  fetchPut: function(url, params) {
    return this.fetchCommon(url, 'PUT', params);
  },

  /**
   * 
   * @param {String} url ＵＲＬ
   * @param {Object} params パラメーター
   */
  fetchOptions: function(url) {
    return this.fetchCommon(url, 'OPTIONS');
  },

  fetchBinary: function(url) {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
      // credentials: 'same-origin',
    };
    return fetch(url, requestOptions)
      .then(this.handleStatus)
      .then(function(res) {
        return res.blob();
      });
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
      return common.handleResponse(response).then(data => {
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
