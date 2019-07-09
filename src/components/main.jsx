import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  IconButton,
  Divider,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TopBar from '../containers/topBar';
import SimpleSnackbar from '../containers/snackBar';
import ShowNotification from '../containers/notification';
import styles from '../assets/jss/views/mainStyle';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      showMessage: false,
    };
  }

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
    const { classes, theme, appName, sideMenu, children } = this.props;

    return (
      <div className={classes.root}>
        <TopBar 
          classes={classes} 
          open={this.state.open} 
          handleDrawerOpen={this.handleDrawerOpen}
          appName={appName}
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
          PaperProps={{style: {overflow: 'hidden'}}}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider/>
          {sideMenu}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
        <SimpleSnackbar />
        <ShowNotification />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
