import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
  ClickAwayListener,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Notifications from './Notifications';

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    this.props.handleDrawerOpen();
  }

  handleShowNotifications = (event) => {
    if (this._openNotifications) {
      this._openNotifications();
    }
  };

  handleClickAway = () => {
    if (this._closeNotifications) {
      this._closeNotifications();
    }
  }

  render() {
    const { classes, loggedIn, appName, notifications } = this.props;

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.props.open} style={{paddingRight: 24}} ref={bar => (this._toolBar = bar)}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleMenuClick}
            className={classNames(classes.menuButton, this.props.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
            {appName}
          </Typography>
          { loggedIn ? (
            <div className={classes.sectionDesktop}>
              <ClickAwayListener onClickAway={this.handleClickAway}>
                <span style={{float: 'left'}}>
                  <IconButton color="inherit" onClick={this.handleShowNotifications}>
                    {notifications && notifications.length > 0 ? (
                      <Badge badgeContent={notifications.length} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                    ) : (
                      <NotificationsIcon />
                    )}
                  </IconButton>
                  <Notifications
                    notifications={notifications}
                    anchorEl={this._toolBar}
                    innerRef={popper => {
                      this._openNotifications = popper && popper.handleOpen;
                      this._closeNotifications = popper && popper.handleClose;
                    }}
                  />
                </span>
              </ClickAwayListener>
              <IconButton color="inherit">
                <AccountCircle />
              </IconButton>
            </div>
          ) : (
            <Button component={Link} color="inherit" to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
};

export default TopBar;
