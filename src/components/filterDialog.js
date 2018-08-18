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
    this.state = {
      open: false,
    };
  
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {filterTitle, columns} = this.props;
    return (
      <div>
        <Tooltip title="検索">
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
              return col.searchable ? <TextField 
                key={col.id}
                id={col.id}
                label={col.label}
                margin="normal"
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
            <Button onClick={this.handleClose} color="primary">
              検索
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FilterDialog;