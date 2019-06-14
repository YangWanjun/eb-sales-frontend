// This file is shared across the demos.

import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {
  People,
  GroupWork,
  Business,
  RecentActors,
  FolderShared,
  LibraryBooks,
  PieChart,
  Dashboard,
} from '@material-ui/icons';
import { common } from '../utils/common';

export const HomeListItems = () => (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItem>
  </div>
);

export const MemberListItems = () => (
  <div>
    <ListItem button component={Link} to='/member'>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="メンバー" />
    </ListItem>
    <ListItem button component={Link} to='/member/members'>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="メンバー一覧" />
    </ListItem>
    <ListItem button component={Link} to='/organization'>
      <ListItemIcon>
        <FolderShared />
      </ListItemIcon>
      <ListItemText primary="部署一覧" />
    </ListItem>
  </div>
);

export const ProjectListItems = () => (
  <div>
    { common.hasPerm('eb.view_project') ? (
      <ListItem button component={Link} to='/project'>
        <ListItemIcon>
          <GroupWork />
        </ListItemIcon>
        <ListItemText primary="案件一覧" />
      </ListItem>
    ) : <React.Fragment /> }
    <ListItem button component={Link} to='/customer'>
      <ListItemIcon>
        <Business />
      </ListItemIcon>
      <ListItemText primary="取引先一覧" />
    </ListItem>
    <ListItem button component={Link} to='/partner'>
      <ListItemIcon>
        <RecentActors />
      </ListItemIcon>
      <ListItemText primary="協力会社一覧" />
    </ListItem>
    <ListItem button component={Link} to='/bpcontract'>
      <ListItemIcon>
          <LibraryBooks />
      </ListItemIcon>
      <ListItemText primary="BP契約一覧" />
    </ListItem>
  </div>
);

export const TurnoverListItems = () => (
  <div>
    <ListItem button component={Link} to='/turnover'>
      <ListItemIcon>
        <PieChart />
      </ListItemIcon>
      <ListItemText primary="売上情報" />
    </ListItem>
  </div>
);
