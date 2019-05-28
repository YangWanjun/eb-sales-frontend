import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import {
  list_monthly_schema,
} from '../layout/turnover';
import { config } from '../utils/config';
import { common } from '../utils/common';

class TurnoverMonthlyList extends React.Component {
  render () {
    const params = common.parseQuerystring(this.props.location.search, '&', '=', true);

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Typography color="textPrimary">月別売上一覧</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ config.api.turnover_monthly_list }
          params={params}
          render={ (initData) => (
            <EnhancedTable
              tableTitle='月別売上一覧'
              { ...initData }
              columns={list_monthly_schema}
              endpoint={ this.props.location.pathname }
            />
          ) } 
        />
      </div>
    );
  }
}

export default TurnoverMonthlyList;
