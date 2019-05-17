import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import {
  list_order_schema,
  edit_order_schema,
} from '../layout/project_request';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class ProjectRequest extends React.Component {
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
    const url = common.formatStr(config.api.project_order_list, project_detail.id);
    // 注文書追加／編集
    const formOrderProps = {
      schema: edit_order_schema,
      title: '注文書編集',
      data: {
        name: project_detail.name,
      },
      add_url: config.api.project_attendance_add,
      edit_url: config.api.project_attendance_detial,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/project" >案件一覧</Link>
          <Link to={common.formatStr("/project/%s", project_detail.id)} >{ project_detail.name }</Link>
          <Typography color="textPrimary">注文・請求一覧</Typography>
        </CustomBreadcrumbs>
        <DataProvider 
          endpoint={ url } 
          render={ (initData) => {
            return (
              <EnhancedTable
                tableTitle={common.formatStr('%s 注文・請求履歴', project_detail.name)}
                { ...initData }
                columns={list_order_schema}
                selectable='single'
                isClientSide={true}
                formComponentProps={formOrderProps}
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectRequest);
