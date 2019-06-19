import React from 'react';
import { Link } from 'react-router-dom'
import { EnhancedTable } from 'mui-enhanced-datatable';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import DetailPanel from '../../containers/detail';
import EnhancedTable2 from '../../containers/EnhancedTable';
import DataProvider from '../../components/Table/DataProvider';
import DataSource from '../../components/DataSource';
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody";
import {
  detail_member_schema,
  edit_member_schema,
  list_organization_schema,
  list_salesperson_schema,
  edit_member_organization_schema,
  edit_salesperson_schema,
} from '../../layout/member';
import {
  checkDepartment,
} from '../common';
import { config } from '../../utils/config';
import { common } from '../../utils/common';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
  },
});

class _MemberDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { 
      member: {},
      organizations: [],
      salesperson: [],
    };
　}

  componentWillMount() {
    this._isMounted = true;
    const { params } = this.props.match;
    const url_member_detail = common.formatStr(config.api.member.detail, params.member_id) + '?schema=1';
    common.fetchGet(url_member_detail).then(data => {
      if (this._isMounted) {
        this.setState({
          member: data,
        });
      }
    });
    // 事業部一覧を初期化する
    common.fetchGet(config.api.organization.list).then(data => {
      let organizations = [];
      data.results.map(row => (
        organizations.push({value: row.id, display_name: row.name, parent: row.parent, disabled: row.is_on_sales !== true})
      ));
      if (this._isMounted) {
        this.setState({organizations});
      }
    });
    // 営業担当一覧を初期化する
    common.fetchGet(config.api.salesperson.list).then(data => {
      let salesperson = [];
      data.results.map(row => (
        salesperson.push({value: row.id, display_name: row.name})
      ));
      if (this._isMounted) {
        this.setState({salesperson});
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render () {
    const { member, organizations, salesperson } = this.state;
    const { params } = this.props.match;
    const formProjectProps = {
      schema: edit_member_schema,
      title: member.full_name + 'を変更',
      edit_url: common.formatStr(config.api.member.detail, params.member_id),
    };
    // 所属部署の設定
    let colOrg = common.getColumnByName(edit_member_organization_schema, 'organization', 'name');
    colOrg['choices'] = organizations;
    const formMemberOrganizationProps = {
      schema: edit_member_organization_schema,
      layout: [],
      title: member.full_name + 'に所属部署を設定',
      checker: [checkDepartment],
      data: {
        member: params.member_id,
        member_name: member.full_name,
      },
      add_url: config.api.organization_period.list,
      edit_url: config.api.organization_period.detail,
    };
    // 営業担当の設定
    let colSalesperson = common.getColumnByName(edit_salesperson_schema, 'salesperson', 'name');
    colSalesperson['choices'] = salesperson;
    const formSalespersonProps = {
      schema: edit_salesperson_schema,
      layout: [],
      title: member.full_name + 'に営業員を設定',
      data: {
        member: params.member_id,
        member_name: member.full_name,
      },
      add_url: config.api.salesperson_period.list,
      edit_url: config.api.salesperson_period.detail,
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member" >作業メンバー一覧</Link>
          <Link to={"/member/" + params.member_id} >{member.full_name}</Link>
          <Typography color="textPrimary">変更</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={member.full_name + 'の詳細情報'}
          data={member}
          schema={detail_member_schema}
          formComponentProps={formProjectProps}
        />
        <Card>
          <CardHeader color="info">
            所属部署
          </CardHeader>
          <CardBody>
            <DataSource
              endpoint={common.formatStr(config.api.member.organizations, params.member_id)}
              render={(initData) => {
                return (
                  <EnhancedTable
                    title='所属部署'
                    tableHead={list_organization_schema}
                    tableData={initData.results}
                    selectable='single'
                    formComponentProps={formMemberOrganizationProps}
                    deleteUrl={config.api.organization_period.detail}
                  />
                );
              }}
            />
          </CardBody>
        </Card>
        <DataProvider 
          endpoint={ common.formatStr(config.api.member.salesperson, params.member_id) } 
          render={ (initData) => {
            return (
              <EnhancedTable2
                tableTitle='営業担当一覧'
                { ...initData }
                columns={list_salesperson_schema}
                isClientSide={true}
                selectable='single'
                formComponentProps={formSalespersonProps}
                deleteUrl={config.api.salesperson_period.detail}
              />
            );
          } }
        />
      </div>
    );
  }
}

const MemberDetail = withStyles(styles)(_MemberDetail);
export { MemberDetail };
