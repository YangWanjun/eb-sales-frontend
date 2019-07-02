import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import DetailPanel from '../../containers/detail';
import DataSource from '../../components/DataSource';
import DataTable from '../../containers/DataTable';
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

    this.handleDataUpdated = this.handleDataUpdated.bind(this);
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
  
  handleDataUpdated(newData) {
    let { member } = this.state;
    Object.assign(member, newData);
    this.setState({member});
  }

  render () {
    const { member, organizations, salesperson } = this.state;
    const { params } = this.props.match;
    const formProjectProps = {
      schema: edit_member_schema,
      title: member.full_name + 'を変更',
      put_url: common.formatStr(config.api.member.detail, params.member_id),
    };
    // 所属部署の設定
    let colOrg = common.getColumnByName(edit_member_organization_schema, 'organization', 'name');
    colOrg['choices'] = organizations;
    // 営業担当の設定
    let colSalesperson = common.getColumnByName(edit_salesperson_schema, 'salesperson', 'name');
    colSalesperson['choices'] = salesperson;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member/">メンバー管理</Link>
          <Link to="/member/members/" >作業メンバー一覧</Link>
          <Link to={"/member/members/" + params.member_id} >{member.full_name}</Link>
          <Typography color="textPrimary">変更</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={member.full_name + 'の詳細情報'}
          data={member}
          schema={detail_member_schema}
          formComponentProps={formProjectProps}
          sendDataUpdated={this.handleDataUpdated}
        />
        <Card>
          <CardHeader color='info'>
            所属部署
          </CardHeader>
          <CardBody>
            <DataSource
              endpoint={common.formatStr(config.api.member.organizations, params.member_id)}
              render={(initData) => {
                return (
                  <DataTable
                    title='所属部署'
                    tableHead={list_organization_schema}
                    tableData={initData.results}
                    selectable='single'
                    addOption={{
                      'tooltip': '所属部署を追加',
                      'schema': edit_member_organization_schema,
                      'title': member.full_name + 'に所属部署を追加',
                      'data': {
                        member: params.member_id,
                        member_name: member.full_name,
                      },
                      'checker': [checkDepartment],
                      'post_url': config.api.organization_period.list,
                    }}
                    editOption={{
                      'tooltip': '所属部署を変更',
                      'schema': edit_member_organization_schema,
                      'title': member.full_name + 'に所属部署を変更',
                      'checker': [checkDepartment],
                      'put_url': config.api.organization_period.detail,
                    }}
                    deleteOption={{
                      'tooltip': '所属部署を削除',
                      'verbose_name': '%(division_name)s（%(start_date)s～%(end_date)s）',
                      'delete_url': config.api.organization_period.detail,
                    }}
                  />
                );
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader color='info'>
            営業担当一覧
          </CardHeader>
          <CardBody>
            <DataSource
              endpoint={common.formatStr(config.api.member.salesperson, params.member_id)}
              render={(initData) => {
                return (
                  <DataTable
                    title='営業担当一覧'
                    tableHead={list_salesperson_schema}
                    tableData={initData.results}
                    selectable='single'
                    addOption={{
                      'tooltip': '営業担当を追加',
                      'schema': edit_salesperson_schema,
                      'title': member.full_name + 'に営業担当を追加',
                      'data': {
                        member: params.member_id,
                        member_name: member.full_name,
                      },
                      'post_url': config.api.salesperson_period.list,
                    }}
                    editOption={{
                      'tooltip': '営業担当を変更',
                      'schema': edit_salesperson_schema,
                      'title': member.full_name + 'に営業担当を変更',
                      'put_url': config.api.salesperson_period.detail,
                    }}
                    deleteOption={{
                      'tooltip': '営業担当を削除',
                      'verbose_name': '%(salesperson_name)s（%(start_date)s～%(end_date)s）',
                      'delete_url': config.api.salesperson_period.detail,
                    }}
                  />
                );
              } }
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

const MemberDetail = withStyles(styles)(_MemberDetail);
export { MemberDetail };
