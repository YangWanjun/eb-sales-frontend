export const edit_contract_schema = [
  {
    "name": "member_name",
    "type": "string",
    "label": "社員",
    "read_only": true,
  },
  {
    "name": "contract_no",
    "type": "string",
    "label": "契約番号",
    "read_only": true,
    "required": true,
  },
  {
    "name": "contract_date",
    "type": "date",
    "label": "契約日",
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
    "required": true,
  },
  {
    "name": "is_auto_update",
    "type": "boolean",
    "label": "自動更新",
    "default": true,
  },
  {
    "name": "member_type",
    "type": "choice",
    "label": "雇用形態",
    "required": true,
    "choices": [
      { "value": "1", "display_name": "正社員" },
      { "value": "2", "display_name": "契約社員" },
      { "value": "3", "display_name": "個人事業者" },
      { "value": "4", "display_name": "他社技術者" },
      { "value": "5", "display_name": "パート" },
      { "value": "6", "display_name": "アルバイト" },
      { "value": "7", "display_name": "正社員（試用期間）" },
    ],
  },
  {
    "name": "is_loan",
    "type": "boolean",
    "label": "出向",
  },
  {
    "name": "insurance",
    "type": "choice",
    "label": "社会保険加入有無",
    "choices": [
      { "value": "1", "display_name": "加入する" },
      { "value": "0", "display_name": "加入しない" },
    ],
  },
  {
    "name": "calculate_type",
    "type": "choice",
    "label": "時間計算種類",
    "choices": [
      { "value": "01", "display_name": "固定１６０時間" },
      { "value": "02", "display_name": "営業日数 × ８" },
      { "value": "03", "display_name": "営業日数 × ７.９" },
      { "value": "04", "display_name": "営業日数 × ７.７５" },
      { "value": "99", "display_name": "その他（任意）" },
    ],
    "default": '01',
  },
];

export const edit_contract_layout = [
  'member_name',
  ['contract_no', 'is_auto_update'],
  ['contract_date', 'start_date', 'end_date'],
  ['member_type', 'insurance', 'is_loan'],
  ['calculate_type'],
];

export const edit_contract_allowance = [
  {
    "name": "name",
    "type": "string",
    "label": "手当名称",
    "required": true,
    "read_only": true,
  },
  {
    "name": "amount",
    "type": "integer",
    "label": "金額",
    "required": true,
  },
  {
    "name": "unit",
    "type": "choice",
    "label": "単位",
    "required": true,
    "choices": [
      { "value": "01", "display_name": "円/月" },
      { "value": "02", "display_name": "円/年" },
      { "value": "03", "display_name": "円/時間" },
      { "value": "10", "display_name": "時間" },
    ],
  },
  {
    "name": "comment",
    "type": "string",
    "label": "コメント",
  },
];
