import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Popper,
  Slide,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { constant } from '../utils/constants';
import { common } from '../utils/common';

const notificationStyles = theme => ({
  card: {
    maxWidth: 360,
    minWidth: 300,
    textAlign: 'left',
    marginBottom: '10px',
  },
  typography: {
    fontWeight: 'bold',
    padding: '15px 0px',
  },
  actionRoot: {
    padding: '0px 8px 0px 16px',
    backgroundColor: '#fddc6c',
  },
  icons: {
    marginLeft: 'auto',
  },
  content: {
    fontSize: '13px',
    lineHeight: '16px',
  },
  checkIcon: {
    fontSize: 20,
    color: '#b3b3b3',
    paddingRight: 4,
    float: 'left',
  },
  button: {
    padding: 0,
    textTransform: 'none',
    fontSize: '13px',
  },
  action: {
    lineHeight: '15px',
    marginTop: '5px',
  },
});

class Notification extends React.Component {
  
  render() {
    const { classes, notification } = this.props;

    return (
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant='subtitle2' className={classes.typography}>{notification.title}</Typography>
          <div className={classes.icons}>
            <IconButton className={classes.expand} onClick={() => (common.deleteNotification(notification.id))}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
        <CardContent>
          <div className={classes.content}>
            {notification.description}
          </div>
          {notification.actions.map((action, key) => (
            <div key={key} className={classes.action}>
              <Link className={classes.button} to={action.href}>
                <CheckCircleIcon className={classes.checkIcon} />
                {action.name}
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

const NotificationWrapper = withStyles(notificationStyles)(Notification);

function getPopperStyle() {
  const height = window.innerHeight - common.getFixedHeaderHeight() - 10;

  return {
    maxHeight: `${height}px`,
  };
}

const styles = (theme) => ({
  popper: {
    overflow: 'hidden',
    width: 390,
  },
  notifications: {
    maxWidth: 400,
    minWidth: 330,
    padding: theme.spacing(2),
    height: '100%',
    width: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  no_data: {
    backgroundColor: '#fddc6c',
    padding: theme.spacing(3),
  },
});

class Notifications extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { classes, anchorEl, notifications } = this.props;
    const { open } = this.state;

    if (anchorEl) {
      return (
        <Popper
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal
          placement='bottom-end'
          // modifiers={{
          //   arrow: {enabled: true, element: anchorEl},
          // }}
          style={getPopperStyle()}
          className={classes.popper}
        >
          {({ TransitionProps }) => (
            <Slide {...TransitionProps} direction="left" timeout={350}>
              {notifications && notifications.length > 0 ? (
                <Paper className={classes.notifications} style={getPopperStyle()}>
                  {notifications.map((notice, key) => (
                    <NotificationWrapper key={key} notification={notice}/>
                  ))}
                </Paper>
              ) : (
                <Paper className={classes.no_data} style={getPopperStyle()}>
                  {constant.INFO.NO_NOTIFICATIONS}
                </Paper>
              )}
            </Slide>
          )}
        </Popper>
      );
    } else {
      return null;
    }
  }
}

export default withStyles(styles)(Notifications);
