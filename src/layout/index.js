import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { homeListItmes, memberListItems, projectListItems, turnoverListItems } from './sideMenu';
import TopBar from '../components/topBar';
import MemberList from '../pages/members';
import PartnerList from '../pages/partners';
import ProjectList from '../pages/project';
import TurnoverDashboard from '../dashboard/turnover';
import TurnoverMonthlyList from '../pages/turnover_monthly';
import TurnoverMonthlyDetail from '../pages/turnover_monthly_detail';
import TurnoverMonthlyClientDetail from '../pages/turnover_monthly_client_detail';
import TurnoverMonthlyProjectDetail from '../pages/turnover_monthly_project_detail';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 1,
  },
});

class Layout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <TopBar classes={classes} open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>{homeListItmes}</List>
          <Divider />
          <List>{memberListItems}</List>
          <Divider />
          <List>{projectListItems}</List>
          <Divider />
          <List>{turnoverListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/members' component={MemberList} />
            <Route path='/partners' component={PartnerList} />
            <Route path='/project' component={ProjectList} />
            <Route path='/turnover/month/:ym/project/:project_id' component={TurnoverMonthlyProjectDetail} />
            <Route path='/turnover/month/:ym/client/:client_id' component={TurnoverMonthlyClientDetail} />
            <Route path='/turnover/monthly/:ym' component={TurnoverMonthlyDetail} />
            <Route path='/turnover/monthly' component={TurnoverMonthlyList} />
            <Route path='/turnover' component={TurnoverDashboard} />
          </Switch>
        </main>
      </div>
    );
  }
}

// const TurnoverList = ({match}) => (
//   <div>
//     <Route path={`${match.url}/monthly`} component={TurnoverMonthlyList}/>
//   </div>
// )

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
