import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Typography,
} from '@material-ui/core';
import { constant } from '../utils/constants';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
});

class ConfirmDialog extends React.Component {

  constructor(props) {
    super(props);

    this.handleOpen = this.handleOpen.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      open: false,
      content: null,
    }
  }

  handleOpen(content) {
    this.setState({open: true, content: content,})
  }

  handleCancel() {
    this.setState({open: false,})
  }

  handleOk() {
    if (this.props.onOk) {
      if (this.props.onOk()) {
        this.handleCancel();
      }
    }
  }

  render() {
    const { title } = this.props;
    const { open, content } = this.state;

    return (
      <Dialog
        open={open}
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">{ title }</DialogTitle>
        <DialogContent>
          {content ? (
            constant.INFO.DELETE_CONFIRM
          ) : null}
          <Typography style={{whiteSpace: 'pre-line'}}>
            {content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            取消
          </Button>
          <Button onClick={this.handleOk} color="primary">
            確定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ConfirmDialog);