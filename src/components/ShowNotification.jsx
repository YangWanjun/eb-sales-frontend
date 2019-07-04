import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
} from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { common } from '../utils/common';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth: 330,
  },
  typography: {
    fontWeight: 'bold',
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
    lineHeight: '20px',
    marginTop: '3px',
  },
});

function MyApp(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { classes, notification } = props;
  let key = null;

  const handleDismiss = () => {
    closeSnackbar(key);
  };

  const handleClickVariant = () => {
    // variant could be success, error, warning, info, or default
    if (!common.isEmpty(notification)) {
      key = enqueueSnackbar('', {
        // persist: true,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        children: () => (
          <Card className={classes.card}>
            <CardActions classes={{ root: classes.actionRoot }}>
              <Typography variant='subtitle2' className={classes.typography}>{notification.title}</Typography>
              <div className={classes.icons}>
                <IconButton className={classes.expand} onClick={handleDismiss}>
                  <KeyboardArrowRight />
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
        ),
      });
    }
  };

  handleClickVariant();
  return <React.Fragment/>;
}

class ShowNotification extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      notification: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      if (nextProps.notifications.length > this.props.notifications.length) {
        const notification = nextProps.notifications.slice(-1)[0];
        if (notification.readed !== true) {
          this.setState({
            notification: notification,
          });
          common.notificationReaded(notification.id);
          return;
        }
      }
    }
    this.setState({notification: null});
  }

  render() {
    const { classes } = this.props;
    const { notification } = this.state;

  return (
      <SnackbarProvider maxSnack={4}>
        <MyApp classes={classes} notification={notification}/>
      </SnackbarProvider>
    );
  }
}

export default withStyles(styles)(ShowNotification);
