import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../containers/detail';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import { detail_project_schema, detail_project_lump_schema, edit_project_schema } from '../layout/project';
import {
  project_member_list_schema,
  add_project_member_schema,
  add_layout,
  project_attendance_list_schema,
} from '../layout/project_member';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
});

class ProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.handleDataUpdated = this.handleDataUpdated.bind(this);
    this.state = { 
      project_detail: {},
      columns: [],
      project_stages: [],
      organizations: [],
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
    // 部署一覧
    common.fetchGet(config.api.organization_list + '?is_on_sales=true').then(data => {
      let organizations = [];
      data.results.map(row => (
        organizations.push({value: row.id, display_name: row.name, parent: row.parent})
      ));
      this.setState({organizations});
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

  handleDataUpdated(newData) {
    let { project_detail } = this.state;
    Object.assign(project_detail, newData);
    this.setState({project_detail});
  }

  render () {
    const { classes } = this.props;
    const { project_detail, project_stages, organizations } = this.state;
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
    let col_org = common.getColumnByName(edit_project_schema, 'organization', 'name');
    col_org['choices'] = organizations;
    const formProjectProps = {
      schema: edit_project_schema,
      title: project_detail.name + 'を変更',
      edit_url: common.formatStr(config.api.project_detail, project_detail.id),
    };
    const buttons = [
      (
        <Link key='project_request' to={common.formatStr('/project/%s/request', project_detail.id)}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            請求書一覧
          </Button>
        </Link>
      ),
    ];

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Typography color="textPrimary">{ project_detail.name }</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={project_detail.name}
          data={project_detail}
          schema={project_detail.is_lump ? detail_project_lump_schema : detail_project_schema}
          formComponentProps={formProjectProps}
          sendDataUpdated={this.handleDataUpdated}
          deleteUrl={common.formatStr(config.api.project_detail, project_detail.id)}
          buttons={buttons}
        />
        <DataProvider 
          endpoint={ config.api.project_member_list + '?project=' + params.project_id } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle='メンバー一覧'
                { ...initData }
                columns={project_member_list_schema}
                isClientSide={true}
                selectable='multiple'
                formComponentProps={formMemberProps}
                deleteUrl={config.api.project_member_delete + '?project=' + params.project_id}
              />
            );
          } }
        />
        { project_detail.id ? (
          <DataProvider 
            endpoint={ common.formatStr(config.api.project_attendance_list, project_detail.id)} 
            render={ (initData) => {
              return (
                <EnhancedTable
                  tableTitle='出勤年月一覧'
                  { ...initData }
                  columns={project_attendance_list_schema}
                  isClientSide={true}
                  selectable='none'
                />
              );
            } }
          />
        ) : <React.Fragment />}
      </div>
    );
  }
}

export default withStyles(styles)(ProjectDetail);
