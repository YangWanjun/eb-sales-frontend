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
    const data = getFixedHeaderOption(tableId, paginationId);

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
    const { actions } = this.props;
    if (actions && actions.length > 0 && this._handleHideActions) {
      this._handleHideActions();
    }
  }

  getTableRow(row, deep) {
    const { classes, tableHead, actions, actionsTrigger } = this.props;
    return (
      <TableRow key={row.id} hover onMouseLeave={this.handleHideActions}>
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
        {actions.length > 0 ? (
          <DataTableCell
            classes={classes}
            actions={actions}
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
    let existedRow = common.getColumnByName(tableData, row.__index__, '__index__');
    Object.assign(existedRow, row);
    this.setState({tableData});
  }

  render () {
    const { classes, tableHeaderColor, tableHead, actions } = this.props;
    const { showFixedHeader, tableId, fixedHeaderPosition, fixedHeaderColsWidth } = this.state;
    const rows = this.getAllRows()

    return (
      <div className={classes.tableResponsive} style={{marginTop: 0}}>
        <Table className={classes.table} id={tableId}>
          <DataTableHead
            {...{classes, tableHeaderColor, tableHead}}
            actions={actions}
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
                actions={actions}
              />
            }
          />
        ) : null}
      </div>
    );
  }
}

HierarchyTable.defaultProps = {
  tableHeaderColor: "gray",
  actions: [],
};

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
  actions: PropTypes.arrayOf(PropTypes.object),
  actionsTrigger: PropTypes.func,
};

export default withStyles(tableStyle)(HierarchyTable);
