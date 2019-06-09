import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody.jsx";
import CardFooter from "../components/Card/CardFooter.jsx";
import { config } from '../utils/config';
import { common } from '../utils/common';

const styles = () => ({
  cardStyle: {
    marginTop: 0,
    marginBottom: 15,
  },
});

class PartnerOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
      order: {},
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_detail = common.formatStr(config.api.partner_detail, params.partner_id);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
    const url_order_detail = common.formatStr(config.api.partner_member_order_detail, params.order_id);
    common.fetchGet(url_order_detail).then(data => {
      this.setState({
        order: data,
      });
    });
    common.fetchGet(common.formatStr(config.api.partner_lump_order_html, params.order_id)).then(data => {
      this.setState({
        order_html: data.html[0],
        order_request_html: data.html[1],
      });
    });
  }

  printOrder = () => {
    var frm = document.getElementById('printOrder').contentWindow;
    frm.focus();
    frm.print();
    return false;
  };

  printOrderRequest = () => {
    var frm = document.getElementById('printOrderRequest').contentWindow;
    frm.focus();
    frm.print();
    return false;
  };

  render() {
    const { classes } = this.props;
    const { params } = this.props.match;
    const { partner, order, order_html, order_request_html } = this.state;

    return (
			<div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.partner_id} >{partner.name}</Link>
          <Typography color="textPrimary">{order.order_no}</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={ classes.cardStyle }>
              <CardBody>
                <iframe
                  title='注文書'
                  id='printOrder'
                  srcDoc={order_html}
                  frameBorder='0'
                  width='100%'
                  height='1080px'
                >
                </iframe>
              </CardBody>
              <CardFooter chart>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.printOrder}
                >
                  &nbsp;&nbsp;&nbsp;印刷&nbsp;&nbsp;&nbsp;
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card className={ classes.cardStyle }>
              <CardBody>
                <iframe
                  title='注文請書'
                  id='printOrderRequest'
                  srcDoc={order_request_html}
                  frameBorder='0'
                  width='100%'
                  height='1080px'
                >
                </iframe>
              </CardBody>
              <CardFooter chart>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.printOrderRequest}
                >
                  &nbsp;&nbsp;&nbsp;印刷&nbsp;&nbsp;&nbsp;
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
			</div>
		);
	}
}

export default withStyles(styles)(PartnerOrder);
