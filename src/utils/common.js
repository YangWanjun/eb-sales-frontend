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
};