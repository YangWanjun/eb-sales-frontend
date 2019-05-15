import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
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
      </div>
    );
  }
}

export default withStyles(styles)(ProjectAttendance);
