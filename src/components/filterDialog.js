import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
      filters: props.filters,
    };

  }

  handleClickOpen = () => {
    this.setState({ open: true, filters: this.props.filters });
  };

  handleOk = (event) => {
    event.preventDefault();
    this.setState({ open: false });
    this.props.onChangeFilter(this.state.filters);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    let col = common.getColumnByName(this.props.columns, name, 'name');
    if (col.boolean === true) {
      if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      } else {
        value = '';
      }
    }

    this.setState((state) => {
      let filters = state.filters;
      if (value === '' || value === null) {
        delete filters[name];
      } else {
        filters[name] = value;
      }
      return {filters: filters};
    });
  }

  get_field_name(col) {
    return col.name + (col.search_type ? '__' + col.search_type : '');
  }

  render() {
    const {classes, filterTitle, columns} = this.props;
    const {filters} = this.state;
    return (
      <React.Fragment>
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
                let field_name = this.get_field_name(col);
                let value = filters[field_name] || '';
                if (col.searchable) {
                  if (col.choices && !common.isEmpty(col.choices)) {
                    // 選択肢が存在する場合
                    return (
                      <FormControl key={'form_contral_' + field_name} className={classes.formControl}>
                        <InputLabel htmlFor={field_name}>{col.label}</InputLabel>
                        <Select value={value} inputProps={{ name: field_name, value: value }} onChange={this.handleChange}>
                          <MenuItem value=""><em>None</em></MenuItem>
                          {col.choices.map(item => {
                            return <MenuItem key={item.value} value={item.value}>{item.display_name}</MenuItem>;
                          })}
                        </Select>
                      </FormControl>
                    );
                  } else if (col.boolean === true) {
                    // チェックボックスを表示
                    return (<FormControlLabel key={'form_contral_' + field_name} className={classes.formControl}
                      control={
                        <Checkbox 
                          key={field_name} 
                          name={field_name} 
                          color="primary" 
                          checked={value} 
                          onChange={this.handleChange}
                        />
                      }
                      label={col.label}
                    />);
                  } else {
                    return (
                      <FormControl key={'form_contral_' + field_name} className={classes.formControl}>
                        <TextField 
                          key={field_name}
                          name={field_name}
                          label={col.label}
                          value={value}
                          onChange={this.handleChange}
                        />
                      </FormControl>
                    );
                  }
                } else {
                  return <React.Fragment key={field_name}/>;
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
      </React.Fragment>
    );
  }
}

FilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
};

export default withStyles(styles)(FilterDialog);