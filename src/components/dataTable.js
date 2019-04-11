import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Table, TableBody, TableRow, TableCell, TableHead, TableFooter, TablePagination, TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FilterDialog from '../components/filterDialog';
import ChipsArray from '../components/chipArray';
import BadgeLabel from '../components/badgeLabel';
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';
import FormDialog from './Form/index'
import { common } from '../utils/common';
import { config } from '../utils/config';
import { constant } from '../utils/constants';
import { history } from '../utils/store';

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/**
 * 
 * @param {String} order 昇順／降順
 * @param {String} orderBy 並び替え項目
 * @param {Boolean} isNumeric 並び替え項目が数字かどうか
 */
function getSorting(order, orderBy, isNumeric) {
  if (isNumeric) {
    return order === 'desc'
    ? (a, b) => (b[orderBy] - a[orderBy])
    : (a, b) => (a[orderBy] - b[orderBy]);
  } else {
    return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }
}

function stableFilter(array, filters) {
  filters.map( f => {
    array = array.filter(function(item) {
      let item_value = item[f.id];
      if (item_value === true || item_value === false) {
        return (f.value === true || f.value === false) ? item_value === f.value : true;
      } else if (item_value) {
        return item_value.indexOf(f.value) >= 0;
      } else {
        return false;
      }
    })
    return array;
  });
  return array;
}

class EnhancedTableHead extends React.Component {
  createSortHandler = (property, isNumeric) => event => {
    this.props.onRequestSort(event, property, isNumeric);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columnData, isSelectable, isClientSide, classes } = this.props;
    const chkCell = isSelectable ? (
      <TableCell padding="none">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
    ) : (<React.Fragment></React.Fragment>);

    return (
      <TableHead>
        <TableRow>
          { chkCell }
          {columnData.map(column => {
            const numeric = column.type === 'integer' || column.type === 'decimal';
            const cell = column.visible ? (
              (isClientSide || column.sortable) ? (
                <TableCell
                  key={column.name}
                  align={numeric ? 'right' : 'inherit'}
                  className={classes.cellPadding}
                  sortDirection={orderBy === column.name ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === (isClientSide ? column.name : column.sort_field)}
                      direction={order}
                      onClick={this.createSortHandler(isClientSide ? column.name : column.sort_field, numeric)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell
                  key={column.name}
                  align={column.numeric ? 'right' : 'inherit'}
                  className={classes.cellPadding}
                >{column.label}</TableCell>
              )
            ) : (<React.Fragment key={column.name}/>)
            return cell;
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

class EnhancedTableFooter extends React.Component {
  render() {
    const { classes, onSelectAllClick, numSelected, rowCount, columnData, isSelectable, summary } = this.props;
    const chkCell = isSelectable ? (
      <TableCell padding="none">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
    ) : (<React.Fragment></React.Fragment>);

    return (
      <TableFooter>
        <TableRow>
          { chkCell }
          {columnData.map(col => {
            const numeric = col.type === 'integer' || col.type === 'decimal';
            if (!col.visible) {
              return <React.Fragment  key={col.name}/>;
            } else if (numeric === true) {
              return (<TableCell key={col.name} align='right' className={classes.cellPadding}>{common.toNumComma(summary[col.name])}</TableCell>);
            } else {
              return (<TableCell key={col.name} padding="default"></TableCell>);
            }
          })}
        </TableRow>
      </TableFooter>
    )
  }
}

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
    minWidth: '150px',
    textAlign: 'right',
  },
  title: {
    flex: '0 0 auto',
  },
});

class EnhancedTableToolbar extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleDeleteFilter = this.handleDeleteFilter.bind(this);
    this.onShowAddDialog = this.onShowAddDialog.bind(this);
  }

  handleDeleteFilter(filters) {
    this.props.onChangeFilter(filters);
  }

  onShowAddDialog = () => {
    if (this.showModel) {
      this.showModel();
    }
  }

  render () {
    const { numSelected, classes, tableTitle, columns, filters, addComponentProps } = this.props;
    let toolComponent = null;

    if (numSelected > 0 && !common.isEmpty(filters)) {
      // 行が選択され、且つ検索のフィルター項目あり
      toolComponent = (
        <Typography color="inherit" variant="subheading">
          <GridContainer>
            <GridItem style={{lineHeight: '45px'}}>{numSelected} selected</GridItem>
            <GridItem>
              <ChipsArray chipData={filters} columns={columns} onChangeFilter={this.handleDeleteFilter} />
            </GridItem>
          </GridContainer>
        </Typography>
      );
    } else if (numSelected > 0) {
      // 行が選択される
      toolComponent = (
        <Typography color="inherit" variant="subheading">
            {numSelected} selected
        </Typography>
      );
    } else if (!common.isEmpty(filters)) {
      // 検索のフィルター項目あり
      toolComponent = <ChipsArray chipData={filters} columns={columns} onChangeFilter={this.handleDeleteFilter} />;
    } else {
      toolComponent = (
        <Typography variant="title" id="tableTitle">
          {tableTitle}
        </Typography>
      );
    }
    // 検索できる項目が存在するかどうか（Trueの場合、検索ダイアログが表示する）
    const searchable = (columns.filter(col => col.searchable === true).length > 0);
    let searchComponent = <React.Fragment />;
    if (searchable) {
      searchComponent = (
        <FilterDialog
          filterTitle={tableTitle} 
          columns={columns} 
          filters={filters} 
          onChangeFilter={this.handleDeleteFilter} 
        />
      );
    }
    let addButton = <React.Fragment />;
    if (addComponentProps) {
      addButton = (
        <Tooltip title="追加" placement='bottom' enterDelay={300}>
          { addComponentProps ? (
            <IconButton aria-label="Add" color='secondary' onClick={this.onShowAddDialog}>
              <AddIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="Add" color='secondary'>
              <AddIcon />
            </IconButton>
          )}
        </Tooltip>
      );
    }

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: (numSelected > 0 || !common.isEmpty(filters)),
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
          ) : (
            <React.Fragment>
              {addButton}
              {searchComponent}
            </React.Fragment>
          )}
          { addComponentProps ? (
            <FormDialog
              innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
              {...addComponentProps}
            />
          ) : <React.Fragment />}
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
  cellPadding: {
    paddingRight: 0,
  },
});

const paginationActionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(paginationActionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.state = {
      order: props.order,
      orderBy: props.orderBy,
      orderNumeric: false,  // 並び替え項目が数字かどうか
      selected: [],
      // data: props.data.results,
      // dataLength: props.data.count,
      // columns: props.data.columns,
      page: 0,
      rowsPerPage: config.rowsPerPage,
      clientFilters: {},
    };
  }

  handleRequestSort = (event, property, orderNumeric) => {
    const orderBy = property;
    let order = 'desc';
    let order_by = property;

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    } else {
      order_by = '-' + order_by;
    }

    this.setState({ order, orderBy, orderNumeric });

    const {isClientSide} = this.props;
    if (!isClientSide) {
      this.props.onDataRedraw(this.state.rowsPerPage, this.state.page, order_by, this.props.filters);
    }
    // ソート時ＵＲＬも変更する
    if (this.props.endpoint) {
      let params = this.props.filters;
      params['ordering'] = order_by;
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(params),
      });
    }
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
    const {isClientSide} = this.props;
    if (!isClientSide) {
      const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
      this.props.onDataRedraw(this.state.rowsPerPage, page, order_by, this.props.filters);
    }
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    const {isClientSide} = this.props;
    if (!isClientSide) {
      const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
      this.props.onDataRedraw(event.target.value, 0, order_by, this.props.filters);
    }
  };

  handleChangeFilter = filters => {
    const {isClientSide} = this.props;
    if (!isClientSide) {
      const order_by = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
      this.props.onDataRedraw(this.state.rowsPerPage, 0, order_by, filters);
    } else {
      this.setState({ clientFilters: filters});
    }
    // 検索時ＵＲＬも変更する
    if (this.props.endpoint) {
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(filters),
      });
    }
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { data, classes, tableTitle, isSelectable, filters, summary, isClientSide, addComponentProps } = this.props;
    const { order, orderBy, orderNumeric, selected, rowsPerPage, page, clientFilters } = this.state;
    let dataLength = data.count;
    const columns = data.columns;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);
    let results = data.results;
    if (isClientSide) {
      // 並び替え
      results = stableSort(data.results, getSorting(order, orderBy, orderNumeric));
      // 検索
      if (clientFilters && !common.isEmpty(clientFilters)) {
        results = stableFilter(results, clientFilters);
        dataLength = results.length;
      }
      // ページング
      results = results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          columns={columns} 
          tableTitle={tableTitle} 
          isSelectable={isSelectable} 
          filters={!common.isEmpty(filters) ? filters : clientFilters} 
          onChangeFilter={this.handleChangeFilter}
          addComponentProps={addComponentProps}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              columnData={columns}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={dataLength}
              isSelectable={isSelectable}
              isClientSide={isClientSide || false}
            />
            <TableBody>
              {dataLength > 0 ? (
                <React.Fragment>
                  {results
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
                            const numeric = col.type === 'integer' || col.type === 'decimal';
                            if (!col.visible) {
                              // 非表示の場合
                              return <React.Fragment  key={col.name}/>;
                            } else if (col.choices && !common.isEmpty(col.choices)) {
                              const choice = common.getColumnByName(col.choices, n[col.name], 'value');
                              const display_name = choice ? choice.display_name : null;
                              // 選択肢のある項目の場合
                              if (col.choiceClasses && !common.isEmpty(col.choiceClasses)) {
                                return (
                                  <TableCell key={col.name} className={classes.cellPadding}>
                                    <BadgeLabel
                                      color={col.choiceClasses[n[col.name]]}
                                      badgeContent={ display_name }
                                    />
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell
                                    key={col.name}
                                    className={classes.cellPadding}
                                  >
                                    {display_name}
                                  </TableCell>
                                );
                              }
                            } else if (numeric === true) {
                              // 数字の場合
                              return (
                                <TableCell key={col.name} align='right' className={classes.cellPadding}>
                                  {common.toNumComma(n[col.name])}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={col.name} className={classes.cellPadding}>
                                  <Typography noWrap style={{ maxWidth: 200, }}>
                                    {(col.url_field && n[col.url_field]) ? (
                                      <Link to={n[col.url_field]}>{n[col.name]}</Link>
                                    ) : n[col.name] }
                                  </Typography>
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })
                  }
                </React.Fragment>
              ) : (
                <TableRow>
                  <TableCell colSpan={ isSelectable ? columns.length + 1 : columns.length }>
                    { constant.INFO.NO_DATA }
                  </TableCell>
                </TableRow>
              )}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={ isSelectable ? columns.length + 1 : columns.length } />
                </TableRow>
              )} */}
            </TableBody>
            {!common.isEmpty(summary) ? 
            <EnhancedTableFooter 
              classes={classes}
              numSelected={selected.length}
              columnData={columns}
              rowCount={dataLength}
              summary={summary}
            /> : (<React.Fragment></React.Fragment>)
            }
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
          ActionsComponent={TablePaginationActionsWrapped}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  tableTitle: PropTypes.string,
  filters: PropTypes.object,
  isSelectable: PropTypes.bool,
  isClientSide: PropTypes.bool,
  summary: PropTypes.object,
  endpoint: PropTypes.string,
};

EnhancedTable.defaultProps = {
  tableTitle: '',
  filters: {},
  isSelectable: false,
  isClientSide: false,
  summary: {},
};

export default withStyles(styles)(EnhancedTable);