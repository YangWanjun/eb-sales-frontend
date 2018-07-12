import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import { api } from '../utils/config';


class MemberList extends React.Component {
  render () {
    return (
      // <EnhancedTable tableTitle='社員一覧' />
      <DataProvider endpoint={ api.member_list } 
                    render={ data => <EnhancedTable tableTitle='社員一覧' data={data} isSelectable={false} /> } />
    );
  }
}

export default MemberList;
