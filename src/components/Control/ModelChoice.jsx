import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: 8,
    minWidth: 120,
    width: '100%',
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

class ModelChoice extends React.Component {

  render () {
    const { classes, search_url } = this.props;

    return (
      <div className={classes.root}>
        <ChipInput className={classes.input}
          name={this.props.name}
          label={this.props.label}
        />
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </div>
    );
  }
}

ModelChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelChoice);