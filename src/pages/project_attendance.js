import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DetailPanel from '../containers/detail';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import {
  detail_project_attendance,
  list_project_attendance
} from '../layout/project';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class ProjectAttendance extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      project_detail: {},
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
  }

  render() {
    const { project_detail } = this.state;
    const { params } = this.props.match;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Link to={common.formatStr("/project/%s", params.project_id)} >{ project_detail.name }</Link>
          <Typography color="textPrimary">{params.year}年{params.month}月勤務時間入力</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={project_detail.name}
          data={project_detail}
          schema={detail_project_attendance}
        />
        <DataProvider 
          endpoint={ common.formatStr(config.api.project_attendance, params.project_id, params.year, params.month) } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={common.formatStr('%s年%s月勤務時間', params.year, params.month)}
                { ...initData }
                columns={list_project_attendance}
                selectable='single'
                isClientSide={true}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectAttendance);
