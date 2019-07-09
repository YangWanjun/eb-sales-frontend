export const list_member_schema = [
  {
    "name": "code",
    "type": "string",
    "label": "社員コード",
    'searchable': true,
    "sortable": true,
  },
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    'searchable': true,
    "sortable": true,
    "link": '/contract/members/%(id)s/',
  },
  {
    "name": "gender",
    "type": "choice",
    "label": "性別",
    "choices": [
      { "value": "1", "display_name": "男", },
      { "value": "2", "display_name": "女", }
    ],
  },
  {
    "name": "birthday",
    "type": "date",
    "label": "生年月日",
    "sortable": true,
  },
  {
    "name": "join_date",
    "type": "date",
    "label": "入社年月日",
    "sortable": true,
  },
  {
    "name": "member_type",
    "type": "choice",
    "label": "雇用形態",
    "choices": [
      { "value": "1", "display_name": "正社員" },
      { "value": "2", "display_name": "契約社員" },
      { "value": "3", "display_name": "個人事業者" },
      { "value": "4", "display_name": "他社技術者" },
      { "value": "5", "display_name": "パート" },
      { "value": "6", "display_name": "アルバイト" },
      { "value": "7", "display_name": "正社員（試用期間）" },
    ],
    'searchable': true,
    "sortable": true,
  },
  {
    "name": "contract_no",
    "type": "string",
    "label": "契約番号",
    "sortable": true,
    "link": '/contract/members/%(id)s/contracts/%(contract_id)s/',
  },
  {
    "name": "has_insurance",
    "type": "boolean",
    "label": "保険加入",
    "sortable": true,
    'searchable': true,
    "variant": "select",
  },
  {
    "name": "is_retired",
    "type": "boolean",
    "label": "退職",
    "variant": "select",
    "sortable": true,
    'searchable': true,
    'rowStyles': {
      true: {'backgroundColor': 'lightgray'},
    }
  },
];

export const edit_member_schema = [
  {
    "name": "code",
    "type": "string",
    "label": "给料王ID",
    "required": true,
    "max_length": 6,
    "regex": /^\d{6}$/,
  },
  {
    "name": "last_name",
    "type": "string",
    "label": "姓",
    "required": true,
  },
  {
    "name": "first_name",
    "type": "string",
    "label": "名",
    "required": true,
  },
  {
    "name": "last_name_ja",
    "type": "string",
    "label": "姓(フリカナ)",
  },
  {
    "name": "first_name_ja",
    "type": "string",
    "label": "名(フリカナ)",
  },
  {
    "name": "last_name_en",
    "type": "string",
    "label": "姓(ローマ字)",
    "regex": /^[a-zA-Z ]*$/,
  },
  {
    "name": "first_name_en",
    "type": "string",
    "label": "名(ローマ字)",
    "regex": /^[a-zA-Z ]*$/,
  },
  {
    "name": "common_last_name",
    "type": "string",
    "label": "姓(通称名)",
  },
  {
    "name": "common_first_name",
    "type": "string",
    "label": "名(通称名)",
  },
  {
    "name": "common_last_name_ja",
    "type": "string",
    "label": "姓(通称名)(カナ)",
  },
  {
    "name": "common_first_name_ja",
    "type": "string",
    "label": "名(通称名)(カナ)",
  },
  {
    "name": "gender",
    "type": "choice",
    "label": "性別",
    "choices": [
      { "value": "1", "display_name": "男", },
      { "value": "2", "display_name": "女", }
    ],
  },
  {
    "name": "birthday",
    "type": "date",
    "label": "生年月日",
    "required": true,
  },
  {
    "name": "graduate_date",
    "type": "date",
    "label": "卒業年月日",
  },
  {
    'name': 'marriage',
    "type": "choice",
    "label": "婚姻状況",
    "choices": [
      { "value": "0", "display_name": "未婚", },
      { "value": "1", "display_name": "既婚", }
    ]
  },
  {
    "name": "join_date",
    "type": "date",
    "label": "入社年月日",
    "required": true,
  },
  {
    "name": "post_code",
    "type": "string",
    "label": "郵便番号",
    "help_text": '数値だけを入力してください、例：1230034',
    "regex": /^\d{7}$/,
  },
  {
    "name": "address1",
    "type": "string",
    "label": "住所１",
  },
  {
    "name": "address2",
    "type": "string",
    "label": "住所２",
  },
  {
    "name": "nearest_station",
    "type": "string",
    "label": "最寄駅",
  },
  {
    "name": "phone",
    "type": "string",
    "label": "電話番号",
    "help_text": '数値だけを入力してください、例：08012345678',
    "regex": /^\d{10,}$/,
  },
  {
    "name": 'organization',
    "type": "choice",
    "label": "所属部署",
  },
  {
    "name": "email",
    "type": "string",
    "label": "会社メールアドレス",
  },
  {
    "name": "private_email",
    "type": "string",
    "label": "個人メールアドレス",
  },
  {
    "name": "passport_number",
    "type": "string",
    "label": "パスポート番号",
  },
  {
    "name": "passport_expired_dt",
    "type": "date",
    "label": "パスポート有効期限",
  },
  {
    "name": "id_number",
    "type": "string",
    "label": "在留カード番号",
  },
  {
    "name": "id_card_expired_date",
    "type": "date",
    "label": "在留カード期限",
  },
  {
    "name": "residence_type",
    "type": "choice",
    "label": "在留種類",
    "choices": [
      {"value": "01", "display_name": "特定活動"},
      {"value": "02", "display_name": "企業内転勤"},
      {"value": "03", "display_name": "技術・人文知識・国際業務"},
      {"value": "04", "display_name": "高度専門職1号"},
      {"value": "09", "display_name": "高度専門職2号"},
      {"value": "05", "display_name": "永住者"},
      {"value": "06", "display_name": "永住者の配偶者"},
      {"value": "07", "display_name": "日本人の配偶者"},
      {"value": "08", "display_name": "日本籍"},
    ],
  },
  {
    "name": "visa_start_date",
    "type": "date",
    "label": "ビザ有効期限（開始）",
  },
  {
    "name": "visa_expire_date",
    "type": "date",
    "label": "ビザ有効期限（終了）",
  },
  {
    "name": "pay_bank_code",
    "type": "string",
    "label": "銀行コード",
    "max_length": 4,
    "regex": /^\d{4}$/,
  },
  {
    "name": "pay_bank_name",
    "type": "string",
    "label": "銀行名",
  },
  {
    "name": "pay_branch_code",
    "type": "string",
    "label": "銀行支店コード",
    "max_length": 7,
    "regex": /^\d{3,7}$/,
  },
  {
    "name": "pay_branch_name",
    "type": "string",
    "label": "銀行支店名",
  },
  {
    "name": "pay_account",
    "type": "string",
    "label": "口座番号",
    "max_length": 7,
    "regex": /^\d{7}$/,
  },
  {
    "name": "pay_owner",
    "type": "string",
    "label": "口座名義",
  },
  {
    "name": "pay_owner_kana",
    "type": "string",
    "label": "口座名義（カナ）",
  },
];

export const edit_member_layout = [
  'code',
  ['last_name', 'first_name', 'gender'],
  ['last_name_ja', 'first_name_ja', 'last_name_en', 'first_name_en'],
  ['common_last_name', 'common_first_name', 'common_last_name_ja', 'common_first_name_ja'],
  ['birthday', 'graduate_date', 'marriage'],
  ['post_code', 'nearest_station'],
  ['address1', 'address2'],
  'phone',
  ['join_date', 'organization'],
  ['email', 'private_email'],
  ['passport_number', 'passport_expired_dt'],
  ['id_number', 'residence_type', 'id_card_expired_date'],
  ['visa_start_date', 'visa_expire_date'],
  ['pay_bank_code', 'pay_bank_name', 'pay_branch_code', 'pay_branch_name'],
  ['pay_account', 'pay_owner', 'pay_owner_kana'],
];
