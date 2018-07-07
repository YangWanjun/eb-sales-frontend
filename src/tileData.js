// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import People from '@material-ui/icons/People';
import GroupWork from '@material-ui/icons/GroupWork';
import Business from '@material-ui/icons/Business';
import RecentActors from '@material-ui/icons/RecentActors';
import FolderShared from '@material-ui/icons/FolderShared';
import LibraryBooks from '@material-ui/icons/LibraryBooks'

export const homeListItmes = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
        </ListItem>
    </div>
);

export const memberListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <People />
            </ListItemIcon>
            <ListItemText primary="社員一覧" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FolderShared />
            </ListItemIcon>
            <ListItemText primary="部署一覧" />
        </ListItem>
    </div>
);

export const projectListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <GroupWork />
            </ListItemIcon>
            <ListItemText primary="案件一覧" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Business />
            </ListItemIcon>
            <ListItemText primary="取引先一覧" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <RecentActors />
            </ListItemIcon>
            <ListItemText primary="協力会社一覧" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LibraryBooks />
            </ListItemIcon>
            <ListItemText primary="BP契約一覧" />
        </ListItem>
    </div>
);
