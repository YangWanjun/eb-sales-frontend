import React from 'react';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';


class MemberList extends React.Component {
  render () {
    return (
      // <EnhancedTable tableTitle='社員一覧' />
      <DataProvider endpoint='http://127.0.0.1:8000/api/members/' 
                    render={ data => <EnhancedTable tableTitle='社員一覧' data={data} /> } />
    );
  }
}

export default MemberList;
