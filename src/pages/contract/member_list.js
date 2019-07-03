import React from 'react';
import { EnhancedTable } from '../../datatable/index';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DataSource from '../../components/DataSource';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import {
  list_member_schema,
} from '../../layout/contract_member';
import { config } from '../../utils/config';
import { common } from '../../utils/common';

class MemberList extends React.Component {

  getDefaultFilter() {
    const { location } = this.props;
    if (location && location.search) {
      const params = common.loadFilters(location);
      return params;
    } else {
      return {is_retired: false};
    }
  }

  render() {
    const filters = this.getDefaultFilter();

    return (
      <div>
        <Card>
          <CardHeader color="info">
            社員一覧
          </CardHeader>
          <CardBody>
            <DataSource
              endpoint={ config.api.contract.member_list }
              render={ (initData) => (
                <EnhancedTable
                  title='作業メンバー一覧'
                  tableHead={list_member_schema}
                  tableData={initData.results}
                  rowsPerPage={config.rowsPerPage}
                  pushpinTop={common.getFixedHeaderHeight()}
                  filters={filters}
                  allowCsv={true}
                  tableActions={[
                    {
                      'tooltip': '社員を追加',
                      'icon': <PersonAddIcon/>,
                      'handleClick': () => (common.redirect('/contract/members/add/')),
                    },
                  ]}
                />
              ) } 
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export { MemberList };
