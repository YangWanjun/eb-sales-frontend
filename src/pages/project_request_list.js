import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import FormDialog from '../containers/FormDialog';
import {
  list_order_schema,
  edit_order_schema,
  create_form_schema,
} from '../layout/project_request';
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
});

class ProjectRequestList extends React.Component {
  constructor(props) {
    super(props);

    this.createProjectRequest = this.createProjectRequest.bind(this);
    this.onRowAdded = this.onRowAdded.bind(this);
    this.state = { 
      project_detail: {},
      bank_accounts: [],
      request_data: {},
      request_create_url: null,
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id) + '?schema=1';
    common.fetchGet(url_project_detail).then(data => {
      this.setState({
        project_detail: data,
      });
    });

    common.fetchGet(config.api.mst_bank_account_list).then(data => {
      let bank_accounts = [];
      data.results.map(row => (
        bank_accounts.push({value: row.id, display_name: row.branch_name})
      ));
      this.setState({bank_accounts});
    });
  }

  createProjectRequest(data) {
    if (this.showRequestConfirm) {
      this.showRequestConfirm();
      const { params } = this.props.match;
      this.setState({
        request_data: {
          __index__: data.__index__,
          contract_name: data.name,
          order_no: data.order_no,
          bank_account_id: data.bank_account,
        },
        request_create_url: common.formatStr(config.api.project_request_create, params.project_id, data.id, data.year, data.month),
      });
    }
  }

  onRowAdded(row) {
    if (this.handleRowUpdated) {
      this.handleRowUpdated(row);
    }
  }

  render() {
    const { params } = this.props.match;
    const { project_detail, bank_accounts, request_data, request_create_url } = this.state;
    const url = common.formatStr(config.api.project_order_list, params.project_id);
    // 銀行口座の選択肢を設定
    let column = common.getFromJsonList(edit_order_schema, 'name', 'bank_account');
    column.choices = bank_accounts;
    // 注文書追加／編集
    const formOrderProps = {
      schema: edit_order_schema,
      title: '注文書編集',
      data: {
        name: project_detail.name,
      },
      add_url: config.api.project_order_add,
      edit_url: config.api.project_order_detail,
    };
    let col2 = common.getFromJsonList(create_form_schema, 'name', 'bank_account_id');
    col2.choices = bank_accounts;

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
                deleteUrl={config.api.project_order_detail}
                actions={[
                  {
                    'tooltip': '請求書作成',
                    'icon': <NoteAddIcon/>,
                    'handleClick': this.createProjectRequest,
                  },
                ]}
                innerRef={(datatable) => { this.handleRowUpdated = datatable && datatable.handleRowUpdated }}
              />
            );
          } }
        />
        <FormDialog
          innerRef={(dialog) => { this.showRequestConfirm = dialog && dialog.handleOpen }}
          title={'請求書作成'}
          schema={create_form_schema}
          data={request_data}
          add_url={request_create_url}
          onRowAdded={this.onRowAdded}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectRequestList);
