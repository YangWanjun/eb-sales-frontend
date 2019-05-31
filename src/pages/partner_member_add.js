import React from 'react';
import { Link } from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
} from '@material-ui/core';
import CustomBreadcrumbs from '../components/customBreadcrumbs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Card from "../components/Card/Card";
import CardHeader from '../components/Card/CardHeader';
import CardBody from "../components/Card/CardBody.jsx";
import StepForm from '../containers/StepForm';
import {
  edit_member_schema,
} from '../layout/member';
import {
  edit_partner_member_org_schema,
  edit_partner_member_salesperson_schema,
} from '../layout/partner_member';
import { config } from '../utils/config';
import { common } from '../utils/common';
import { constant } from '../utils/constants';

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

class PartnerMemberAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      partner: {},
      organizations: [],
      salesperson: [],
    };
    this.initialize(props.match.params);
　}

  initialize(params) {
    const url_detail = common.formatStr(config.api.partner_detail, params.pk);
    common.fetchGet(url_detail).then(data => {
      this.setState({
        partner: data,
      });
    });
    // 事業部一覧を初期化する
    common.fetchGet(config.api.organization_list).then(data => {
      let organizations = [];
      data.results.map(row => (
        organizations.push({value: row.id, display_name: row.name, parent: row.parent, disabled: row.is_on_sales !== true})
      ));
      this.setState({organizations});
    });
    // 営業担当一覧を初期化する
    common.fetchGet(config.api.salesperson_list).then(data => {
      let salesperson = [];
      data.results.map(row => (
        salesperson.push({value: row.id, display_name: row.full_name})
      ));
      this.setState({salesperson});
    });
  }

  checkDepartment(data) {
    const {division, department, section} = data;
    if (!division && !department && !section) {
      return [
        {name: 'division', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
        {name: 'department', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
        {name: 'section', message: common.formatStr(constant.ERROR.REQUIRE_FIELD, '所属部署')},
      ];
    } else {
      return true;
    }
  }

  render () {
    const { params } = this.props.match;
    const { classes } = this.props;
    const { partner, organizations, salesperson } = this.state;
    // 所属部署の設定
    let colOrg = common.getColumnByName(edit_partner_member_org_schema, 'organization', 'name');
    colOrg['choices'] = organizations;
    // 営業担当の設定
    let colSalesperson = common.getColumnByName(edit_partner_member_salesperson_schema, 'salesperson', 'name');
    colSalesperson['choices'] = salesperson;
    let steps = [
      {
        'name': '基本情報設定',
        'form': {
          'name': 'member',
          'schema': edit_member_schema,
        }
      },
      {
        'name': '所属設定',
        'form': {
          'name': 'organization_period',
          'schema': edit_partner_member_org_schema,
          'checker': [this.checkDepartment],
        }
      },
      {
        'name': '営業員設定',
        'form': {
          'name': 'salesperson_period',
          'schema': edit_partner_member_salesperson_schema,
        }
      },
      {
        'name': '精算条件設定',
      },
    ];

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/partner" >協力会社一覧</Link>
          <Link to={'/partner/' + params.pk} >{partner.name}</Link>
          <Link to={'/partner/' + params.pk + '/members'} >作業メンバー一覧</Link>
          <Typography color="textPrimary">追加</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={9}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>作業メンバー追加</h4>
                    <p className={classes.cardCategoryWhite}>
                      {partner.name}にメンバーを追加する
                    </p>
                  </CardHeader>
                  <CardBody>
                    <StepForm
                      steps={steps}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(PartnerMemberAdd);
