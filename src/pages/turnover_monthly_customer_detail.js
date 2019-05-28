import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import {
  list_projects_schema,
} from '../layout/turnover';
import { config } from '../utils/config';
import { common } from '../utils/common';

class TurnoverMonthlyCustomerDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { customer_detail: {} };
  }

  componentDidMount() {
    const { params } = this.props.match;
    const url_customer_detail = common.formatStr(config.api.customer_detail, params.customer_id);
    common.fetchGet(url_customer_detail).then(data => {
      this.setState({ customer_detail: data, })
    });
  }

  render () {
    const urlParams = common.parseQuerystring(this.props.location.search, '&', '=', true);
    const { customer_detail } = this.state;
    const { params } = this.props.match;
    const tableTitle = customer_detail.name;
    const parentTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = config.api.turnover_customer_by_month 
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6)
      + '&customer_id=' + params.customer_id;
    const summaryUrl = common.formatStr(config.api.turnover_customers_by_month_detail, params.customer_id)
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6);

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Link to="/turnover/monthly" >月別売上一覧</Link>
          <Link to={"/turnover/monthly/" + params.ym} >{parentTitle}</Link>
          <Typography color="textPrimary">{tableTitle}</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ api_url }
          summaryUrl={ summaryUrl }
          params={urlParams}
          render={ (initData) => (
            <EnhancedTable
              tableTitle={tableTitle}
              { ...initData }
              columns={list_projects_schema}
              endpoint={ this.props.location.pathname }
            />
          ) } 
        />
      </div>
    );
  }
}

export default TurnoverMonthlyCustomerDetail;
