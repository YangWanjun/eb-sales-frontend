// This file is shared across the demos.

import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import GroupWork from '@material-ui/icons/GroupWork';
import Business from '@material-ui/icons/Business';
import RecentActors from '@material-ui/icons/RecentActors';
import FolderShared from '@material-ui/icons/FolderShared';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import PieChart from '@material-ui/icons/PieChart';

export const homeListItmes = (
    <div>
        <ListItem button component={Link} to="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
        </ListItem>
    </div>
);

export const memberListItems = (
    <div>
        <ListItem button component={Link} to='/members'>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="社員一覧" />
        </ListItem>
        <ListItem button component={Link} to='/departments'>
            <ListItemIcon>
                <FolderShared />
            </ListItemIcon>
            <ListItemText primary="部署一覧" />
        </ListItem>
    </div>
);

export const projectListItems = (
    <div>
        <ListItem button component={Link} to='/project'>
            <ListItemIcon>
                <GroupWork />
            </ListItemIcon>
            <ListItemText primary="案件一覧" />
        </ListItem>
        <ListItem button component={Link} to='/customers'>
            <ListItemIcon>
                <Business />
            </ListItemIcon>
            <ListItemText primary="取引先一覧" />
        </ListItem>
        <ListItem button component={Link} to='/partners'>
            <ListItemIcon>
                <RecentActors />
            </ListItemIcon>
            <ListItemText primary="協力会社一覧" />
        </ListItem>
        <ListItem button component={Link} to='/bpcontracts'>
            <ListItemIcon>
                <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="BP契約一覧" />
        </ListItem>
    </div>
);

export const turnoverListItems = (
    <div>
        <ListItem button component={Link} to='/turnover'>
            <ListItemIcon>
                <PieChart />
            </ListItemIcon>
            <ListItemText primary="売上情報" />
        </ListItem>
    </div>
);
