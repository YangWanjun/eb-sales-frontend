import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import green from '@material-ui/core/colors/green';
import {
  Fab,
  CircularProgress,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class CircularFab extends React.Component {

  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      loading: false,
      success: false,
    }
  }

  handleButtonClick() {
    if (this.props.onClick) {
      const { loading } = this.state;
      if (!loading) {
        this.setState({
          loading: true,
          success: false,
        });
      }
      this.props.onClick();
    }
  }

  loaded() {
    this.setState({
      loading: false,
    });
  }

  success() {
    this.setState({
      loading: false,
      success: true,
    });
  }

  render() {
    let { classes, icon, ...otherProps } = this.props;
    const { loading } = this.state;
    delete otherProps['onClick'];

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Fab
            // className={buttonClassname}
            onClick={this.handleButtonClick}
            {...otherProps}
          >
            {icon}
          </Fab>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CircularFab);
