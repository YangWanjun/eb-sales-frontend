import { authHeader } from '../utils/authHeader';

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
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    /**
     * 項目のリストから項目を取得
     * @param {Array} columns 
     * @param {String} name 
     */
    getColumnByName: function(columns, name) {
        if (columns.length === 0) {
            return 0;
        } else {
            name = name.split('__')[0];
            let cols = columns.filter(col => col.id === name);
            return cols.length > 0 ? cols[0] : null;
        }
    },

    /**
     * アルファベットの一文字目だけ大文字に
     * @param {String} s 
     */
    capitalize: function(s) {
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
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
     * ＡＰＩを呼び出す
     * @param {String} url ＵＲＬ
     * @param {String} method GET|POST|PUT|DELETE
     * @param {Object} params パラメーター
     */
    fetchCommon: function(url, method, params) {
        const requestOptions = {
            method: method,
            headers: authHeader(),
        };

        return fetch(url, requestOptions).then(this.handleResponse);
    },

    handleResponse: function(response) {
        var self = this;
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    self.logout();
                    //location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    },

    logout: function() {
        // ログアウト時にはローカルストレージからuserアイテムを削除する
        localStorage.removeItem('token');
    },

};
