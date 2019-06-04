export const list_partner_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    "searchable": true,
    "url_field": 'url',
  },
  {
    "name": "president",
    "type": "string",
    "label": "代表者名",
    "searchable": true,
  },
  {
    "name": "address",
    "type": "string",
    "label": "住所",
  },
  {
    "name": "member_count",
    "type": "integer",
    "label": "メンバー数",
  },
  {
    "name": "is_retired",
    "type": "boolean",
    "label": "契約終了",
    "visible": false,
    "searchable": true,
  },
];

export const detail_partner_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "会社名",
  },
  {
    "name": "kana",
    "type": "string",
    "label": "カナ",
  },
  {
    "name": "president",
    "type": "string",
    "label": "代表者名",
  },
  {
    "name": "found_date",
    "type": "string",
    "label": "設立年月日",
  },
  {
    "name": "capital",
    "type": "string",
    "label": "資本金",
  },
  {
    "name": "post_code",
    "type": "string",
    "label": "郵便番号",
  },
  {
    "name": "address",
    "type": "string",
    "label": "住所",
  },
  {
    "name": "tel",
    "type": "string",
    "label": "電話番号",
  },
  {
    "name": "fax",
    "type": "string",
    "label": "ファックス",
  },
];

export const edit_partner_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "会社名",
    "required": true,
  },
  {
    "name": "kana",
    "type": "string",
    "label": "カナ",
  },
  {
    "name": "president",
    "type": "string",
    "label": "代表者名",
  },
  {
    "name": "found_date",
    "type": "date",
    "label": "設立年月日",
  },
  {
    "name": "capital",
    "type": "integer",
    "min_value": 0,
    "label": "資本金",
  },
  {
    "name": "post_code",
    "type": "string",
    "label": "郵便番号",
  },
  {
    "name": "address",
    "type": "string",
    "label": "住所",
  },
  {
    "name": "tel",
    "type": "string",
    "label": "電話番号",
  },
  {
    "name": "fax",
    "type": "string",
    "label": "ファックス",
  },
  {
    "name": "employee_count",
    "type": "integer",
    "label": "従業員数",
    "min_value": 0,
  },
  {
    "name": "sales_amount",
    "type": "integer",
    "label": "売上高",
    "min_value": 0,
  },
  {
    "name": "payment_month",
    "type": "choice",
    "label": "支払いサイト",
    "choices": [
      {"value": "1", "display_name": "翌月"},
      {"value": "2", "display_name": "翌々月"},
      {"value": "3", "display_name": "３月"},
      {"value": "4", "display_name": "４月"},
      {"value": "5", "display_name": "５月"},
      {"value": "6", "display_name": "６月"},
    ],
  },
  {
    "name": "payment_day",
    "type": "choice",
    "label": "支払日",
    "choices": [
      { "value": "01", "display_name": "1日" },
      { "value": "02", "display_name": "2日" },
      { "value": "03", "display_name": "3日" },
      { "value": "04", "display_name": "4日" },
      { "value": "05", "display_name": "5日" },
      { "value": "06", "display_name": "6日" },
      { "value": "07", "display_name": "7日" },
      { "value": "08", "display_name": "8日" },
      { "value": "09", "display_name": "9日" },
      { "value": "10", "display_name": "10日" },
      { "value": "11", "display_name": "11日" },
      { "value": "12", "display_name": "12日" },
      { "value": "13", "display_name": "13日" },
      { "value": "14", "display_name": "14日" },
      { "value": "15", "display_name": "15日" },
      { "value": "16", "display_name": "16日" },
      { "value": "17", "display_name": "17日" },
      { "value": "18", "display_name": "18日" },
      { "value": "19", "display_name": "19日" },
      { "value": "20", "display_name": "20日" },
      { "value": "21", "display_name": "21日" },
      { "value": "22", "display_name": "22日" },
      { "value": "23", "display_name": "23日" },
      { "value": "24", "display_name": "24日" },
      { "value": "25", "display_name": "25日" },
      { "value": "26", "display_name": "26日" },
      { "value": "27", "display_name": "27日" },
      { "value": "28", "display_name": "28日" },
      { "value": "29", "display_name": "29日" },
      { "value": "30", "display_name": "30日" },
      { "value": "99", "display_name": "月末" },
    ]
  },
  {
    "name": "middleman",
    "type": "string",
    "label": "連絡窓口担当者",
  },
  {
    "name": "comment",
    "type": "text",
    "label": "備考",
  },
];

export const list_partner_employee_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    "required": true,
  },
  {
    "name": "email",
    "type": "string",
    "label": "メールアドレス",
  },
  {
    "name": "phone",
    "type": "string",
    "label": "電話番号",
  },
  {
    "name": "member_type",
    "type": "choice",
    "label": "役割担当",
    "choices": [
      { "value": "01", "display_name": "代表取締役社長" },
      { "value": "02", "display_name": "取締役" },
      { "value": "03", "display_name": "営業" },
      { "value": "99", "display_name": "その他" },
    ],
  },
];

export const list_pay_notify_schema = [
  {
    "name": "member_name",
    "type": "string",
    "label": "名前",
  },
  {
    "name": "email",
    "type": "string",
    "label": "メールアドレス",
  },
  {
    "name": "is_cc",
    "type": "boolean",
    "label": "ＣＣに入れて送信",
  },
];

export const edit_pay_notify_schema = [
  {
    "name": "member",
    "type": "choice",
    "label": "名前",
    "required": true,
    "dataSource": '',
  },
  {
    "name": "is_cc",
    "type": "boolean",
    "label": "ＣＣに入れて送信",
  },
];

export const list_bank_account_schema = [
  {
    "name": "bank_name",
    "type": "string",
    "label": "銀行名称",
  },
  {
    "name": "branch_name",
    "type": "string",
    "label": "支店名称",
  },
  {
    "name": "account_type",
    "type": "choice",
    "label": "預金種類",
    "choices": [
      { "value": "1", "display_name": "普通預金" },
      { "value": "2", "display_name": "定期預金" },
      { "value": "3", "display_name": "総合口座" },
      { "value": "4", "display_name": "当座預金" },
      { "value": "5", "display_name": "貯蓄預金" },
      { "value": "6", "display_name": "大口定期預金" },
      { "value": "7", "display_name": "積立定期預金" },
    ]
  },
  {
    "name": "account_number",
    "type": "string",
    "label": "口座番号",
  },
  {
    "name": "account_holder",
    "type": "string",
    "label": "口座名義",
  },
];

export const edit_bank_account_schema = [
  {
    "name": "bank",
    "type": "field",
    "label": "銀行名称",
    "search_url": '/api/bank/?schema=1',
    "display_field": 'bank_name',
    "required": true,
  },
  {
    "name": "branch_no",
    "type": "string",
    "label": "支店番号",
    "required": true,
  },
  {
    "name": "branch_name",
    "type": "string",
    "label": "支店名称",
    "required": true,
  },
  {
    "name": "branch_kana",
    "type": "string",
    "label": "支店カナ",
  },
  {
    "name": "account_type",
    "type": "choice",
    "label": "預金種類",
    "choices": [
      { "value": "1", "display_name": "普通預金" },
      { "value": "2", "display_name": "定期預金" },
      { "value": "3", "display_name": "総合口座" },
      { "value": "4", "display_name": "当座預金" },
      { "value": "5", "display_name": "貯蓄預金" },
      { "value": "6", "display_name": "大口定期預金" },
      { "value": "7", "display_name": "積立定期預金" },
    ],
    "required": true,
  },
  {
    "name": "account_number",
    "type": "string",
    "label": "口座番号",
    "required": true,
  },
  {
    "name": "account_holder",
    "type": "string",
    "label": "口座名義",
  },
];

export const list_monthly_status = [
  {
    "name": "name",
    "type": "string",
    "label": "対象年月",
  },
  {
    "name": "member_count",
    "type": "integer",
    "label": "社員数",
  },
  {
    "name": "amount",
    "type": "integer",
    "label": "支払金額",
  },
  {
    "name": "is_all_sent",
    "type": "boolean",
    "label": "請求書送信済",
  },
];

export const list_members_order_status = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    "url_field": 'url',
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "雇用開始日",
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "雇用終了日",
  },
  {
    "name": "project_name",
    "type": "date",
    "label": "案件名",
  },
  {
    "name": "has_curr_order",
    "type": "boolean",
    "label": "今月",
  },
  {
    "name": "has_next_order",
    "type": "boolean",
    "label": "来月",
  },
  {
    "name": "is_retired",
    "type": "boolean",
    "label": "退職",
  },
];
