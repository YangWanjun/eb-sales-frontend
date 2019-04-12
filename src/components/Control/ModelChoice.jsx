import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchDialog from '../SearchDialog';
import SimpleSnackbar from './Snackbar';
import {constant} from '../../utils/constants';

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
  constructor(props) {
    super(props);

    this.onShowSearchDialog = this.onShowSearchDialog.bind(this);
  }

  onShowSearchDialog = () => {
    if (this.props.url) {
      if (this.showModel) {
        this.showModel();
      }
    } else if (this.showSnackbar) {
      this.showSnackbar(constant.SETTING.REQUIRE_SEARCH_URL);
    }
  }

  render () {
    const { classes, url } = this.props;
    let placeholderProps = {};
    if (this.props.placeholder) {
      placeholderProps['placeholder'] = this.props.placeholder;
      placeholderProps['InputLabelProps'] = {shrink: true};
    }

    return (
      <div className={classes.root}>
        <ChipInput className={classes.input}
          name={this.props.name}
          label={this.props.label}
          {...placeholderProps}
        />
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={ this.onShowSearchDialog }>
          <SearchIcon />
        </IconButton>
        <SearchDialog
          innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
          title={this.props.label + 'を検索'}
          url={url}
        />
        <SimpleSnackbar
          ref={(dialog) => {
            this.showSnackbar = dialog && dialog.handleOpen 
          }}
          variant='warning'
          message={'asdf'}
        />
      </div>
    );
  }
}

ModelChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelChoice);