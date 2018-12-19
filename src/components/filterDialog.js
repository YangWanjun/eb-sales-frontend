import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

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
      return result[i.id] = i.value;
    });
    return result;
  }

  handleClickOpen = () => {
    this.setState({ open: true, filters: this.convertPropToFilter(this.props.filters) });
  };

  handleOk = (event) => {
    this.setState({ open: false });
    let filters = [];
    for (var k in this.state.filters) {
      filters.push({id: k, value: this.state.filters[k]});
    }
    this.props.onChangeFilter(filters);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange(event) {
    let value = event.target.value;
    let id = event.target.id;
    this.setState((state) => {
      // let filters = state.filters;
      // let item = filters.find(i => {
      //   return i.id === id;
      // })
      // if (item) {
      //   item.value = value;
      // } else {
      //   filters.push({id: id, value: value})
      // }
      let filters = state.filters;
      filters[id] = value;
      return {filters: filters};
    });
  }

  render() {
    const {filterTitle, columns} = this.props;
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
          <DialogTitle id="form-dialog-title">{filterTitle}を検索</DialogTitle>
          <DialogContent>
            {columns.map(col => {
              let value = filters[col.id] || '';
              return col.searchable ? <TextField 
                key={col.id}
                id={col.id}
                label={col.label}
                value={value}
                margin={"normal"}
                onChange={this.handleChange}
              /> : <React.Fragment key={col.id}/>;
            })}
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={this.handleOk} color="primary">
              検索
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FilterDialog;