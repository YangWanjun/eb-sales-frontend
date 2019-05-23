import React from 'react';
import EnhancedTable from '../containers/dataTable';
import DataProvider from '../components/dataProvider';
import {
  list_member_schema
} from '../layout/member';
import { config } from '../utils/config';


class MemberList extends React.Component {
  render () {
    return (
      <DataProvider
        endpoint={ config.api.member_list }
        render={ (initData) => (
          <EnhancedTable
            tableTitle='作業メンバー一覧'
            { ...initData }
            columns={list_member_schema}
            isClientSide={true}
          />
        ) } 
      />
    );
  }
}

export default MemberList;
