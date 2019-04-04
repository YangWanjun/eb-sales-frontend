import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    width: '100%',
  },
};

class SearchDialog extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <Modal>

      </Modal>
    );
  }
}

SearchDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchDialog);