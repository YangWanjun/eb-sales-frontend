import React from 'react';
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { config } from '../../utils/config';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class MySnackbarContent extends React.Component {
  render() {
    const { classes, className, message, onClose, variant, ...other } = this.props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    )
  }
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class SimpleSnackbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      variant: 'info',
      message: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.warningMessages) {
      if (nextProps.warningMessages.length !== this.props.warningMessages.length) {
        this.setState({
          open: true,
          variant: 'warning',
          message: nextProps.warningMessages.slice(-1)[0],
        });
      }
    }
    if (nextProps.errorMessages) {
      if (nextProps.errorMessages.length !== this.props.errorMessages.length) {
        this.setState({
          open: true,
          variant: 'error',
          message: nextProps.errorMessages.slice(-1)[0],
        });
      }
    }
    if (nextProps.successMessages) {
      if (nextProps.successMessages.length !== this.props.successMessages.length) {
        this.setState({
          open: true,
          variant: 'success',
          message: nextProps.successMessages.slice(-1)[0],
        });
      }
    }
    if (nextProps.infoMessages) {
      if (nextProps.infoMessages.length !== this.props.infoMessages.length) {
        this.setState({
          open: true,
          variant: 'info',
          message: nextProps.infoMessages.slice(-1)[0],
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
    }
    this.defaultNode = null;
  }

  handleOpen = (message) => {
    this.setState({ open: true, message });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false, message: '' });
  };

  _render() {
    const { open, variant, message } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: this.props.vertical,
            horizontal: this.props.horizontal,
          }}
          open={open}
          autoHideDuration={config.toastHideDuration}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={variant}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }

  render() {
    if (!this.defaultNode) {
      this.defaultNode = document.createElement("div");
      document.body.appendChild(this.defaultNode);
    }

    return createPortal(this._render(), this.defaultNode);
  }
}

SimpleSnackbar.propTypes = {
  // variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
  // message: PropTypes.node,
  horizontal: PropTypes.oneOf(['left', 'center', 'right']),
  vertical: PropTypes.oneOf(['top', 'bottom']),
};

SimpleSnackbar.defaultProps = {
  horizontal: 'right',
  vertical: 'top',
};

export default SimpleSnackbar;