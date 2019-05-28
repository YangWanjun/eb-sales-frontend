import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import {
  list_customers_monthly_schema,
} from '../layout/turnover';
import { config } from '../utils/config';
import { common } from '../utils/common';

class TurnoverMonthlyDetail extends React.Component {

  render () {
    const urlParams = common.parseQuerystring(this.props.location.search, '&', '=', true);
    const { params } = this.props.match;
    const tableTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = config.api.turnover_customers_by_month + '?year=' + params.ym.substring(0, 4) + '&month=' + params.ym.substring(4, 6);

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Link to="/turnover/monthly" >月別売上一覧</Link>
          <Typography color="textPrimary">{tableTitle}</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ api_url }
          params={urlParams}
          render={ (initData) => (
            <EnhancedTable
              tableTitle={tableTitle}
              { ...initData }
              columns={list_customers_monthly_schema}
              endpoint={ this.props.location.pathname }
            />
          ) } 
        />
      </div>
    );
  }
}

export default TurnoverMonthlyDetail;
