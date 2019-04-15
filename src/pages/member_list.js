import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { config } from '../utils/config';


class MemberList extends React.Component {
  render () {
    return (
      <DataProvider
        endpoint={ config.api.member_list }
        render={ (initData) => (
          <EnhancedTable
            tableTitle='社員一覧'
            { ...initData }
          />
        ) } 
      />
    );
  }
}

export default MemberList;
