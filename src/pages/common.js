import { common } from '../utils/common';
import { constant } from '../utils/constants';
import { config } from '../utils/config';

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

export function setPriceMemo(name, data) {
  if ([
    'allowance_base', 
    'calculate_time_min', 
    'calculate_time_max', 
  ].indexOf(name) > -1) {
    // 基本給
    let {
      allowance_base,
      calculate_time_max,
      calculate_time_min,
      allowance_absenteeism,
      allowance_overtime,
      is_hourly_pay,
      is_fixed_cost,
      is_show_formula,
    } = data;
    if (calculate_time_min) {
      allowance_absenteeism = Math.round(allowance_base / calculate_time_min);
    }
    if (calculate_time_max) {
      allowance_overtime = Math.round(allowance_base / calculate_time_max);
    }
    const allowance_absenteeism_memo = get_minus_per_hour_memo(allowance_base, calculate_time_min, is_show_formula);
    const allowance_overtime_memo = get_max_per_hour_memo(allowance_base, calculate_time_max, is_show_formula);
    return {
      allowance_base_memo: get_basic_price_memo(allowance_base, is_fixed_cost, is_hourly_pay),
      allowance_absenteeism,
      allowance_overtime,
      allowance_absenteeism_memo,
      allowance_overtime_memo,
    };
  } else if ([
    'allowance_absenteeism', 
    'allowance_overtime',
    'is_show_formula'
  ].indexOf(name) > -1) {
    let {
      allowance_base,
      calculate_time_max,
      calculate_time_min,
      allowance_absenteeism,
      allowance_overtime,
      is_show_formula,
    } = data;
    const allowance_absenteeism_memo = get_minus_per_hour_memo(allowance_base, calculate_time_min, is_show_formula, allowance_absenteeism);
    const allowance_overtime_memo = get_max_per_hour_memo(allowance_base, calculate_time_max, is_show_formula, allowance_overtime);
    return {
      allowance_absenteeism_memo,
      allowance_overtime_memo,
    };
  } else if ([
    'is_hourly_pay',
    'is_fixed_cost'
  ].indexOf(name) > -1) {
    let {
      allowance_base,
      is_hourly_pay,
      is_fixed_cost,
    } = data;
    return {
      allowance_base_memo: get_basic_price_memo(allowance_base, is_fixed_cost, is_hourly_pay),
    }
  } else {
    return null;
  }
};

/**
 * 同じ名前のメンバーが存在するかどうか
 * @param {String} name 変更する項目名
 * @param {JSON} data 変更後のデータ
 */
export function checkSameMember(name, data) {
  if (['first_name', 'last_name'].indexOf(name) > -1) {
    const first_name = data.first_name;
    const last_name = data.last_name;
    common.fetchPost(config.api.member.duplicated, {first_name, last_name});
  }
};
