import React from 'react';
import { Link } from 'react-router-dom'
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import DetailPanel from '../../containers/detail';
import {
  edit_member_schema,
  edit_member_layout,
} from '../../layout/contract_member';
import { common } from '../../utils/common';
import { config } from '../../utils/config';

class MemberDetail extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleDataUpdated = this.handleDataUpdated.bind(this);
    this.state = { 
      member: {},
    };
　}

  componentWillMount() {
    this._isMounted = true;
    const { params } = this.props.match;
    const url_member_detail = common.formatStr(config.api.member.detail, params.pk);
    common.fetchGet(url_member_detail).then(data => {
      document.title = `${data.full_name} | 社員情報 | ${window.appName}`;
      if (this._isMounted) {
        this.setState({
          member: data,
        });
      }
    });
  }

  handleDataUpdated(newData) {
    let { member } = this.state;
    Object.assign(member, newData);
    this.setState({member});
  }

  render() {
    const { params } = this.props.match;
    const { member } = this.state;

    const formMemberProps = {
      schema: edit_member_schema,
      title: member.full_name + 'を変更',
      put_url: common.formatStr(config.api.member.detail, params.pk),
    };

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/contract/members/" >社員一覧</Link>
          <Typography color="textPrimary">{member.full_name}</Typography>
        </CustomBreadcrumbs>
        <DetailPanel
          title={member.full_name + 'の詳細情報'}
          data={member}
          schema={edit_member_schema}
          layout={edit_member_layout}
          formComponentProps={formMemberProps}
          sendDataUpdated={this.handleDataUpdated}
        />
      </div>
    );
  }
}

export {MemberDetail};
