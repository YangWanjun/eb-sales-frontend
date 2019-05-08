import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchDialog from '../../containers/searchDialog';
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
    this.handleChangeChips = this.handleChangeChips.bind(this);
    this.state = {
      data: [],
    }
  }

  onShowSearchDialog = () => {
    if (this.props.url) {
      if (this.showModel) {
        this.showModel();
      }
    } else if (this.props.showWarningMsg) {
      this.props.showWarningMsg(constant.SETTING.REQUIRE_SEARCH_URL);
    }
  }

  handleChangeChips(chips) {
    let data = [];
    chips.map(row => (
      data.push({value: row.id, display_name: row.name})
    ));
    this.setState({data});
    if (this.props.handleFieldChange) {
      this.props.handleFieldChange(this.props.name, data);
    }
  }

  handleDeleteChip(chip, index) {
    let { data } = this.state;
    data.splice(index, 1);
    this.setState({data});
  }

  render () {
    const { classes, url } = this.props;
    const { data } = this.state;
    let placeholderProps = {};
    if (this.props.placeholder) {
      placeholderProps['placeholder'] = this.props.placeholder;
      placeholderProps['InputLabelProps'] = {shrink: true};
    }
    let displayNames = [];
    if (data && data.length > 0) {
      data.map(row => (
        displayNames.push(row.display_name)
      ));
    }

    return (
      <div className={classes.root}>
        <ChipInput className={classes.input}
          name={this.props.name}
          label={this.props.label}
          value={displayNames}
          {...placeholderProps}
          onChange={(chips) => this.handleChangeChips(chips)}
          onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
        />
        <Divider className={classes.divider} />
        <IconButton className={classes.iconButton} aria-label="Search" onClick={ this.onShowSearchDialog }>
          <SearchIcon />
        </IconButton>
        <SearchDialog
          innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
          title={this.props.label + 'を検索'}
          url={url}
          handleDataSelected={this.handleChangeChips}
        />
      </div>
    );
  }
}

ModelChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModelChoice);