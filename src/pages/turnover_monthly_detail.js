import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../components/dataTable';
import DataProvider from '../components/dataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import { config } from '../utils/config';


class TurnoverMonthlyDetail extends React.Component {

  render () {
    const { params } = this.props.match;
    const tableTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = config.api.turnover_clients_by_month + '?year=' + params.ym.substring(0, 4) + '&month=' + params.ym.substring(4, 6);
    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Link to="/turnover/monthly" >月別売上一覧</Link>
          <Typography color="textPrimary">{tableTitle}</Typography>
        </CustomBreadcrumbs>
        <DataProvider endpoint={ api_url } 
                    render={ (data, filters, handleDataRedraw) => <EnhancedTable tableTitle={tableTitle} data={data} filters={filters} onDataRedraw={handleDataRedraw} isSelectable={false} /> } />
      </div>
    );
  }
}

export default TurnoverMonthlyDetail;
