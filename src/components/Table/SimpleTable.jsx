import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Table,
  TableRow,
  TableBody,
} from "@material-ui/core";
// core components
import DataTableCell from './DataTableCell';
import DataTableHead from './DataTableHead';
import tableStyle from "../../assets/jss/components/tableStyle.jsx";

class SimpleTable extends React.Component {

  render () {
    const { classes, tableHeaderColor, tableHead, tableData } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <DataTableHead
            {...{classes, tableHeaderColor, tableHead}}
          />
          <TableBody>
            {tableData.map((row, key) => {
              return (
                <TableRow key={key}>
                  {tableHead.map((col, key) => {
                    return (
                      <DataTableCell
                        key={key}
                        classes={classes}
                        column={col}
                        row={row}
                      />
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

SimpleTable.defaultProps = {
  tableHeaderColor: "gray"
};

SimpleTable.propTypes = {
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

export default withStyles(tableStyle)(SimpleTable);
