export const add_schema = [
  {
    "type": "integer",
    "required": false,
    "read_only": true,
    "label": "ID",
    "name": "id",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "id"
  },
  {
    "type": "field",
    "required": true,
    "read_only": false,
    "label": "案件",
    "name": "project",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "project"
  },
  {
    "type": "field",
    "required": true,
    "read_only": false,
    "label": "メンバー",
    "name": "member",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "member",
    "search_url": "/api/member/search?schema=1"
  },
  {
    "type": "date",
    "required": false,
    "read_only": false,
    "label": "開始日",
    "name": "start_date",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "start_date"
  },
  {
    "type": "date",
    "required": false,
    "read_only": false,
    "label": "終了日",
    "name": "end_date",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "end_date"
  },
  {
    "type": "integer",
    "required": false,
    "read_only": false,
    "label": "単価",
    "min_value": -2147483648,
    "max_value": 2147483647,
    "name": "price",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "price"
  },
  {
    "type": "decimal",
    "required": false,
    "read_only": false,
    "label": "基準時間",
    "name": "min_hours",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "min_hours"
  },
  {
    "type": "decimal",
    "required": false,
    "read_only": false,
    "label": "最大時間",
    "name": "max_hours",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "max_hours"
  },
  {
    "type": "integer",
    "required": false,
    "read_only": false,
    "label": "増（円）",
    "min_value": -2147483648,
    "max_value": 2147483647,
    "name": "plus_per_hour",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "plus_per_hour"
  },
  {
    "type": "integer",
    "required": false,
    "read_only": false,
    "label": "減（円）",
    "min_value": -2147483648,
    "max_value": 2147483647,
    "name": "minus_per_hour",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "minus_per_hour"
  },
  {
    "type": "integer",
    "required": false,
    "read_only": false,
    "label": "時給",
    "help_text": "時給が設定したら、単価などの精算条件が無視される",
    "min_value": -2147483648,
    "max_value": 2147483647,
    "name": "hourly_pay",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "hourly_pay"
  },
  {
    "type": "choice",
    "required": false,
    "read_only": false,
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
    "name": "role",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "role"
  },
  {
    "type": "choice",
    "required": false,
    "read_only": false,
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
    "name": "contract_type",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "contract_type"
  },
  {
    "type": "choice",
    "required": false,
    "read_only": false,
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
    "name": "status",
    "visible": true,
    "url_field": null,
    "sortable": true,
    "sort_field": "status"
  },
  {
    "type": "datetime",
    "required": false,
    "read_only": true,
    "label": "作成日時",
    "name": "created_dt",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "created_dt"
  },
  {
    "type": "datetime",
    "required": false,
    "read_only": true,
    "label": "更新日時",
    "name": "updated_dt",
    "visible": false,
    "url_field": null,
    "sortable": true,
    "sort_field": "updated_dt"
  },
  {
    "type": "string",
    "required": false,
    "read_only": true,
    "label": "名前",
    "name": "member_name",
    "visible": true,
    "url_field": null
  },
  {
    "type": "string",
    "required": false,
    "read_only": true,
    "label": "案件名称",
    "name": "project__name",
    "visible": false,
    "url_field": null
  },
  {
    "type": "boolean",
    "required": false,
    "read_only": true,
    "label": "稼働中",
    "name": "is_working",
    "visible": false,
    "url_field": null
  },
  {
    "type": "field",
    "required": false,
    "read_only": false,
    "label": "作業工程",
    "name": "stages",
    "visible": false,
    "url_field": null
  }
];

export const add_layout = [];
