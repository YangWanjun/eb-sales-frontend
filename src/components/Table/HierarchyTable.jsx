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
import DataTableCell from './DataTableCell';
import DataTableFixedHead from './DataTableFixedHead';
import { getFixedHeaderOption } from './TableCommon';
import tableStyle from "../../assets/jss/components/tableStyle.jsx";
import { common } from '../../utils/common';

const defaultPaddingLeft = 8;

class HierarchyTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
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
    const { tableData } = this.props;
    const rootRows = common.isEmpty(tableData) ? [] : tableData.filter(row => row.parent === null);
    let rows = [];
    rootRows.map(row => {
      return this.getChildRows(rows, row);
    });
    return rows;
  }

  getChildRows(items, item, deep=0) {
    const { tableData } = this.props;
    const children = tableData.filter(sub => sub.parent === item.id);

    items.push(this.getTableRow(item, deep));
    children.map(sub => {
      return this.getChildRows(items, sub, deep + 1);
    });
  }

  getTableRow(row, deep) {
    const { classes, tableHead } = this.props;
    return (
      <TableRow key={row.id} hover>
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
      </TableRow>
    );
  }

  render () {
    const { classes, tableHeaderColor, tableHead } = this.props;
    const { showFixedHeader, tableId, fixedHeaderPosition, fixedHeaderColsWidth } = this.state;
    const rows = this.getAllRows()

    return (
      <div className={classes.tableResponsive} style={{marginTop: 0}}>
        <Table className={classes.table} id={tableId}>
          {tableHead !== undefined ? (
            <DataTableHead
              {...{classes, tableHeaderColor, tableHead}}
            />
          ) : null}
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
              />
            }
          />
        ) : null}
      </div>
    );
  }
}

HierarchyTable.defaultProps = {
  tableHeaderColor: "gray"
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
  tableData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(tableStyle)(HierarchyTable);
