import React from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
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
import EditIcon from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ArchiveIcon from '@material-ui/icons/Archive'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { lighten } from '@material-ui/core/styles/colorManipulator';
import FilterDialog from '../filterDialog';
import ChipsArray from '../chipArray';
import BadgeLabel from '../badgeLabel';
import ConfirmDialog from '../ConfirmDialog';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import FormDialog from '../../containers/FormDialog';
import { common } from '../../utils/common';
import { config } from '../../utils/config';
import { constant } from '../../utils/constants';
import { history } from '../../utils/store';

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
    ? (a, b) => ((b[orderBy] || '') < (a[orderBy] || '') ? -1 : 1)
    : (a, b) => ((a[orderBy] || '') < (b[orderBy] || '') ? -1 : 1);
  }
}

function stableFilter(array, filters) {
  Object.keys(filters).map( key => {
    array = array.filter(function(item) {
      let item_value = item[key];
      if (item_value === true || item_value === false) {
        return (filters[key] === true || filters[key] === false) ? item_value === filters[key] : true;
      } else if (filters[key] === true || filters[key] === false) {
        return item_value === (filters[key] === true ? 1 : 0);
      } else if (item_value) {
        return item_value.indexOf(filters[key]) >= 0;
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
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, columnData, selectable, isClientSide, classes, colsWidth } = this.props;
    let chkCell = <React.Fragment/>;
    let idx = 0;
    if (selectable === 'multiple') {
      chkCell = (
        <TableCell padding="none">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            disabled={rowCount === 0}
          />
        </TableCell>
      );
      idx += 1;
    } else if (selectable === 'single') {
      chkCell = (
        <TableCell padding="none"></TableCell>
      );
      idx += 1;
    }

    return (
      <TableHead>
        <TableRow>
          { chkCell }
          {columnData.map(column => {
            const numeric = column.type === 'integer' || column.type === 'decimal';
            let width = 'inherit';
            if (column.visible !== false && colsWidth && colsWidth.length >= idx) {
              width = colsWidth[idx];
              idx += 1;
            }
            const cell = column.visible !== false ? (
              ((isClientSide || column.sortable) && rowCount > 0) ? (
                <TableCell
                  key={column.name}
                  style={{width}}
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
                      active={orderBy === (isClientSide ? column.name : (column.sort_field || column.name))}
                      direction={order}
                      onClick={this.createSortHandler(isClientSide ? column.name : (column.sort_field || column.name), numeric)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell
                  key={column.name}
                  style={{width}}
                  align={column.numeric ? 'right' : 'inherit'}
                  className={classes.cellPadding}
                >{column.label}</TableCell>
              )
            ) : (<React.Fragment key={column.name}/>);
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
  selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
};

class EnhancedTableFooter extends React.Component {
  render() {
    const { classes, onSelectAllClick, numSelected, rowCount, columnData, selectable, summary } = this.props;
    const chkCell = selectable === 'multiple' ? (
      <TableCell padding="none">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
    ) : null;
    console.log(summary);

    return (
      <TableFooter>
        <TableRow>
          { chkCell }
          {columnData.map(col => {
            const numeric = col.type === 'integer' || col.type === 'decimal';
            if (col.visible === false) {
              return null;
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
    this.onShowEditDialog = this.onShowEditDialog.bind(this);
    this.state = {
      filters: props.filters,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
      this.setState({filters: nextProps.filters});
    }
  }

  handleDeleteFilter(filters) {
    this.props.onChangeFilter(filters);
  }

  onShowAddDialog = () => {
    if (this.showModel) {
      this.showModel();
    }
  };

  onShowEditDialog = () => {
    const { selected, results, formComponentProps } = this.props;
    if (selected.length > 1) {
      this.props.showErrorMsg(constant.ERROR.REQUIRE_SINGLE_SELECT);
    } else if (this.showModel) {
      let row = Object.assign({}, common.getColumnByName(results, selected[0], '__index__'));
      formComponentProps.schema.map(col => {
        if (col.type === 'field' && col.display_field) {
          row[col.name] = [{value: row[col.name], display_name: row[col.display_field]}]
        }
        return true;
      })
      this.showModel(row);
    }
  };

  onShowDeleteDialog = () => {
    if (this.props.onRowDeleted) {
      if (this.props.numSelected <= 0) {
        this.props.showErrorMsg(constant.ERROR.REQUIRE_SELECTED_DATA);
      } else if (this.showConfirm) {
        this.showConfirm();
      }
    }
  };

  handleActionClick = (method) => () =>  {
    const { selected, selectable, results } = this.props;
    if (selectable === 'none') {
      method();
    } else if (common.isEmpty(selected)) {
      this.props.showErrorMsg(constant.ERROR.REQUIRE_SELECTED_DATA);
    } else if (selected.length === 1) {
      const row = common.getColumnByName(results, selected[0], '__index__');
      method(row);
    } else {
      this.props.showErrorMsg(constant.ERROR.REQUIRE_SINGLE_SELECT);
    }
  };

  render () {
    const { numSelected, selectable, classes, tableTitle, columns, formComponentProps, actions } = this.props;
    const { filters } = this.state;
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
    let editButton = <React.Fragment />;
    if (formComponentProps && !common.isEmpty(formComponentProps)) {
      if (formComponentProps.add_url) {
        addButton = (
          <Tooltip title="追加" placement='bottom' enterDelay={300}>
            { formComponentProps ? (
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
      if (formComponentProps.edit_url) {
        editButton = (
          <Tooltip title="編集">
            <IconButton aria-label="Edit" onClick={this.onShowEditDialog}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        );
      }
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
          {selectable === 'none' ? (
            <React.Fragment>
              {actions.map(btn => (
                <Tooltip key={uuid()} title={btn.tooltip} placement='bottom' enterDelay={300}>
                  <IconButton aria-label="Action" onClick={this.handleActionClick(btn.handleClick)}>
                    {btn.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </React.Fragment>
          ) : null}
          {numSelected > 0 ? (
            <React.Fragment>
              {actions.map(btn => (
                <Tooltip key={uuid()} title={btn.tooltip} placement='bottom' enterDelay={300}>
                  <IconButton aria-label="Action" onClick={this.handleActionClick(btn.handleClick)}>
                    {btn.icon}
                  </IconButton>
                </Tooltip>
              ))}
              {editButton}
              { this.props.onRowDeleted ? (
                <React.Fragment>
                  <Tooltip title="削除">
                    <IconButton aria-label="Delete" onClick={this.onShowDeleteDialog}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <ConfirmDialog
                    innerRef={(dialog) => { this.showConfirm = dialog && dialog.handleOpen }}
                    title={'データを削除します、よろしいですか？'}
                    onOk={this.props.onRowDeleted}
                  />
                </React.Fragment>
              ) : <React.Fragment />}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {addButton}
              {searchComponent}
            </React.Fragment>
          )}
          { (formComponentProps && !common.isEmpty(formComponentProps)) ? (
            <FormDialog
              innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
              {...formComponentProps}
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
    marginBottom: theme.spacing.unit * 3,
  },
  table: {
    /* minWidth: 1020, */
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.07) !important"
    }
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
    this.handleRowAdded = this.handleRowAdded.bind(this);
    this.handleRowUpdated = this.handleRowUpdated.bind(this);
    this.handleRowDeleted = this.handleRowDeleted.bind(this);
    this.state = {
      data: this.initializeData(props.data),
      order: props.order,
      orderBy: props.orderBy,
      orderNumeric: false,  // 並び替え項目が数字かどうか
      selected: [],
      filters: props.filters,
      page: props.page,
      rowsPerPage: config.rowsPerPage,
      showFixedHeader: false,
      fixedHeaderPosition: {
        left: 0,
        width: 0,
        top: 0,
      },
      fixedHeaderColsWidth: [],
      tableId: uuid(),
      paginationId: uuid(),
    };
  }

  initializeData(data) {
    if (data) {
      data.results.map((row, index) => row['__index__'] = index);
    }
    return data;
  }

  handleScroll = () => {
    const { tableId, paginationId } = this.state;
    const table = document.getElementById(tableId);
    const pagination = document.getElementById(paginationId);
    const {left, width, top, height} = table.getBoundingClientRect();
    const paginationHeight = pagination.getBoundingClientRect().height;
    let fixedHeaderColsWidth = [];
    let colWidth = 0;
    const headerCells = table.querySelector('thead>tr').children;
    Array.prototype.forEach.call(headerCells, function(ele, idx) {
      colWidth = ele.getBoundingClientRect().width - 24;
      if (headerCells.length === (idx) + 1) {
        colWidth -= 24;
      }
      fixedHeaderColsWidth.push(colWidth);
    });

    if (top < 64 && top > (64 - height + paginationHeight)) {
      this.setState({showFixedHeader: true, fixedHeaderPosition: {left, width, top: 64}, fixedHeaderColsWidth});
    } else {
      this.setState({showFixedHeader: false});
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll); // PropsにUpdater渡してあるので呼べる
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // Unmount時に外してあげる
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.order !== this.props.order) {
      newState['order'] = nextProps.order;
    }
    if (nextProps.orderBy !== this.props.orderBy) {
      newState['orderBy'] = nextProps.orderBy;
    }
    if (nextProps.page !== this.props.page) {
      newState['page'] = nextProps.page;
    }
    if (nextProps.rowsPerPage !== this.props.rowsPerPage) {
      newState['rowsPerPage'] = nextProps.rowsPerPage;
    }
    if (JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)) {
      newState['filters'] = nextProps.filters;
    }
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      newState['data'] = this.initializeData(nextProps.data);
    }
    if (!common.isEmpty(newState)) {
      this.setState(newState);
    }
  }

  combineParams(filters) {
    let params = Object.assign({}, filters);
    params['ordering'] = (this.state.order === 'desc' ? '-': '') + this.state.orderBy;
    params['page'] = this.state.page;
    params['limit'] = this.state.rowsPerPage;
    return params;
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

    if (this.props.isClientSide) {
      this.setState({ order, orderBy, orderNumeric });
    } else if (this.props.endpoint) {
      let params = this.combineParams(this.state.filters);
      params['ordering'] = order_by;
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(params),
      });
    }
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.results.map(n => n.__index__) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, index) => {
    if (this.props.selectable === 'none') {
      return;
    }
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];
    if (this.props.selectable === 'multiple') {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, index);
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
    } else if (this.props.selectable === 'single') {
      if (selectedIndex === -1) {
        newSelected = [index];
      } else {
        newSelected = [];
      }
    }

    if (this.props.handleSelect) {
      // 検索ダイアログの場合
      this.props.handleSelect(this.props.data.results.filter(col => newSelected.indexOf(col.__index__) > -1));
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    if (this.props.isClientSide) {
      this.setState({ page });
    } else if (this.props.endpoint) {
      let params = this.combineParams(this.state.filters);
      params['page'] = page;
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(params),
      });
    }
  };

  handleChangeRowsPerPage = event => {
    if (this.props.isClientSide) {
      this.setState({ rowsPerPage: event.target.value });
    } else if (this.props.endpoint) {
      let params = this.combineParams(this.state.filters);
      params['limit'] = event.target.value;
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(params),
      });
    }
  };

  handleChangeFilter = filters => {
    if (this.props.isClientSide) {
      this.setState({ filters });
    } else if (this.props.endpoint) {
      let params = this.combineParams(filters);
      params['page'] = 0;
      history.push({
        'pathname': this.props.endpoint,
        'search': common.jsonToUrlParameters(params),
      });
    }
  };

  handleRowAdded(row) {
    let { data } = this.state;
    if (row.__index__ !== null && row.__index__ !== undefined) {
      let existedRow = common.getColumnByName(data.results, row.__index__, '__index__');
      Object.assign(existedRow, row);
      this.setState({data});
    } else {
      data.results.push(row);
      data.count += 1;
      data = this.initializeData(data);
      this.setState({
        data,
        selected: [],
      });
    }
  }

  handleRowUpdated(row) {
    let { data } = this.state;
    let existedRow = common.getColumnByName(data.results, row.__index__, '__index__');
    Object.assign(existedRow, row);
    this.setState({data});
  }

  async handleRowDeleted() {
    let { selected, data } = this.state;
    let deletedPks = [];
    for (var index of selected) {
      const pk = common.getColumnByName(data.results, index, '__index__').id;
      const response = common.fetchDelete(common.formatStr(this.props.deleteUrl, pk));
      await response.then(this.deleteSuccess(pk, deletedPks)).catch(() => {});
    }
    if (deletedPks.length > 0) {
      const message = common.formatStr(constant.SUCCESS.DELETED_PARTIALLY, deletedPks.length, selected.length);
      data.count -= deletedPks.length;
      data.results = data.results.filter(row => (deletedPks.indexOf(row.id) < 0));
      this.setState({selected: [], data})
      if (deletedPks.length === selected.length) {
        // すべて選択されたデータが削除した場合
        this.props.showSuccessMsg(message);
        return true;
      } else {
        // 一部のデータが削除した場合
        this.props.showWarningMsg(message);
        return false;
      }
    } else {
      this.props.showErrorMsg(common.formatStr(constant.ERROR.DELETED_FAILURE));
      return false;
    }
  }

  deleteSuccess(pk, deletedPks) {
    deletedPks.push(pk);
  }

  isSelected = index => this.state.selected.indexOf(index) !== -1;

  getExtraStyles(row) {
    let extraStyles = {};
    const columns = this.props.columns.filter(col => col.hasOwnProperty('styles'));
    columns.map(col => {
      let styles = col.styles[row[col.name]];
      return Object.assign(extraStyles, styles);
    });
    return extraStyles;
  }

  handleFileDownload = file_id => () => {
    common.fetchGet(common.formatStr(config.api.attachment_download, file_id)).then(data => {
      const blob = common.toBlob(data.blob);
      common.downloadBlog(blob, data.name);
    }).catch(data => {
      this.props.showErrorMsg(data.detail);
    });
  }

  render() {
    const { columns, classes, tableTitle, selectable, summary, actions } = this.props;
    let { formComponentProps } = this.props;
    const {
      tableId, paginationId,
      data, order, orderBy, orderNumeric, filters, selected, rowsPerPage, page,
      showFixedHeader, fixedHeaderPosition, fixedHeaderColsWidth
    } = this.state;
    let dataLength = data ? data.count : 0;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);
    let results = data ? data.results : [];
    if (this.props.isClientSide) {
      // 並び替え
      results = stableSort(data ? data.results : [], getSorting(order, orderBy, orderNumeric));
      // 検索
      if (!common.isEmpty(filters)) {
        results = stableFilter(results, filters);
        dataLength = results.length;
      }
      // ページング
      results = results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    const tableHeaderParams = {
      classes: classes,
      numSelected: selected.length,
      order: order,
      columnData: columns,
      orderBy: orderBy,
      onSelectAllClick: this.handleSelectAllClick,
      onRequestSort: this.handleRequestSort,
      rowCount: dataLength,
      selectable: selectable,
      isClientSide: this.props.isClientSide || false,
    };
    if (formComponentProps) {
      formComponentProps['onRowAdded'] = this.handleRowAdded;
      formComponentProps['onRowUpdated'] = this.handleRowUpdated;
    }

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          selected={selected}
          selectable={selectable}
          results={data ? data.results : []}
          columns={columns} 
          tableTitle={tableTitle}
          filters={filters} 
          onChangeFilter={this.handleChangeFilter}
          onRowDeleted={this.props.deleteUrl ? this.handleRowDeleted : null}
          formComponentProps={{...formComponentProps}}
          showErrorMsg={this.props.showErrorMsg}
          actions={actions}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableHeader" id={tableId}>
            <EnhancedTableHead {...tableHeaderParams} />
            <TableBody>
              {dataLength > 0 ? (
                <React.Fragment>
                  {results
                    .map(n => {
                      const isSelected = this.isSelected(n.__index__);
                      let chkCell = <React.Fragment/>;
                      if (selectable === 'multiple' || selectable === 'single') {
                        chkCell = (
                          <TableCell padding="none">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                        );
                      }
                      const styles = this.getExtraStyles(n)
                      return (
                        <TableRow
                          className={classes.tableRow}
                          onClick={event => this.handleClick(event, n.__index__)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.__index__}
                          selected={isSelected}
                          style={{...styles}}
                        >
                          {chkCell}
                          {columns.map(col => {
                            const numeric = col.type === 'integer' || col.type === 'decimal';
                            if (col.visible === false) {
                              // 非表示の場合
                              return <React.Fragment key={col.name}/>;
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
                            } else if (col.type === 'boolean') {
                              if (n[col.name] === true || n[col.name] === 1) {
                                return (
                                  <TableCell key={col.name} className={classes.cellPadding}>
                                    <CheckCircleIcon style={{color: 'green'}} />
                                  </TableCell>
                                );
                              } else if (n[col.name] === false || n[col.name] === 0) {
                                return (
                                  <TableCell key={col.name} className={classes.cellPadding}>
                                    <HighlightOffIcon style={{color: 'red'}} />
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell key={col.name} className={classes.cellPadding}>
                                  </TableCell>
                                );
                              }
                            } else if (col.type === 'file') {
                              return (
                                <TableCell key={col.name} className={classes.cellPadding}>
                                  { n[col.name] ? (
                                    <IconButton onClick={this.handleFileDownload(n[col.name])}>
                                      <ArchiveIcon/>
                                    </IconButton>
                                  ) : <React.Fragment />}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={col.name} className={classes.cellPadding}>
                                  <Typography noWrap style={{ maxWidth: 260, }}>
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
                  <TableCell colSpan={ selectable === 'multiple' || selectable === 'single' ? columns.length + 1 : columns.length }>
                    { constant.INFO.NO_DATA }
                  </TableCell>
                </TableRow>
              )}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={ selectable === 'multiple' ? columns.length + 1 : columns.length } />
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
          id={paginationId}
          count={dataLength}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={config.rowsPerPageOptions}
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
        { showFixedHeader ? (
          <Table
            className={classes.table}
            aria-labelledby="fixedHeader"
            style={{
              position: "fixed",
              backgroundColor: 'white', 
              ...fixedHeaderPosition,
              tableLayout: 'fixed'
            }}
          >
            <EnhancedTableHead
              {...tableHeaderParams}
              colsWidth={fixedHeaderColsWidth} 
            />
          </Table>
        ) : <React.Fragment />}
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  tableTitle: PropTypes.string,
  filters: PropTypes.object,
  selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
  isClientSide: PropTypes.bool,
  summary: PropTypes.object,
  endpoint: PropTypes.string,
  handleSelect: PropTypes.func,
};

EnhancedTable.defaultProps = {
  tableTitle: '',
  filters: {},
  selectable: 'none',
  isClientSide: false,
  summary: {},
  actions: [],
  columns: [],
};

export default withStyles(styles)(EnhancedTable);