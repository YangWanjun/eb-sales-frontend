import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Paper,
  Toolbar,
} from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import SendIcon from '@material-ui/icons/Send'
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import DataProvider from '../components/Table/DataProvider';
import HierarchyTable from '../components/Table/HierarchyTable';
import EnhancedTable from '../containers/EnhancedTable';
import {
  list_partner_divsion_schema,
  list_partner_division_details_schema,
} from '../layout/partner';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { history } from '../utils/store';

const styles = () => ({
});

class PartnerDivisionsByMonth extends React.Component {

  constructor(props) {
    super(props);

    this.onDivisionClick = this.onDivisionClick.bind(this);
    this.state = { 
      partner: {},
      order: {},
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_detail = common.formatStr(config.api.partner_detail, params.partner_id);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
  }

  onDivisionClick(data) {
    const { params } = this.props.match;
    let urlData = {
      'pathname': common.formatStr('/partner/%s/division/%s/%s', params.partner_id, params.year, params.month),
    };
    if (data) {
      urlData['search'] = common.jsonToUrlParameters({division_id: data.division_id || 0});
    }
    history.push(urlData);
  }

  getDetialUrl() {
    const { params } = this.props.match;
    const queryData = common.parseQuerystring(this.props.location.search, '&', '=', true);
    let url_details = common.formatStr(
      config.api.partner_divisions_all_by_month,
      params.partner_id,
      params.year,
      params.month
    );
    if (!common.isEmpty(queryData)) {
      url_details = common.formatStr(
        config.api.partner_divisions_detail_by_month,
        params.partner_id,
        queryData.division_id || 0,
        params.year,
        params.month,
      );
    }
    return url_details;
  }

  createPayNotifyAndRequest(data) {
    
  }

  render() {
    const { params } = this.props.match;
    const { partner } = this.state;
    const url_details = this.getDetialUrl();

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.partner_id} >{partner.name}</Link>
          <Typography color="textPrimary">{params.year + '年' + params.month + '月の支払と請求状況'}</Typography>
        </CustomBreadcrumbs>
        <Paper style={{marginBottom: 24,}}>
          <Toolbar>
            <Typography variant="title">
              {'事業部ごとの支払通知書及び請求書'}
            </Typography>
          </Toolbar>
          <DataProvider
            endpoint={ common.formatStr(config.api.partner_divisions_by_month, params.partner_id, params.year, params.month) }
            render={ (initData) => (
              <HierarchyTable
                tableHead={list_partner_divsion_schema}
                tableData={initData.data.results}
                actionsTrigger={(data) => (data.division_id !== null)}
                rowActions={[
                  {
                    'icon': <NoteAddIcon />,
                    'tooltip': '注文書と注文請書を作成',
                    'handleClick': this.createPayNotifyAndRequest,
                    'trigger': (data) => (data.parent === null),
                  },
                ]}
                tableActions={[
                  {
                    'icon': <SendIcon />,
                    'tooltip': '注文書と注文請書を送信',
                    'handleClick': this.sendMemberOrder,
                  },
                ]}
                innerRef={(datatable) => { this.handleRowUpdated = datatable && datatable.handleRowUpdated }}
                selectable='single'
                onRowClick={this.onDivisionClick}
              />
            ) }
          />
        </Paper>
        <DataProvider
          endpoint={ url_details }
          render={ (initData) => (
            <EnhancedTable
              tableTitle='詳細情報'
              { ...initData }
              columns={list_partner_division_details_schema}
              isClientSide={true}
            />
          ) }
        />
      </div>
    );
  }
}

export default withStyles(styles)(PartnerDivisionsByMonth);
