import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import { config } from '../utils/config';

class TurnoverMonthlyList extends React.Component {
  render () {
    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Typography color="textPrimary">月別売上一覧</Typography>
        </CustomBreadcrumbs>
        <DataProvider endpoint={ config.api.turnover_monthly_list } 
                      render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle='月別売上一覧' data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
      </div>
    );
  }
}

export default TurnoverMonthlyList;
