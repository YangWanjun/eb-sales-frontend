import React from 'react';
import { Link } from 'react-router-dom'
import { EnhancedTable } from '../../datatable/index';
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import DataSource from '../../components/DataSource';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import {
  list_member_schema
} from '../../layout/member';
import { config } from '../../utils/config';
import { common } from '../../utils/common';


class MemberList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      salesperson_list: [],
    };
  }

  componentWillMount() {
    this._isMounted = true;
    // 営業担当一覧を初期化する
    common.fetchGet(config.api.salesperson.list).then(data => {
      let salesperson_list = [];
      data.results.map(row => (
        salesperson_list.push({value: row.id, display_name: row.name})
      ));
      if (this._isMounted) {
        this.setState({salesperson_list});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getDefaultFilter() {
    const { location } = this.props;
    if (location && location.search) {
      const params = common.loadFilters(location);
      if ('salesperson_id' in params) {
        params['salesperson_id'] = common.toInteger(params['salesperson_id']);
      }
      return params;
    } else {
      return {is_retired: false};
    }
  }

  render () {
    const { salesperson_list } = this.state;
    const filters = this.getDefaultFilter();
    // 営業担当の設定
    let colSalesperson = common.getFromJsonList(list_member_schema, 'name', 'salesperson_id');
    colSalesperson['choices'] = salesperson_list;
    
    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member" >メンバー管理</Link>
          <Typography color="textPrimary">メンバー一覧</Typography>
        </CustomBreadcrumbs>
        <Card>
          <CardHeader color="info">
            メンバー一覧
          </CardHeader>
          <CardBody>
            <DataSource
              endpoint={ config.api.member.quick_list }
              render={ (initData) => (
                <EnhancedTable
                  title='作業メンバー一覧'
                  tableHead={list_member_schema}
                  tableData={initData.results}
                  rowsPerPage={config.rowsPerPage}
                  pushpinTop={common.getFixedHeaderHeight()}
                  filters={filters}
                  allowCsv={true}
                  urlReflect={false}
                />
              ) } 
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export {MemberList};
