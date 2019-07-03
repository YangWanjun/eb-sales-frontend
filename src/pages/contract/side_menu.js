import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import {
  People,
} from '@material-ui/icons';

export const HomeListItems = () => (
  <div>
    <ListItem button component={Link} to="/contract/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="ホーム" />
    </ListItem>
  </div>
);

export const PeopleListItems = () => (
  <div>
    <ListItem button component={Link} to="/contract/members/">
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="社員一覧" />
    </ListItem>
  </div>
);
