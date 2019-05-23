import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import { config } from '../utils/config';
import { common } from '../utils/common';

class TurnoverMonthlyProjectDetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = { project_detail: {client: {}} };
  }

  componentDidMount() {
    const { params } = this.props.match;
    const url_project_detail = common.formatStr(config.api.project_detail, params.project_id);
    common.fetchGet(url_project_detail).then(data => {
      this.setState({ project_detail: data, })
    });
  }

  render () {
    const urlParams = common.parseQuerystring(this.props.location.search, '&', '=', true);
    const { project_detail } = this.state;
    const { params } = this.props.match;
    const tableTitle = project_detail.name;
    const parentTitle = params.ym.substring(0, 4) + '年' + params.ym.substring(4, 6) + '月売上詳細';
    const api_url = config.api.turnover_project_by_month 
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6)
      + '&project_id=' + params.project_id;
    const summaryUrl = common.formatStr(config.api.turnover_client_by_month_detail, params.project_id)
      + '?year=' + params.ym.substring(0, 4) 
      + '&month=' + params.ym.substring(4, 6);

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/turnover" >売上情報</Link>
          <Link to="/turnover/monthly" >月別売上一覧</Link>
          <Link to={"/turnover/monthly/" + params.ym} >{parentTitle}</Link>
          <Link to={"/turnover/month/" + params.ym + '/client/' + project_detail.client.id} >{project_detail.client.name}</Link>
          <Typography color="textPrimary">{tableTitle}</Typography>
        </CustomBreadcrumbs>
        <DataProvider
          endpoint={ api_url }
          params={urlParams}
          summaryUrl={ summaryUrl }
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

export default TurnoverMonthlyProjectDetail;
