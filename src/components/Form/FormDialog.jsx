import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import FormComponent from '../../containers/form';
import { common } from '../../utils/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  rightAlign: {
    textAlign: 'right',
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    width: '100%',
    maxWidth: 600,
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardBody: {
    height: 400,
    overflow: 'auto'
  },
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      data: {},
    }
  }

  handleOpen = (initial) => {
    this.setState({
      open: true,
      data: initial,
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { open, data } = this.state;
    let props = Object.assign({}, this.props);
    if (!common.isEmpty(data)) {
      props['data'] = data;
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <FormComponent {...props} handleClose={this.handleClose} />
        </Modal>
      </div>
    )
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);