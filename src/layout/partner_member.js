export const list_member_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    'searchable': true,
    "url_field": "url",
  },
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
  },
  {
    "name": "department_name",
    "type": "string",
    "label": "部署",
  },
  {
    "name": "section_name",
    "type": "string",
    "label": "課",
  },
  {
    "name": "is_working",
    "type": "boolean",
    "label": "稼働",
    'searchable': true,
  },
  {
    "name": "is_contract_retired",
    "type": "boolean",
    "label": "退職",
    "visible": false,
    "styles": {
      1: {'backgroundColor': 'lightgray'}
    },
    'searchable': true,
  },
];

export const edit_partner_member_org_schema = [
  {
    "name": "organization",
    "type": "cascade",
    "fields": [
      {
        "name": "division",
        "label": "事業部",
      },
      {
        "name": "department",
        "label": "部署",
        "parent": 'division',
      },
      {
        "name": "section",
        "label": "課",
        'parent': 'department',
      },
    ],
    "label": "所属部署",
    "choices": [],
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "required": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
];

export const edit_partner_member_salesperson_schema = [
  {
    "name": "salesperson",
    "type": "choice",
    "label": "営業員",
    "choices": [],
    "required": true,
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "required": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
];

export const edit_bp_contract_schema = [
  {
    "name": "contract_type",
    "type": "choice",
    "label": "契約形態",
    "choices": [
      { "value": "01", "display_name": "業務委託" },
      { "value": "02", "display_name": "準委任" },
      { "value": "03", "display_name": "派遣" },
      { "value": "04", "display_name": "一括" },
      { "value": "11", "display_name": "出向（在籍）" },
      { "value": "12", "display_name": "出向（完全）" },
      { "value": "99", "display_name": "その他" },
    ],
    "required": true,
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "雇用開始日",
    "required": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "雇用終了日",
    "required": true,
    "default": '9999-12-31',
  },
  {
    "name": "is_hourly_pay",
    "type": "boolean",
    "label": "時給",
  },
  {
    "name": "is_fixed_cost",
    "type": "boolean",
    "label": "固定",
  },
  {
    "name": "is_show_formula",
    "type": "boolean",
    "label": "計算式",
    "default": true,
  },
  {
    "name": "allowance_base",
    "type": "integer",
    "label": "基本給",
    "min_value": 0,
    "required": true,
  },
  {
    "name": "allowance_base_memo",
    "type": "string",
    "label": "基本給メモ",
  },
  {
    "name": "allowance_time_min",
    "type": "decimal",
    "label": "時間下限",
    "help_text": "足りないなら欠勤となる",
    "default": 160.0,
    "min_value": 0,
    "step": 0.25,
    "required": true,
  },
  {
    "name": "allowance_time_max",
    "type": "decimal",
    "label": "時間上限",
    "help_text": "超えたら残業となる",
    "default": 200.0,
    "min_value": 0,
    "step": 0.25,
    "required": true,
  },
  {
    "name": "allowance_time_memo",
    "type": "string",
    "label": "基準時間メモ",
    "default": "※基準時間：160～200/月",
  },
  {
    "name": "calculate_type",
    "type": "choice",
    "label": "計算種類",
    "choices": [
      {"value": "01", "display_name": "固定１６０時間"},
      {"value": "02", "display_name": "営業日数 × ８"},
      {"value": "03", "display_name": "営業日数 × ７.９"},
      {"value": "04", "display_name": "営業日数 × ７.７５"},
      {"value": "99", "display_name": "その他（任意）"},
    ],
    "default": '99',
    "required": true,
  },
  {
    "name": "calculate_time_min",
    "type": "decimal",
    "label": "計算用下限",
    "help_text": "欠勤手当を算出ために使われます",
    "default": 160.0,
    "step": 0.25,
    "min_value": 0,
  },
  {
    "name": "calculate_time_max",
    "type": "decimal",
    "label": "計算用上限",
    "help_text": "残業手当を算出ために使われます",
    "default": 200.0,
    "step": 0.25,
    "min_value": 0,
  },
  {
    "name": "allowance_absenteeism",
    "type": "integer",
    "label": "欠勤手当",
    "min_value": 0,
    "required": true,
  },
  {
    "name": "allowance_absenteeism_memo",
    "type": "string",
    "label": "欠勤手当メモ",
    "read_only": true,
  },
  {
    "name": "allowance_overtime",
    "type": "integer",
    "label": "残業手当",
    "min_value": 0,
    "required": true,
  },
  {
    "name": "allowance_overtime_memo",
    "type": "string",
    "label": "残業手当メモ",
    "read_only": true,
  },
  {
    "name": "allowance_other",
    "type": "integer",
    "label": "その他手当",
    "min_value": 0,
    "default": 0,
    "required": true,
  },
  {
    "name": "allowance_other_memo",
    "type": "string",
    "label": "その他手当メモ",
  },
  {
    "name": "comment",
    "type": "text",
    "label": "備考",
  },
];

export const edit_bp_contract_layout = [
  'contract_type',
  ['start_date', 'end_date'],
  ['is_hourly_pay', 'is_fixed_cost', 'is_show_formula'],
  ['allowance_base', 'allowance_base_memo'],
  ['allowance_time_min', 'allowance_time_max', 'allowance_time_memo'],
  'calculate_type',
  ['calculate_time_min', 'calculate_time_max'],
  ['allowance_absenteeism', 'allowance_absenteeism_memo'],
  ['allowance_overtime', 'allowance_overtime_memo'],
  ['allowance_other', 'allowance_other_memo'],
  'comment',
];

export const list_bp_contract_schema = [
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "required": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
  },
  {
    "name": "company_name",
    "type": "string",
    "label": "会社名",
  },
  {
    "name": "is_hourly_pay",
    "type": "boolean",
    "label": "時給",
  },
  {
    "name": "is_fixed_cost",
    "type": "boolean",
    "label": "固定",
  },
  {
    "name": "allowance_base",
    "type": "integer",
    "label": "基本給",
  },
  {
    "name": "calculate_type",
    "type": "choice",
    "label": "計算種類",
    "choices": [
      {"value": "01", "display_name": "固定１６０時間"},
      {"value": "02", "display_name": "営業日数 × ８"},
      {"value": "03", "display_name": "営業日数 × ７.９"},
      {"value": "04", "display_name": "営業日数 × ７.７５"},
      {"value": "99", "display_name": "その他（任意）"},
    ],
  },
  {
    "name": "allowance_absenteeism_memo",
    "type": "string",
    "label": "欠勤手当",
  },
  {
    "name": "allowance_overtime_memo",
    "type": "string",
    "label": "残業手当",
  },
];

export const list_bp_member_orders_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "案件／対象年月",
  },
  {
    "name": "business_days",
    "type": "integer",
    "label": "営業日数",
  },
  {
    "name": "order_no",
    "type": "string",
    "label": "作業期間／注文番号",
  },
  {
    "name": "order_file",
    "type": "file",
    "label": "注文書",
  },
  {
    "name": "order_request_file",
    "type": "file",
    "label": "注文請書",
  },
  {
    "name": "is_sent",
    "type": "boolean",
    "label": "送信",
  },
];
