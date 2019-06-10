import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import SendIcon from '@material-ui/icons/Send'
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardAvatar from "../components/Card/CardAvatar";
import CardHeader from '../components/Card/CardHeader';
import CardBody from "../components/Card/CardBody.jsx";
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import SimpleTable from '../components/Table/SimpleTable';
import EnhancedTable from '../containers/EnhancedTable';
import DataProvider from '../components/Table/DataProvider';
import FormDialog from '../containers/FormDialog';
import MailForm from '../components/Form/MailForm';
import {
  list_monthly_status,
  list_members_order_status,
  list_lump_contract_schema,
  edit_lump_contract_schema,
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

    this.createLumpOrder = this.createLumpOrder.bind(this);
    this.onOrderCreated = this.onOrderCreated.bind(this);
    this.sendOrders = this.sendOrders.bind(this);
    this.state = { 
      partner: {},
      monthly_status: [],
      member_order_status: [],
      order_create_url: null,
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
    // 社員の注文状況
    common.fetchGet(common.formatStr(config.api.partner_members_order_status, params.pk)).then(data => {
      this.setState({
        member_order_status: data.results,
      });
    });
  }

  createLumpOrder(data) {
    if (this.showOrderConfirm) {
      if (!data.publish_date) {
        data['publish_date'] = common.formatDate(new Date(), 'YYYY-MM-DD');
      }
      const { params } = this.props.match;
      this.setState({
        order_create_url: common.formatStr(config.api.partner_lump_order_create, params.pk, data.id),
      });
      this.showOrderConfirm(data);
    }
  }

  onOrderCreated(row) {
    if (this.handleRowUpdated) {
      this.handleRowUpdated(row);
    }
  }

  sendOrders(data) {
    if (this.showSendMailConfirm) {
      common.fetchGet(
        common.formatStr(config.api.mail_partner_lump_order_preview, data.order_id),
      ).then(mail_data => {
        this.showSendMailConfirm(mail_data);
      });
    }
  }

  render () {
    const { params } = this.props.match;
    const { classes } = this.props;
    const { partner, monthly_status, member_order_status, order_create_url } = this.state;
    const avatar = defaultAvatar;
    // 一括契約設定
    const formLumpContractProps = {
      schema: edit_lump_contract_schema,
      layout: [],
      title: '一括契約設定',
      data: {
        company: params.pk,
        company_name: partner.name,
      },
      add_url: config.api.partner_lump_contract_list,
      edit_url: config.api.partner_lump_contract_detail,
    }

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
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>社員の注文状況</h4>
                    <p className={classes.cardCategoryWhite}>
                      社員の今月と来月の注文書は送信済みなのかどうか
                    </p>
                  </CardHeader>
                  <CardBody>
                    <SimpleTable
                      tableHeaderColor="warning"
                      tableHead={list_members_order_status}
                      tableData={member_order_status}
                    />
                  </CardBody>
                </Card>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={12}>
              </GridItem> */}
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
        <DataProvider
          endpoint={ common.formatStr(config.api.partner_lump_contract_list, params.pk) }
          render={ (initData) => (
            <EnhancedTable
              tableTitle='一括契約一覧'
              { ...initData }
              columns={list_lump_contract_schema}
              isClientSide={true}
              selectable='single'
              formComponentProps={formLumpContractProps}
              deleteUrl={config.api.partner_lump_contract_detail}
              actions={[
                {
                  'tooltip': '注文書と注文請書を作成',
                  'icon': <NoteAddIcon/>,
                  'handleClick': this.createLumpOrder,
                },
                {
                  'icon': <SendIcon />,
                  'tooltip': '注文書と注文請書を送信',
                  'handleClick': this.sendOrders,
                },
              ]}
              innerRef={(datatable) => { this.handleRowUpdated = datatable && datatable.handleRowUpdated }}
            />
          ) } 
        />
        <FormDialog
          innerRef={(dialog) => { this.showOrderConfirm = dialog && dialog.handleOpen }}
          title={'注文書と注文請書を作成'}
          schema={[
            {
              "name": "publish_date",
              "type": "date",
              "label": "発行年月日",
              "required": true,
            },
          ]}
          add_url={order_create_url}
          onRowAdded={this.onOrderCreated}
        />
        <MailForm
          ref={(dialog) => {
            this.showSendMailConfirm = dialog && dialog.handleOpen;
          }}
          title={'注文書を送信'}
          onRowAdded={this.onOrderCreated}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PartnerPreview);
