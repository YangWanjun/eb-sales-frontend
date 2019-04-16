import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Slide,
  Dialog,
  Button,
  InputBase,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import EnhancedTable from './dataTable';
import DataProvider from './dataProvider';
import SimpleSnackbar from './Control/Snackbar';
import {common} from '../utils/common';
import {constant} from '../utils/constants';
import {hostApi} from '../utils/config';

const styles = theme => ({
  appBar: {
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 20,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  noData: {
    textAlign: 'center',
    position: 'relative',
    top: '50%',
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SearchDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      open: false,
      inputValue: '',
      keyworad: '',
      data: [],
    }
  }

  handleKeywordChange(event) {
    this.setState({inputValue: event.target.value})
  }

  handleOpen = () => {
    this.setState({open: true, keyworad: '', inputValue: '', data: []});
  };

  handleClose = () => {
    this.setState({open: false, keyworad: '', inputValue: '', data: []});
  };

  handleOk = () => {
    const { data } = this.state;
    if (common.isEmpty(data)) {
      this.showSnackbar(constant.ERROR.REQUIRE_SELECTED_DATA);
    } else if (this.props.handleDataSelected) {
      this.props.handleDataSelected(data);
      this.handleClose();
    }
  }

  handleEnter = (e) => {
    if (e.key === 'Enter') {
      this.setState((state) => {
        const keyworad = state.inputValue;
        return {keyworad};
      });
    }
  }

  handleSelect = (rows) => {
    this.setState({data: rows});
  }

  render() {
    const { open, keyworad } = this.state;
    const { classes, title, url } = this.props;
    let search_url = url ? common.joinUrl(hostApi, url) : null;
    search_url = search_url ? common.addUrlParameter(search_url, {search: keyworad}) : null;
    console.log(search_url);

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder={title}
                autoFocus
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleKeywordChange}
                onKeyDown={this.handleEnter}
              />
            </Typography>
            <Button color="inherit" onClick={this.handleOk}>
              確定
            </Button>
          </Toolbar>
        </AppBar>
        { keyworad ? (
          <DataProvider 
            endpoint={ search_url } 
            render={ (initData) => {
              return (
                <EnhancedTable
                  { ...initData }
                  isClientSide={true}
                  selectable='single'
                  handleSelect={this.handleSelect}
                />
              );
            } }
          />
        ) : (
          <div className={classes.noData}>
            検索キーワードを入力して、エンターキーを押下してください。
          </div>
        )}
        <SimpleSnackbar
          ref={(dialog) => {
            this.showSnackbar = dialog && dialog.handleOpen;
          }}
          variant='error'
          horizontal='center'
        />
      </Dialog>
    );
  }
}

SearchDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(SearchDialog);