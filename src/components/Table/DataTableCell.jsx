import React from "react";
import uuid from 'uuid';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {
  TableCell,
  IconButton,
  Grow,
  Button,
  Tooltip,
  Fab,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArchiveIcon from '@material-ui/icons/Archive';
import { common } from '../../utils/common';
import { config } from '../../utils/config';

class DataTableCell extends React.Component {

  constructor(props) {
    super(props);

    this.handleHideActions = this.handleHideActions.bind(this);
    this.state = {
      open: false,
    }
  }

  getOutput(value) {
    const { column, row } = this.props;
    return (
      (column.url_field && row[column.url_field]) ? (
        <Link to={row[column.url_field]}>{value}</Link>
      ) : value
    );
  }

  handleShowActions = () => {
    this.setState({open: true});
  };

  handleHideActions = () => {
    this.setState({open: false});
  };

  handleFileDownload = file_id => () => {
    common.fetchGet(common.formatStr(config.api.attachment_download, file_id)).then(data => {
      const blob = common.toBlob(data.blob);
      common.downloadBlog(blob, data.name);
    }).catch(data => {
      this.props.showErrorMsg(data.detail);
    });
  }

  handleActionClick = (method) => () =>  {
    const { row } = this.props;
    if (method) {
      // common.loading();
      method(row);
    }
  };

  render() {
    const { classes, column, row, actions, actionsTrigger } = this.props;
    const { open } = this.state;

    let style = Object.assign({}, this.props.style);
    let attrs = {};
    let output = null;
    if (Array.isArray(actions) && actions.length > 0 && (!actionsTrigger || actionsTrigger(row))) {
      style['padding'] = 0;
      style['width'] = 35;
      style['position'] = 'relative';
      attrs['align'] = 'center';
      output = (
        <React.Fragment>
          {open ? (
            <IconButton style={{padding: 10}} onClick={this.handleHideActions}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton style={{padding: 10}} onClick={this.handleShowActions}>
              <MoreVertIcon />
            </IconButton>
          )}
          <div className={classes.tableActionWrapper}>
            <Grow in={open}>
              <div style={{display: open ? 'block' : 'none'}}>
                {actions.map((action, key) => {
                  if (action.trigger && !action.trigger(row)) {
                    return null;
                  } else if (action.icon) {
                    return (
                      <Tooltip key={key} title={action.tooltip} placement='bottom' enterDelay={300}>
                        <Fab
                          size="medium"
                          color={action.color ? action.color : "primary"}
                          aria-label="Add"
                          onClick={this.handleActionClick(action.handleClick)}
                          className={classes.tableActionButton}
                        >
                          {action.icon}
                        </Fab>
                      </Tooltip>
                    );
                  } else {
                    return (
                      <Button
                        key={key}
                        variant="contained"
                        color={action.color ? action.color : "primary"}
                        className={classes.button}
                      >
                        {action.name}
                      </Button>
                    );
                  }
                })}
              </div>
            </Grow>
          </div>
        </React.Fragment>
      );
    } else if (column.type === 'integer' || column.type === 'decimal') {
      // 数字の場合右揃え、カンマ区切り表示
      let value = row[column.name];
      attrs['align'] = 'right';
      value = common.toNumComma(value);
      output = this.getOutput(value);
    } else if (column.type === 'boolean') {
      let value = row[column.name];
      style['padding'] = 0;
      attrs['align'] = 'center';
      if (value === true || value === 1) {
        output = <CheckCircleIcon style={{color: 'green'}} />;
      } else if (value === false || value === 0) {
        output = <HighlightOffIcon style={{color: 'red'}} />;
      }
    } else if (column.type === 'file') {
      let value = row[column.name];
      style['padding'] = 0;
      output = (value ? (
        <IconButton onClick={this.handleFileDownload(value)} style={{padding: 10}}>
          <ArchiveIcon />
        </IconButton>
      ) : null);
    } else {
      let value = row[column.name];
      output = this.getOutput(value);
    }

    return (
      <TableCell className={classes.tableCell} key={uuid()} style={style} {...attrs}>
        {output}
      </TableCell>
    );
  }
}

DataTableCell.defaultProps = {
  column: {},
  row: {},
  actions: [],
};

DataTableCell.propTypes = {
  column: PropTypes.object,
  row: PropTypes.object,
  actions: PropTypes.array,
};

export default DataTableCell;
