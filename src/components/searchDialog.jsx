import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import EnhancedTable from './dataTable';
import DataProvider from './dataProvider';
import {common} from '../utils/common';
import {hostApi} from '../utils/config';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SearchDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const { open } = this.state;
    const { classes, title, url } = this.props;
    let search_url = url ? common.joinUrl(hostApi, url) : null;
    // search_url = search_url ? common.addUrlParameter(search_url, {search: '楊'}) : null;

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              保存
            </Button>
          </Toolbar>
        </AppBar>
        { url ? (
          <DataProvider 
            endpoint={ search_url } 
            render={ (data, filters, handleDataRedraw) => {
              return (
                <EnhancedTable
                  tableTitle={title.replace('を検索', '').replace('（*）', '') + '一覧'}
                  data={data}
                  filters={filters}
                  onDataRedraw={handleDataRedraw}
                  isClientSide={true}
                  isSelectable={true}
                />
              );
            } }
          />
        ) : <React.Fragment />}
      </Dialog>
    );
  }
}

SearchDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchDialog);