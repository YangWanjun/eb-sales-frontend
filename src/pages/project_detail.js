import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../components/Detail';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import { detail_project_schema, edit_project_schema } from '../layout/project_list';
import { list_schema, add_project_member_schema, add_layout } from '../layout/project_member';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cellHeader: {
    textAlign: 'right',
    width: '25%',
    minWidth: 100,
  },
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      project_detail: {},
      columns: [],
      project_stages: [],
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
      this.setState({
        project_detail: data,
        columns: data.columns,
      });
    });
    // 作業工程の選択肢を取得
    common.fetchGet(config.api.project_stage_list).then(data => {
      let project_stages = [];
      data.results.map(row => (
        project_stages.push({value: row.id, display_name: row.name})
      ));
      this.setState({project_stages});
    });
  }

  checkAssignDate(data) {
    const {start_date, end_date} = data;
    if (start_date && end_date && start_date > end_date) {
      return [
        {name: 'start_date', message: common.formatStr(constant.ERROR.DATE_CONTRADICT, '開始日', '終了日')},
        {name: 'end_date', message: common.formatStr(constant.ERROR.DATE_CONTRADICT, '開始日', '終了日')},
      ];
    } else {
      return true;
    }
  }

  calcPlusMinus(name, data) {
    if (['price', 'min_hours', 'max_hours'].indexOf(name) > -1) {
      const {price, min_hours, max_hours} = data;
      const plus_per_hour = Math.round(price / max_hours);
      const minus_per_hour = Math.round(price / min_hours);
      return { minus_per_hour, plus_per_hour };
    } else {
      return null;
    }
  }

  render () {
    const { project_detail, project_stages } = this.state;
    const { params } = this.props.match;

    // 作業工程の選択肢を設定
    let column = common.getColumnByName(add_project_member_schema, 'stages', 'name');
    column.choices = project_stages;
    // メンバー追加設定
    const formMemberProps = {
      schema: add_project_member_schema,
      layout: add_layout,
      title: project_detail.name + 'にメンバー追加',
      checker: [this.checkAssignDate],
      onChanges: [this.calcPlusMinus],
      data: {
        project: project_detail.id,
        min_hours: project_detail.min_hours,
        max_hours: project_detail.max_hours,
      },
      add_url: config.api.project_member_list,
      edit_url: config.api.project_member_edit + '?project=' + params.project_id,
    };
    // 案件編集
    const formProjectProps = {
      schema: edit_project_schema,
      title: project_detail.name + 'を変更',
      edit_url: common.formatStr(config.api.project_detail, project_detail.id),
    }

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Typography color="textPrimary">{ project_detail.name }</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={project_detail.name}
          data={project_detail}
          schema={detail_project_schema}
          formComponentProps={formProjectProps}
        />
        <DataProvider 
          endpoint={ config.api.project_member_list + '?project=' + params.project_id } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='メンバー一覧'
                { ...initData }
                columns={list_schema}
                isClientSide={true}
                selectable='multiple'
                formComponentProps={formMemberProps}
                deleteUrl={config.api.project_member_delete + '?project=' + params.project_id}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectDetail);
