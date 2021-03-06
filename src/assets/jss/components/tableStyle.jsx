import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "../material-dashboard-react.jsx";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor
  },
  primaryTableHeader: {
    color: primaryColor
  },
  dangerTableHeader: {
    color: dangerColor
  },
  successTableHeader: {
    color: successColor
  },
  infoTableHeader: {
    color: infoColor
  },
  roseTableHeader: {
    color: roseColor
  },
  grayTableHeader: {
    color: grayColor
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    fontSize: "1em"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflow: "visible",
  },
  tableActions: {
    display: "flex",
    padding: "12px 8px !important",
    verticalAlign: "middle",
    textAlign: 'center',
  },
  tableActionCell: {
    width: 35,
    textAlign: 'center',
    padding: 0,
  },
  tableActionButton: {
    margin: 2,
  },
  tableActionWrapper: {
    display: 'flex',
    position: 'absolute',
    top: '0',
    right: '50px',
    whiteSpace: 'nowrap',
  },
  tableRowSelected: {
    backgroundColor: '#fff0c3',
  },
});

export default tableStyle;
