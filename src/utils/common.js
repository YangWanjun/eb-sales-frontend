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
};  