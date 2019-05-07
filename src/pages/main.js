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
import { HomeListItems, MemberListItems, ProjectListItems, TurnoverListItems } from './side_menu';
import TopBar from '../containers/topBar';
import Status405 from '../containers/status_405';
import Status404 from '../containers/status_404';
import Status500 from '../containers/status_500';
import MemberList from './member_list';
import PartnerList from './partner_list';
import ProjectList from './project_list';
import ProjectDetail from './project_detail';
import TurnoverDashboard from '../dashboard/turnover';
import TurnoverMonthlyList from './turnover_monthly';
import TurnoverMonthlyDetail from './turnover_monthly_detail';
import TurnoverMonthlyClientDetail from './turnover_monthly_client_detail';
import TurnoverMonthlyProjectDetail from './turnover_monthly_project_detail';
import SimpleSnackbar from '../containers/snackBar';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
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
    showMessage: false,
  };

  componentWillMount() {
    this.props.onMount();
  }

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
        <TopBar 
          classes={classes} 
          open={this.state.open} 
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List><HomeListItems /></List>
          <Divider />
          <List><MemberListItems /></List>
          <Divider />
          <List><ProjectListItems /></List>
          <Divider />
          <List><TurnoverListItems /></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path='/member' component={MemberList} />
            <Route path='/partner' component={PartnerList} />
            <Route path='/project/:project_id/' component={ProjectDetail} />
            <Route path='/project' component={ProjectList} />
            <Route path='/turnover/month/:ym/project/:project_id' component={TurnoverMonthlyProjectDetail} />
            <Route path='/turnover/month/:ym/client/:client_id' component={TurnoverMonthlyClientDetail} />
            <Route path='/turnover/monthly/:ym' component={TurnoverMonthlyDetail} />
            <Route path='/turnover/monthly' component={TurnoverMonthlyList} />
            <Route path='/turnover' component={TurnoverDashboard} />
            <Route exact path='/forbidden' component={Status405} />
            <Route exact path='/notfound' component={Status404} />
            <Route exact path='/error' component={Status500} />
          </Switch>
        </main>
        <SimpleSnackbar />
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
