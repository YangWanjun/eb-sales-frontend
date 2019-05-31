import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardAvatar from "../components/Card/CardAvatar";
import CardHeader from '../components/Card/CardHeader';
import CardBody from "../components/Card/CardBody.jsx";
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import SimpleTable from '../components/Table/SimpleTable';
import {
  list_monthly_status,
} from '../layout/partner';
import { config } from '../utils/config';
import { common } from '../utils/common';

import defaultAvatar from "../assets/img/avatar_company.jpg";

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
  cardProfile: {
    marginTop: 60,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class PartnerPreview extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
      monthly_status: [],
    };
    this.initialize();
　}

  initialize() {
    const { params } = this.props.match;
    const url_detail = common.formatStr(config.api.partner_detail, params.pk);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
    // 月別状況一覧
    common.fetchGet(common.formatStr(config.api.partner_monthly_status, params.pk)).then(data => {
      this.setState({
        monthly_status: data.results,
      });
    });
  }

  render () {
    const { params } = this.props.match;
    const { classes } = this.props;
    const { partner, monthly_status } = this.state;
    const avatar = defaultAvatar;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Typography color="textPrimary">{partner.name}</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>月別状況</h4>
                    <p className={classes.cardCategoryWhite}>
                      毎月の稼働社員数とコストを示します。
                    </p>
                  </CardHeader>
                  <CardBody>
                    <SimpleTable
                      tableHeaderColor="warning"
                      tableHead={list_monthly_status}
                      tableData={monthly_status}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile className={classes.cardProfile}>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{partner.name}</h6>
                <h4 className={classes.cardTitle}>{partner.president}</h4>
                <p className={classes.description}>
                  {partner.address}<br/>
                  {partner.certificate}<br/>
                </p>
                <Link to={'/partner/' + params.pk + '/detail'}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    &nbsp;&nbsp;&nbsp;編集&nbsp;&nbsp;&nbsp;
                  </Button>
                </Link>
                <Link to={'/partner/' + params.pk + '/members'}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    メンバー一覧
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(PartnerPreview);
