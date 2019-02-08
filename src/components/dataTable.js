import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FilterDialog from '../components/filterDialog';
import ChipsArray from '../components/chipArray';
import { common } from '../utils/common';
import { config } from '../utils/config';

// function getSorting(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
//     : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
// }

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columnData, isSelectable } = this.props;
    const chkCell = isSelectable ? (
      <TableCell padding="none">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
    ) : (<React.Fragment></React.Fragment>)

    return (
      <TableHead>
        <TableRow>
          { chkCell }
          {columnData.map(column => {
            const cell = column.visible ? (
              column.sortable ? (
                <TableCell
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.sort_field}
                      direction={order}
                      onClick={this.createSortHandler(column.sort_field)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                >{column.label}</TableCell>
              )
            ) : (<React.Fragment key={column.id}/>)
            return cell;
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
  }

  handleDeleteFilter(filters) {
    this.props.onChangeFilter(filters);
  }

  render () {
    const { numSelected, classes, tableTitle, columns, filters } = this.props;
    let toolComponent = null;

    if (numSelected > 0 && filters.length > 0) {
      toolComponent = (
        <Typography color="inherit" variant="subheading">
            {numSelected} selected
            <ChipsArray chipData={filters} onChangeFilter={this.handleDeleteFilter} />
        </Typography>
      );
    } else if (numSelected > 0) {
      toolComponent = (
        <Typography color="inherit" variant="subheading">
            {numSelected} selected
        </Typography>
      );
    } else if (filters.length > 0) {
      toolComponent = <ChipsArray chipData={filters} onChangeFilter={this.handleDeleteFilter} />;
    } else {
      toolComponent = (
        <Typography variant="title" id="tableTitle">
          {tableTitle}
        </Typography>
      );
    }
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: (numSelected > 0 || filters.length > 0),
        })}
      >
        <div className={classes.title}>
          {toolComponent}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="削除">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : <FilterDialog filterTitle={tableTitle} columns={columns} filters={filters} onChangeFilter={this.handleDeleteFilter} />
          }
        </div>
      </Toolbar>
    );
  }
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    /* marginTop: theme.spacing.unit * 3, */
  },
  table: {
    /* minWidth: 1020, */
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      // data: props.data.results,
      // dataLength: props.data.count,
      // columns: props.data.columns,
      page: 0,
      rowsPerPage: config.rowsPerPage,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    let order_by = property;

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    } else {
      order_by = '-' + order_by;
    }

    this.setState({ order, orderBy });
    this.props.onDataRedraw(this.state.rowsPerPage, this.state.page, order_by, this.props.filters);
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.data.results.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    if (this.props.isSelectable === false) {
      return;
    }
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
    this.props.onDataRedraw(this.state.rowsPerPage, page, order_by, this.props.filters);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
    this.props.onDataRedraw(event.target.value, 0, order_by, this.props.filters);
  };

  handleChangeFilter = filters => {
    const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
    this.props.onDataRedraw(this.state.rowsPerPage, 0, order_by, filters);
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { data, classes, tableTitle, isSelectable, filters } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const dataLength = data.count;
    const columns = data.columns;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          columns={columns} 
          tableTitle={tableTitle} 
          isSelectable={isSelectable} 
          filters={filters} 
          onChangeFilter={this.handleChangeFilter}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              columnData={columns}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={dataLength}
            />
            <TableBody>
              {data.results
                // .sort(getSorting(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  const chkCell = isSelectable ? (
                    <TableCell padding="none">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  ) : (<React.Fragment></React.Fragment>);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      {chkCell}
                      {columns.map(col => {
                        if (!col.visible) {
                          return <React.Fragment  key={col.id}/>;
                        } else if (col.numeric === true) {
                          return (<TableCell key={col.id} numeric>{common.toNumComma(n[col.id])}</TableCell>);
                        } else {
                          if (col.urlField && n[col.urlField]) {
                            return (<TableCell key={col.id} padding="default"><Link to={n[col.urlField]}>{n[col.id]}</Link></TableCell>);
                          } else {
                            return (<TableCell key={col.id} padding="default">{n[col.id]}</TableCell>);
                          }
                        }
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={ isSelectable ? columns.length + 1 : columns.length } />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={dataLength}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 25]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);