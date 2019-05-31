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