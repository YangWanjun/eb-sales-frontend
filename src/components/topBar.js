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
import AccountInfo from './AccountInfo';
import Notifications from './Notifications';

class TopBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    window.appName = this.props.appName;
    document.title = this.props.appName;
  }

  handleMenuClick() {
    this.props.handleDrawerOpen();
  }

  handleShowNotifications = (event) => {
    if (this._openNotifications) {
      this._openNotifications(this.toobarEl);
    }
  };

  handleAwayFromNotification = () => {
    if (this._closeNotifications) {
      this._closeNotifications();
    }
  }

  handleShowAccountInfo = (event) => {
    if (this._openAccountInfo) {
      this._openAccountInfo(this.toobarEl);
    }
  };

  handleAwayFromAccountInfo = () => {
    if (this._closeAccountInfo) {
      this._closeAccountInfo();
    }
  }

  render() {
    const { classes, loggedIn, appName, notifications, accountInfo } = this.props;

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!this.props.open} style={{paddingRight: 24}} ref={bar => (this.toobarEl = bar)}>
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
              <ClickAwayListener onClickAway={this.handleAwayFromNotification}>
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
                    innerRef={popper => {
                      this._openNotifications = popper && popper.handleOpen;
                      this._closeNotifications = popper && popper.handleClose;
                    }}
                  />
                </span>
              </ClickAwayListener>
              <ClickAwayListener onClickAway={this.handleAwayFromAccountInfo}>
                <span>
                  <IconButton color="inherit" onClick={this.handleShowAccountInfo}>
                    <AccountCircle />
                  </IconButton>
                  <AccountInfo
                    accountInfo={accountInfo}
                    innerRef={popper => {
                      this._openAccountInfo = popper && popper.handleOpen;
                      this._closeAccountInfo = popper && popper.handleClose;
                    }}
                  />
                </span>
              </ClickAwayListener>
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
