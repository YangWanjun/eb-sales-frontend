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
