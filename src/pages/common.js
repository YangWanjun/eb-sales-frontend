import { common } from '../utils/common';
import { constant } from '../utils/constants';

export function get_minus_per_hour_memo (basic_price, min_hour, show_formula=true, minus_per_hour=null) {
  if (minus_per_hour === null) {
    minus_per_hour = Math.round(basic_price / min_hour);
  }
  if (show_formula) {
    return common.formatStr(
      "不足単価：￥%s/%sh=￥%s/h",
      common.toNumComma(basic_price),
      min_hour,
      common.toNumComma(minus_per_hour),
    );
  } else {
    return common.formatStr("不足単価：￥%s/h", common.toNumComma(minus_per_hour));
  }
};

export function get_max_per_hour_memo (basic_price, max_hour, show_formula=true, plus_per_hour=null) {
  if (plus_per_hour === null) {
    plus_per_hour = Math.round(basic_price / max_hour);
  }
  if (show_formula) {
    return common.formatStr(
      "超過単価：￥%s/%sh=￥%s/h",
      common.toNumComma(basic_price),
      max_hour,
      common.toNumComma(plus_per_hour),
    );
  } else {
    return common.formatStr("超過単価：￥%s/h", common.toNumComma(plus_per_hour));
  }
};

export function get_basic_price_memo(basic_price, is_fixed=false, is_hourly_pay=false) {
  if (is_hourly_pay === true) {
    return common.formatStr(
      "時間単価：￥%s/h  (消費税を含まない)",
      common.toNumComma(basic_price),
      is_fixed === true ? '固定、' : '',
    );
  } else {
    return common.formatStr(
      "月額基本料金：￥%s円/月  (%s税金抜き)",
      common.toNumComma(basic_price),
      is_fixed === true ? '固定、' : '',
    );
  }
};

export function checkDepartment(data) {
  const {division, department, section} = data;
  if (!division && !department && !section) {
    return [
      {name: 'division', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
      {name: 'department', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
      {name: 'section', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
    ];
  } else {
    return true;
  }
};
