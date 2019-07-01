import React from "react";
import uuid from 'uuid';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Table,
  TableRow,
  TableBody,
} from "@material-ui/core";
// core components
import DataTableHead from './DataTableHead';
import DataTableCell from '../../containers/dataTableCell';
import DataTableFixedHead from './DataTableFixedHead';
import { getFixedHeaderOption } from './TableCommon';
import tableStyle from "../../assets/jss/components/tableStyle.jsx";
import { common } from '../../utils/common';

const defaultPaddingLeft = 8;

class HierarchyTable extends React.Component {

  constructor(props) {
    super(props);

    this.handleHideActions = this.handleHideActions.bind(this);
    this.handleRowUpdated = this.handleRowUpdated.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.state = {
      tableData: this.initializeData(props.tableData),
      showFixedHeader: false,
      tableId: uuid(),
      fixedHeaderPosition: {
        left: 0,
        width: 0,
        top: 0,
      },
      fixedHeaderColsWidth: [],
      selected: [],
    }
  }

  initializeData(data) {
    if (data) {
      data.map((row, index) => row['__index__'] = index);
    }
    return data;
  }

  handleScroll = () => {
    const { tableId, paginationId } = this.state;
    const data = getFixedHeaderOption(tableId, paginationId, 16);

    this.setState(data);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll); // PropsにUpdater渡してあるので呼べる
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll); // Unmount時に外してあげる
  }

  getAllRows() {
    const { tableData } = this.state;
    const rootRows = common.isEmpty(tableData) ? [] : tableData.filter(row => row.parent === null);
    let rows = [];
    rootRows.map(row => {
      return this.getChildRows(rows, row);
    });
    return rows;
  }

  getChildRows(items, item, deep=0) {
    const { tableData } = this.state;
    const children = tableData.filter(sub => sub.parent === item.id);

    items.push(this.getTableRow(item, deep));
    children.map(sub => {
      return this.getChildRows(items, sub, deep + 1);
    });
  }

  handleHideActions() {
    const { rowActions } = this.props;
    if (rowActions && rowActions.length > 0 && this._handleHideActions) {
      this._handleHideActions();
    }
  }

  handleRowClick = (data) => (event) => {
    const { selectable, onRowClick } = this.props;
    const { selected } = this.state;
    if (selectable === 'single') {
      let newSelected = [];
      if (selected.length === 0 || selected[0] !== data.__index__) {
        newSelected.push(data.__index__);
      } 
      this.setState({selected: newSelected});
      if (onRowClick) {
        onRowClick(newSelected.length > 0 ? data : null);
      }
    }
  };

  getTableRow(row, deep) {
    const { classes, tableHead, rowActions, actionsTrigger } = this.props;
    const { selected } = this.state;

    return (
      <TableRow
        key={row.id}
        hover
        onMouseLeave={this.handleHideActions}
        onClick={this.handleRowClick(row)}
        className={selected.indexOf(row.__index__) >= 0 ? classes.tableRowSelected : null}
      >
        {tableHead.map((col, key) => {
          let paddingLeft = key === 0 ? ((deep * 30) || defaultPaddingLeft) : defaultPaddingLeft;
          return (
            <DataTableCell
              key={key}
              classes={classes}
              style={{paddingLeft: paddingLeft}}
              column={col}
              row={row}
            />
          );
        })}
        {rowActions.length > 0 ? (
          <DataTableCell
            classes={classes}
            actions={rowActions}
            actionsTrigger={actionsTrigger}
            row={row}
            ref={(cell) => {
              this._handleHideActions = cell && cell.getWrappedInstance().handleHideActions;
            }}
          />
        ) : null}
      </TableRow>
    );
  }

  handleRowUpdated(row) {
    let { tableData } = this.state;
    let existedRow = null;
    if (row.__index__) {
      existedRow = common.getColumnByName(tableData, row.__index__, '__index__');
    } else {
      existedRow = common.getColumnByName(tableData, row.id, 'id');
    }
    if (existedRow) {
      Object.assign(existedRow, row);
      this.setState({tableData});
    }
  }

  render () {
    const { classes, tableHeaderColor, tableHead, tableActions, rowActions } = this.props;
    const { showFixedHeader, tableId, fixedHeaderPosition, fixedHeaderColsWidth } = this.state;
    const rows = this.getAllRows()

    return (
      <div className={classes.tableResponsive} style={{marginTop: 0}}>
        <Table className={classes.table} id={tableId}>
          <DataTableHead
            {...{classes, tableHeaderColor, tableHead}}
            actions={tableActions ? tableActions : (rowActions ? true : false)}
          />
          <TableBody>
            {rows.map(row => {
              return row;
            })}
          </TableBody>
        </Table>
        { showFixedHeader ? (
          <DataTableFixedHead
            classes={classes}
            fixedHeaderPosition={fixedHeaderPosition}
            children={
              <DataTableHead
                {...{classes, tableHeaderColor, tableHead}}
                colsWidth={fixedHeaderColsWidth} 
                actions={tableActions ? tableActions : (rowActions ? true : false)}
                />
            }
          />
        ) : null}
      </div>
    );
  }
}

HierarchyTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
  tableActions: PropTypes.arrayOf(PropTypes.object),
  rowActions: PropTypes.arrayOf(PropTypes.object),
  actionsTrigger: PropTypes.func,
  selectable: PropTypes.oneOf(['none', 'single', 'multiple']),
};

HierarchyTable.defaultProps = {
  tableHeaderColor: "gray",
  tableActions: [],
  rowActions: [],
  selectable: 'none',
};

export default withStyles(tableStyle)(HierarchyTable);
