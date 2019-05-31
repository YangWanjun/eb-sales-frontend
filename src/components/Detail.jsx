import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from '@material-ui/core';
import GridContainer from './Grid/GridContainer';
import GridItem from './Grid/GridItem';
import Card from "./Card/Card";
import CardBody from "./Card/CardBody.jsx";
import CardFooter from "./Card/CardFooter.jsx";
import BadgeLabel from '../components/badgeLabel';
import ConfirmDialog from '../components/ConfirmDialog';
import { FormDialog } from './Form/index'
import { common } from '../utils/common';
import { constant } from '../utils/constants';
import { history } from '../utils/store';

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cellHeader: {
    textAlign: 'right',
    width: '25%',
    minWidth: 100,
  },
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class DetailPanel extends React.Component {

  constructor(props) {
    super(props);

    this.onShowEditDialog = this.onShowEditDialog.bind(this);
    this.handleDataUpdated = this.handleDataUpdated.bind(this);
    this.onShowDeleteDialog = this.onShowDeleteDialog.bind(this);
    this.handleDataDeleted = this.handleDataDeleted.bind(this);
    this.state = {
      data: props.data || {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({data: nextProps.data});
    }
  }

  onShowEditDialog = () => {
    if (this.showModel) {
      const { formComponentProps } = this.props;
      let data = Object.assign({}, this.state.data);
      formComponentProps.schema.map(col => {
        if (col.type === 'field' && col.display_field && data[col.name]) {
          data[col.name] = [{value: data[col.name], display_name: data[col.display_field]}]
        }
        return true;
      });
      this.showModel(data);
    }
  };

  onShowDeleteDialog() {
    if (this.showConfirm) {
      this.showConfirm();
    }
  }

  handleDataUpdated(newData) {
    let { data } = this.state;
    Object.assign(data, newData);
    if (this.props.sendDataUpdated) {
      this.props.sendDataUpdated(data);
    }
    this.setState({data});
  }

  async handleDataDeleted() {
    const { deleteUrl, deletedNext } = this.props;
    if (deleteUrl) {
      let success = true;
      let message = constant.SUCCESS.DELETED
      const response = common.fetchDelete(deleteUrl);
      await response
        .then(() => {})
        .catch(data => {
          success = false;
          if (data && data.detail) {
            message = data.detail;
          } else {
            message = constant.ERROR.DELETED_FAILURE;
          }
        });
      if (success === true) {
        // 削除成功しました。
        if (deletedNext) {
          history.push(deletedNext);
        }
        this.props.showSuccessMsg(message);
        return true;
      } else {
        // 削除失敗しました。
        this.props.showErrorMsg(message);
        return false;
      }
    }
  }

  render() {
    const { classes, title, schema, formComponentProps, actions, deleteUrl } = this.props;
    const { data } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card className={ classes.cardStyle }>
            <CardBody>
              <h3>{ title }</h3>
              <Table>
                <TableBody>
                  { schema.map(col => {
                    const value = data[col.name];
                    let display_name = value;
                    let badgeColor = null;
                    if (!common.isEmpty(data) && value != null && col.type === 'choice' && col.choices) {
                      const colChoice = common.getColumnByName(col.choices, value, 'value')
                      display_name = colChoice ? colChoice.display_name : '';
                    } else if (!common.isEmpty(data) && col.type === 'boolean') {
                      display_name = value === true ? 'はい' : 'いいえ';
                    }
                    if (col.styles && col.styles[value]) {
                      badgeColor = col.styles[value].backgroundColor;
                    }
                    return (
                      <TableRow key={col.name}>
                        <TableCell className={classes.cellHeader}>{col.label}</TableCell>
                        { badgeColor === null ? (
                          <TableCell>
                            <Typography style={{whiteSpace: 'pre-line'}}>
                              {(col.url_field && data[col.url_field]) ? (
                                <Link to={data[col.url_field]}>{display_name}</Link>
                              ) : display_name}
                            </Typography>
                          </TableCell>
                        ) : (
                          <TableCell><BadgeLabel color={badgeColor} badgeContent={ display_name } /></TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter chart>
              { actions.map(button => {
                return button;
              })}
              <Typography style={{flex: 1}} />
              { deleteUrl ? (
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={this.onShowDeleteDialog}
                >
                  &nbsp;&nbsp;&nbsp;削除&nbsp;&nbsp;&nbsp;
                </Button>
              ) : <React.Fragment /> }
              { formComponentProps ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.onShowEditDialog}
                >
                  &nbsp;&nbsp;&nbsp;変更&nbsp;&nbsp;&nbsp;
                </Button>
              ) : <React.Fragment />}
              { formComponentProps ? (
                <FormDialog
                  innerRef={(dialog) => { this.showModel = dialog && dialog.handleOpen }}
                  {...formComponentProps}
                  onRowUpdated={this.handleDataUpdated}
                />
              ) : <React.Fragment /> }
              <ConfirmDialog
                innerRef={(dialog) => { this.showConfirm = dialog && dialog.handleOpen }}
                title={'データを削除します、よろしいですか？'}
                onOk={this.handleDataDeleted}
              />
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
};

DetailPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  schema: PropTypes.array.isRequired,
};

DetailPanel.defaultProps = {
  actions: [],
}

export default withStyles(styles)(DetailPanel);
