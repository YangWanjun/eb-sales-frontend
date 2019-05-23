import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import { config } from '../utils/config';
import { common } from '../utils/common';

class TurnoverMonthlyClientDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { client_detail: {} };
  }

  componentDidMount() {
    const { params } = this.props.match;
    const url_client_detail = common.formatStr(config.api.client_detail, params.client_id);
    common.fetchGet(url_client_detail).then(data => {
      this.setState({ client_detail: data, })
    });
  }

  render () {
    const urlParams = common.parseQuerystring(this.props.location.search, '&', '=', true);
    const { client_detail } = this.state;
    const { params } = this.props.match;
    const tableTitle = client_detail.name;
    const parentTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = config.api.turnover_client_by_month 
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6)
      + '&client_id=' + params.client_id;
    const summaryUrl = common.formatStr(config.api.turnover_clients_by_month_detail, params.client_id)
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
              endpoint={ this.props.location.pathname }
            />
          ) } 
        />
      </div>
    );
  }
}

export default TurnoverMonthlyClientDetail;
