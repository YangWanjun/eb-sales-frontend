import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import { common } from '../utils/common';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class FilterDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      open: false,
      filters: this.convertPropToFilter(props.filters),
    };

  }

  convertPropToFilter(filters) {
    let result = {};
    filters.map(i => {
      return result[i.id] = {'value': i.value, 'choices': i.choices};
    });
    return result;
  }

  handleClickOpen = () => {
    this.setState({ open: true, filters: this.convertPropToFilter(this.props.filters) });
  };

  handleOk = (event) => {
    event.preventDefault();
    this.setState({ open: false });
    let filters = [];
    for (var k in this.state.filters) {
      let vals = this.state.filters[k];
      filters.push({id: k, value: vals.value, 'choices': vals.choices});
    }
    this.props.onChangeFilter(filters);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    let value = event.target.value;
    let id = event.target.name;
    let col = common.getColumnByName(this.props.columns, id);
    let choices = null;
    if (col) {
      choices = col.choices;
    }
    this.setState((state) => {
      let filters = state.filters;
      filters[id] = {value: value, choices: choices};
      return {filters: filters};
    });
  }

  get_field_name(col) {
    return col.id + (col.searchType ? '__' + col.searchType : '');
  }

  render() {
    const {classes, filterTitle, columns} = this.props;
    const {filters} = this.state;
    return (
      <div>
        <Tooltip title="検索" placement='bottom' enterDelay={300}>
          <IconButton aria-label="Filter list" onClick={this.handleClickOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
          <form onSubmit={this.handleOk}>
            <DialogTitle id="form-dialog-title">{filterTitle}を検索</DialogTitle>
            <DialogContent>
              {columns.map(col => {
                let field_id = this.get_field_name(col);
                let value = (typeof(filters[field_id] || '') === 'object') ? filters[field_id].value : '';
                if (col.searchable) {
                  if (col.choices && !common.isEmpty(col.choices)) {
                    // 選択肢が存在する場合
                    return (
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor={field_id}>{col.label}</InputLabel>
                        <Select value={value} inputProps={{ name: field_id, value: value }} onChange={this.handleChange}>
                          <MenuItem value=""><em>None</em></MenuItem>
                          {Object.keys(col.choices).map(key => {
                            return <MenuItem value={key}>{col.choices[key]}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    );
                  } else {
                    return (
                      <FormControl className={classes.formControl}>
                        <TextField 
                          key={field_id}
                          name={field_id}
                          label={col.label}
                          value={value}
                          onChange={this.handleChange}
                        />
                      </FormControl>
                    );
                  }
                } else {
                  return <React.Fragment key={field_id}/>;
                }
              })}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                キャンセル
              </Button>
              <Button onClick={this.handleOk} color="primary" type="submit">
                検索
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

FilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterDialog);