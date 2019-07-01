export const list_member_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "名前",
    'searchable': true,
    "link": "/member/members/%(id)s/",
    "sortable": true,
  },
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
    "sortable": true,
  },
  {
    "name": "department_name",
    "type": "string",
    "label": "部署",
    "sortable": true,
  },
  {
    "name": "section_name",
    "type": "string",
    "label": "課",
    "sortable": true,
  },
  {
    "name": "partner_name",
    "type": "string",
    "label": "協力会社",
    'searchable': true,
    "sortable": true,
  },
  {
    "name": "is_working",
    "type": "boolean",
    "label": "稼働",
    'searchable': true,
    "sortable": true,
  },
  {
    "name": "release_date",
    "type": "date",
    "label": "リリース予定日",
    "sortable": true,
  },
  {
    "name": "salesperson_id",
    "type": "choice",
    "label": "営業員",
    'searchable': true,
    "sortable": true,
    "choices": [],
  },
  {
    "name": "salesoff_reason_name",
    "type": "string",
    "label": "営業対象外",
    "sortable": true,
  },
  {
    "name": "is_retired",
    "type": "boolean",
    "label": "退職",
    "visible": false,
    "rowStyles": {
      1: {'backgroundColor': 'lightgray'}
    },
    'searchable': true,
  },
];

export const list_project_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "案件名称",
    "link": "/project/%(id)s/",
  },
  {
    "name": "start_date",
    "type": "string",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "string",
    "label": "終了日",
  },
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
  },
];

export const list_organization_schema = [
  {
    "name": "division_name",
    "type": "string",
    "label": "事業部",
    "url_field": "url",
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
    "name": "start_date",
    "type": "string",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "string",
    "label": "終了日",
  },
];

export const list_salesperson_schema = [
  {
    "name": "salesperson_name",
    "type": "string",
    "label": "営業員",
  },
  {
    "name": "start_date",
    "type": "string",
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "string",
    "label": "終了日",
  },
];

export const detail_member_schema = [
  {
    "name": "code",
    "type": "string",
    "label": "社員コード",
  },
  {
    "name": "full_name",
    "type": "string",
    "label": "名前",
  },
  {
    "name": "gender",
    "type": "choice",
    "label": "性別",
    "choices": [
      {
        "value": "1",
        "display_name": "男",
      },
      {
        "value": "2",
        "display_name": "女",
      }
    ],
  },
  {
    "name": "country",
    "type": "string",
    "label": "国籍・地域",
  },
  {
    "name": "birthday",
    "type": "date",
    "label": "生年月日",
  },
  {
    "name": "graduate_date",
    "type": "date",
    "label": "卒業年月日",
  },
  {
    "name": "join_date",
    "type": "date",
    "label": "入社年月日",
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
    "name": "post_code",
    "type": "string",
    "label": "郵便番号",
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
    "label": "携帯番号",
  },
  {
    "name": "marriage",
    "type": "choice",
    "label": "婚姻状況",
    "choices": [
      {
        "value": "0",
        "display_name": "未婚",
      },
      {
        "value": "1",
        "display_name": "既婚",
      }
    ]
  },
  {
    "name": "japanese_description",
    "type": "text",
    "label": "日本語能力の説明",
  },
  {
    "name": "certificate",
    "type": "text",
    "label": "資格の説明",
  },
  {
    "name": "skill_description",
    "type": "text",
    "label": "得意",
  },
  {
    "name": "comment",
    "type": "text",
    "label": "備考",
  },
];

export const edit_member_schema = [
  {
    "name": "code",
    "type": "string",
    "label": "社員ID",
    "required": true,
    "max_length": 30,
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
    "name": "gender",
    "type": "choice",
    "label": "性別",
    "choices": [
      {
        "value": "1",
        "display_name": "男",
      },
      {
        "value": "2",
        "display_name": "女",
      }
    ],
  },
  {
    "name": "country",
    "type": "string",
    "label": "国籍・地域",
  },
  {
    "name": "birthday",
    "type": "date",
    "label": "生年月日",
  },
  {
    "name": "graduate_date",
    "type": "date",
    "label": "卒業年月日",
  },
  {
    "name": "join_date",
    "type": "date",
    "label": "入社年月日",
  },
  {
    "name": "email",
    "type": "string",
    "label": "会社メールアドレス",
    "required": true,
  },
  {
    "name": "private_email",
    "type": "string",
    "label": "個人メールアドレス",
  },
  {
    "name": "post_code",
    "type": "string",
    "label": "郵便番号",
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
    "label": "携帯番号",
  },
  {
    "name": "marriage",
    "type": "choice",
    "label": "婚姻状況",
    "choices": [
      {
        "value": "0",
        "display_name": "未婚",
      },
      {
        "value": "1",
        "display_name": "既婚",
      }
    ]
  },
  {
    "name": "japanese_description",
    "type": "text",
    "label": "日本語能力の説明",
  },
  {
    "name": "certificate",
    "type": "text",
    "label": "資格の説明",
  },
  {
    "name": "skill_description",
    "type": "text",
    "label": "得意",
  },
  {
    "name": "comment",
    "type": "text",
    "label": "備考",
  },
];

export const edit_member_organization_schema = [
  {
    "name": "member_name",
    "type": "string",
    "label": "メンバー",
    "read_only": true,
  },
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

export const edit_salesperson_schema = [
  {
    "name": "member_name",
    "type": "string",
    "label": "メンバー",
    "read_only": true,
  },
  {
    "name": "salesperson",
    "type": "choice",
    "label": "営業員",
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

export const list_member_dashboard_salesperson_schema = [
  {
    "name": "name",
    "type": "string",
    "label": "営業",
  },
  {
    "name": "member_count",
    "type": "integer",
    "label": "担当数",
    "link": '/member/members?salesperson_id=%(id)s&is_retired=false'
  },
  {
    "name": "working_count",
    "type": "integer",
    "label": "稼働数",
    "link": '/member/members?salesperson_id=%(id)s&is_working=true&is_retired=false'
  },
  {
    "name": "waiting_count",
    "type": "integer",
    "label": "待機数",
    "link": '/member/members?salesperson_id=%(id)s&is_working=false&is_retired=false'
  },
  {
    "name": "curr_release_count",
    "type": "integer",
    "label": "今月リリース",
  },
  {
    "name": "next_release_count",
    "type": "integer",
    "label": "来月リリース",
  },
  {
    "name": "next_2_release_count",
    "type": "integer",
    "label": "再来月リリース",
  },
];
