import React from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Popper,
  Grow,
  Card,
  CardHeader,
  CardActions,
  Avatar,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { red } from '@material-ui/core/colors';

const styles = (theme) => ({
  popper: {
    width: 350,
  },
  card: {
    border: '1px solid #3f51b5',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class AccountInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleOpen = (anchorEl) => {
    this.setState({open: true, anchorEl});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render () {
    const { classes, accountInfo } = this.props;
    const { open, anchorEl } = this.state;

    if (anchorEl) {
      return (
        <Popper
          open={open}
          anchorEl={anchorEl}
          transition
          disablePortal
          placement='bottom-end'
          className={classes.popper}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={350}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                      {accountInfo.first_name}
                    </Avatar>
                  }
                  title={accountInfo.full_name}
                  subheader={accountInfo.email}
                />
                <CardActions disableSpacing>
                  <div style={{flex: 1}} />
                  <Tooltip title='ログアウト' placement='bottom' enterDelay={300}>
                    <IconButton aria-label="logout" onClick={this.props.logout}>
                      <ExitToAppIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grow>
          )}
        </Popper>
      );
    } else {
      return null;
    }
  }
}

AccountInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  accountInfo: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccountInfo);
