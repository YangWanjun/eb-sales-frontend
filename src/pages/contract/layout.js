import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../../containers/main';
import {
  List,
  Divider,
} from '@material-ui/core';
import {
  HomeListItems,
  PeopleListItems,
} from './side_menu';
import {
  MemberList,
  MemberAdd,
  MemberDetail,
  MemberContract,
} from './index';

class Layout extends React.Component {
  
  render() {
    return (
      <Main
        sideMenu={
          <React.Fragment>
            <List><HomeListItems /></List>
            <Divider />
            <List><PeopleListItems /></List>
          </React.Fragment>
        }
        appName={'契約システム'}
      >
        <Switch>
          <Route path='/contract/members/add/' component={MemberAdd} />
          <Route path='/contract/members/:pk/contracts/add' component={(props) => (<MemberContract {...props} />)} />
          <Route path='/contract/members/:pk/contracts/:contract_id/' component={(props) => (<MemberContract {...props} />)} />
          <Route path='/contract/members/:pk/' component={MemberDetail} />
          <Route path='/contract/members/' component={MemberList} />
        </Switch>
      </Main>
    );
  }
}

export default Layout;