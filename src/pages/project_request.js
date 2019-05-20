import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd'
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
      bank_accounts: [],
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

    common.fetchGet(config.api.mst_bank_account_list).then(data => {
      let bank_accounts = [];
      data.results.map(row => (
        bank_accounts.push({value: row.id, display_name: row.branch_name})
      ));
      this.setState({bank_accounts});
    })
  }

  createProjectRequest(selected, results) {
    console.log({selected, results})
  }

  render() {
    const { params } = this.props.match;
    const { project_detail, bank_accounts } = this.state;
    const url = common.formatStr(config.api.project_order_list, params.project_id);
    // 銀行口座の選択肢を設定
    let column = common.getColumnByName(edit_order_schema, 'bank_account', 'name');
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
              />
            );
          } }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProjectRequest);
