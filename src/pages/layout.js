import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { HomeListItems, MemberListItems, ProjectListItems, TurnoverListItems } from './side_menu';
import Status405 from '../containers/status_405';
import Status404 from '../containers/status_404';
import Status500 from '../containers/status_500';
import {
  MemberDashboard, MemberList, MemberPreview, MemberDetail,
} from './member/index';
import OrganizationList from './organization_list';
import OrganizationDetail from './organization_detail';
import PartnerList from './partner_list';
import PartnerDetail from './partner_detail';
import PartnerPreview from './partner_preview';
import PartnerMembers from './partner_members';
import PartnerMemberAdd from './partner_member_add';
import PartnerMember from './partner_member_detail';
import PartnerMemberOrders from './partner_member_orders';
import PartnerMemberOrder from './partner_member_order';
import PartnerOrder from './partner_order';
import PartnerDivisionsByMonth from './partner_divisions_by_month';
import ProjectList from './project_list';
import ProjectDetail from './project_detail';
import ProjectAttendance from './project_attendance';
import ProjectRequestList from './project_request_list';
import ProjectRequestDetail from './project_request_detail';
import TurnoverDashboard from '../dashboard/turnover';
import TurnoverMonthlyList from './turnover_monthly';
import TurnoverMonthlyDetail from './turnover_monthly_detail';
import TurnoverMonthlyCustomerDetail from './turnover_monthly_customer_detail';
import TurnoverMonthlyProjectDetail from './turnover_monthly_project_detail';
import Main from '../containers/main';
import styles from '../assets/jss/views/mainStyle';

class Layout extends React.Component {

  render() {
    return (
      <Main
        sideMenu={
          <React.Fragment>
            <List><HomeListItems /></List>
            <Divider />
            <List><MemberListItems /></List>
            <Divider />
            <List><ProjectListItems /></List>
            <Divider />
            <List><TurnoverListItems /></List>
          </React.Fragment>
        }
        appName={'営業システム'}
      >
        <Switch>
          <Route path='/member/members/:member_id/detail' component={(props) => <MemberDetail {...props}/>} />
          <Route path='/member/members/:member_id/' component={(props) => <MemberPreview {...props}/>} />
          <Route path='/member/members/' component={(props) => <MemberList {...props} />} />
          <Route path='/member' component={(props) => <MemberDashboard {...props}/>} />
          <Route path='/organization/:pk/' component={(props) => <OrganizationDetail {...props}/>} />
          <Route path='/organization' component={(props) => <OrganizationList {...props}/>} />
          <Route path='/partner/:partner_id/order/:order_id' component={(props) => <PartnerOrder {...props}/>} />
          <Route path='/partner/:pk/member/add' component={(props) => <PartnerMemberAdd {...props}/>} />
          <Route path='/partner/:pk/detail' component={(props) => <PartnerDetail {...props}/>} />
          <Route path='/partner/:partner_id/division/:year/:month' component={(props) => <PartnerDivisionsByMonth {...props}/>} />
          <Route path='/partner/:partner_id/members/:member_id/orders/:order_id' component={(props) => <PartnerMemberOrder {...props}/>} />
          <Route path='/partner/:partner_id/members/:member_id/orders' component={(props) => <PartnerMemberOrders {...props}/>} />
          <Route path='/partner/:partner_id/members/:member_id' component={(props) => <PartnerMember {...props}/>} />
          <Route path='/partner/:pk/members' component={(props) => <PartnerMembers {...props}/>} />
          <Route path='/partner/:pk' component={(props) => <PartnerPreview {...props}/>} />
          <Route path='/partner' component={(props) => <PartnerList {...props}/>} />
          <Route path='/project/:project_id/attendance/:year/:month' component={(props) => <ProjectAttendance {...props}/>} />
          <Route path='/project/:project_id/request/:request_no' component={(props) => <ProjectRequestDetail {...props}/>} />
          <Route path='/project/:project_id/request' component={(props) => <ProjectRequestList {...props}/>} />
          <Route path='/project/:project_id/' component={(props) => <ProjectDetail {...props}/>} />
          <Route path='/project' component={(props) => <ProjectList {...props}/>} />
          <Route path='/turnover/month/:ym/project/:project_id' component={(props) => <TurnoverMonthlyProjectDetail {...props}/>} />
          <Route path='/turnover/month/:ym/customer/:customer_id' component={(props) => <TurnoverMonthlyCustomerDetail {...props}/>} />
          <Route path='/turnover/monthly/:ym' component={(props) => <TurnoverMonthlyDetail {...props}/>} />
          <Route path='/turnover/monthly' component={(props) => <TurnoverMonthlyList {...props}/>} />
          <Route path='/turnover' component={(props) => <TurnoverDashboard {...props}/>} />
          <Route exact path='/forbidden' component={(props) => <Status405 {...props}/>} />
          <Route exact path='/notfound' component={(props) => <Status404 {...props}/>} />
          <Route exact path='/error' component={(props) => <Status500 {...props}/>} />
        </Switch>
      </Main>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
