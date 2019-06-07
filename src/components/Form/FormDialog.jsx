import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Card from "../Card/Card";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from '../Card/CardFooter';
import FormComponent from './Form';
import { common } from '../../utils/common';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  rightAlign: {
    textAlign: 'right',
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    width: '100%',
    maxWidth: 750,
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
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
  cardBody: {
    height: 400,
    overflow: 'auto'
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleOk = this.handleOk.bind(this);
    this.state = {
      open: false,
      data: {},
    }
  }

  handleOpen = (initial) => {
    this.setState({
      open: true,
      data: initial,
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOk = () => {
    if (this._handleOk) {
      this._handleOk();
    }
  };

  render() {
    const { classes, title } = this.props;
    const { open, data } = this.state;
    let props = Object.assign({}, this.props);
    if (!common.isEmpty(data)) {
      props['data'] = data;
    }

    return (
      <div>
        <Modal
          open={open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={getModalStyle()} className={classes.paper}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>{title}</h4>
                  </CardHeader>
                  <CardBody className={classes.cardBody}>
                    <FormComponent
                      ref={(form) => {
                        this._handleOk = form && form.handleOk;
                      }}
                      {...props}
                      handleClose={this.handleClose}
                    />
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.rightAlign}>
                      <Button onClick={this.handleClose}>
                        キャンセル
                      </Button>
                      <Button onClick={this.handleOk} color="primary" type="submit" autoFocus={true}>
                        確定
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Modal>
      </div>
    )
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);
