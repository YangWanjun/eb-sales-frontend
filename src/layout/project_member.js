export const list_schema = [
  {
    "name": "id",
    "type": "integer",
    "label": "ID",
    "visible": false,
  },
  {
    "name": "member_name",
    "type": "string",
    "label": "名前",
    "visible": true,
    'searchable': true,
    "url_field": null
  },
  {
    "name": "start_date",
    "type": "date",
    "label": "開始日",
    "visible": true,
  },
  {
    "name": "end_date",
    "type": "date",
    "label": "終了日",
    "visible": true,
  },
  {
    "name": "price",
    "type": "integer",
    "label": "単価",
    "visible": true,
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "label": "基準時間",
    "visible": true,
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "label": "最大時間",
    "visible": true,
  },
  {
    "name": "minus_per_hour",
    "type": "integer",
    "label": "減（円）",
    "visible": true,
  },
  {
    "name": "plus_per_hour",
    "type": "integer",
    "label": "増（円）",
    "visible": true,
  },
  {
    "name": "hourly_pay",
    "type": "integer",
    "label": "時給",
    "visible": true,
  },
  {
    "name": "role",
    "type": "choice",
    "label": "作業区分",
    "choices": [
      {
        "value": "OP",
        "display_name": "OP：ｵﾍﾟﾚｰﾀｰ"
      },
      {
        "value": "PG",
        "display_name": "PG：ﾌﾟﾛｸﾞﾗﾏｰ"
      },
      {
        "value": "SP",
        "display_name": "SP：ｼｽﾃﾑﾌﾟﾛｸﾞﾗﾏｰ"
      },
      {
        "value": "SE",
        "display_name": "SE：ｼｽﾃﾑｴﾝｼﾞﾆｱ"
      },
      {
        "value": "SL",
        "display_name": "SL：ｻﾌﾞﾘｰﾀﾞｰ"
      },
      {
        "value": "L",
        "display_name": "L：ﾘｰﾀﾞｰ"
      },
      {
        "value": "M",
        "display_name": "M：ﾏﾈｰｼﾞｬｰ"
      }
    ],
    "visible": false,
  },
  {
    "name": "contract_type",
    "type": "choice",
    "label": "契約形態",
    "choices": [
      {
        "value": "01",
        "display_name": "業務委託"
      },
      {
        "value": "02",
        "display_name": "準委任"
      },
      {
        "value": "03",
        "display_name": "派遣"
      },
      {
        "value": "04",
        "display_name": "一括"
      },
      {
        "value": "10",
        "display_name": "出向"
      },
      {
        "value": "99",
        "display_name": "その他"
      }
    ],
    "visible": true,
    'searchable': true,
  },
  {
    "name": "is_working",
    "type": "boolean",
    "label": "稼働中",
    "visible": false,
    "styles": {
      false: {'backgroundColor': 'lightgray'}
    },
    'searchable': true,
  },
  {
    "name": "stages",
    "type": "field",
    "label": "作業工程",
    "visible": false,
  },
  {
    "name": "status",
    "type": "choice",
    "label": "ステータス",
    "choices": [
      {
        "value": "1",
        "display_name": "提案中"
      },
      {
        "value": "2",
        "display_name": "作業確定"
      }
    ],
    "visible": true,
    "styles": {
      '1': {'backgroundColor': '#fff9c4'}
    },
    'searchable': true,
  },
];

export const add_schema = [
  {
    "name": "member",
    "type": "field",
    "required": true,
    "label": "メンバー",
    "search_url": "/api/member/search?schema=1"
  },
  {
    "name": "start_date",
    "type": "date",
    "required": true,
    "label": "開始日",
  },
  {
    "name": "end_date",
    "type": "date",
    "required": true,
    "label": "終了日",
  },
  {
    "name": "price",
    "type": "integer",
    "required": false,
    "label": "単価",
    'min_value': 0,
  },
  {
    "name": "min_hours",
    "type": "decimal",
    "required": false,
    "label": "基準時間",
    'min_value': 0,
    'step': 0.25,
  },
  {
    "name": "max_hours",
    "type": "decimal",
    "required": false,
    "label": "最大時間",
    'min_value': 0,
    'step': 0.25,
  },
  {
    "name": "plus_per_hour",
    "type": "integer",
    "required": false,
    "label": "増（円）",
    'min_value': 0,
  },
  {
    "name": "minus_per_hour",
    "type": "integer",
    "required": false,
    "label": "減（円）",
    'min_value': 0,
  },
  {
    "name": "hourly_pay",
    "type": "integer",
    "required": false,
    "label": "時給",
    "help_text": "時給が設定したら、単価などの精算条件が無視される",
    'min_value': 0,
  },
  {
    "name": "role",
    "type": "choice",
    "required": false,
    "label": "作業区分",
    "choices": [
      {
        "value": "OP",
        "display_name": "OP：ｵﾍﾟﾚｰﾀｰ"
      },
      {
        "value": "PG",
        "display_name": "PG：ﾌﾟﾛｸﾞﾗﾏｰ"
      },
      {
        "value": "SP",
        "display_name": "SP：ｼｽﾃﾑﾌﾟﾛｸﾞﾗﾏｰ"
      },
      {
        "value": "SE",
        "display_name": "SE：ｼｽﾃﾑｴﾝｼﾞﾆｱ"
      },
      {
        "value": "SL",
        "display_name": "SL：ｻﾌﾞﾘｰﾀﾞｰ"
      },
      {
        "value": "L",
        "display_name": "L：ﾘｰﾀﾞｰ"
      },
      {
        "value": "M",
        "display_name": "M：ﾏﾈｰｼﾞｬｰ"
      }
    ],
  },
  {
    "name": "contract_type",
    "type": "choice",
    "required": true,
    "label": "契約形態",
    "choices": [
      {
        "value": "01",
        "display_name": "業務委託"
      },
      {
        "value": "02",
        "display_name": "準委任"
      },
      {
        "value": "03",
        "display_name": "派遣"
      },
      {
        "value": "04",
        "display_name": "一括"
      },
      {
        "value": "10",
        "display_name": "出向"
      },
      {
        "value": "99",
        "display_name": "その他"
      }
    ],
  },
  {
    "name": "stages",
    "type": "choices",
    "required": false,
    "label": "作業工程",
    "choices": [
      // 画面で設定
    ],
  },
  {
    "name": "status",
    "type": "choice",
    "required": true,
    "label": "ステータス",
    "choices": [
      {
        "value": "1",
        "display_name": "提案中"
      },
      {
        "value": "2",
        "display_name": "作業確定"
      }
    ],
  },
];

export const add_layout = [];
