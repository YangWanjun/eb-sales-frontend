import React from 'react';
import { Link } from 'react-router-dom'
import { SimpleTable } from 'mui-enhanced-datatable';
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Typography,
  Button,
} from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from "../../components/Card/Card";
import CardAvatar from "../../components/Card/CardAvatar";
import CardHeader from '../../components/Card/CardHeader';
import CardBody from "../../components/Card/CardBody.jsx";
import CustomBreadcrumbs from '../../components/customBreadcrumbs';
import {
  list_project_schema,
  list_organization_schema,
  list_salesperson_schema,
} from '../../layout/member';
import { config } from '../../utils/config';
import { common } from '../../utils/common';

import defaultAvatar from "../../assets/img/avatar.png";

const styles = {
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
  cardAvatar: {
    maxHeight: 110,
    maxWidth: 110,
    verticalAlign: 'middle'
  },
};

class _MemberPreview extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { 
      member: {},
      projects: [],
      organizations: [],
      salesperson: [],
    };
　}

componentWillMount() {
  this._isMounted = true;
  const { params } = this.props.match;
    const url_member_detail = common.formatStr(config.api.member.history, params.member_id) + '?schema=1';
    common.fetchGet(url_member_detail).then(data => {
      if (this._isMounted) {
        this.setState({
          member: data.member,
          projects: data.projects,
          organizations: data.organizations,
          salesperson: data.salesperson,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render () {
    const { params } = this.props.match;
    const { classes } = this.props;
    const { member, projects, organizations, salesperson } = this.state;
    const avatar = member.avatar_url || defaultAvatar;

    return (
      <div>
        <CustomBreadcrumbs>
          <Link to="/member/">メンバー管理</Link>
          <Link to="/member/members/" >作業メンバー一覧</Link>
          <Typography color="textPrimary">{ member.full_name }</Typography>
        </CustomBreadcrumbs>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="success">
                    <h4 className={classes.cardTitleWhite}>プロジェクト履歴</h4>
                    <p className={classes.cardCategoryWhite}>
                      E-Businessで入社してから現在至るまで経験した案件
                    </p>
                  </CardHeader>
                  <CardBody>
                    <SimpleTable
                      tableHeaderColor="warning"
                      tableHead={list_project_schema}
                      tableData={projects}
                    />
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>所属部署</h4>
                    <p className={classes.cardCategoryWhite}>
                      社員部署の配属履歴
                    </p>
                  </CardHeader>
                  <CardBody>
                    <SimpleTable
                      tableHeaderColor="warning"
                      tableHead={list_organization_schema}
                      tableData={organizations}
                    />
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>営業担当</h4>
                    <p className={classes.cardCategoryWhite}>
                      社員の営業担当履歴
                    </p>
                  </CardHeader>
                  <CardBody>
                    <SimpleTable
                      tableHeaderColor="warning"
                      tableHead={list_salesperson_schema}
                      tableData={salesperson}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile className={classes.cardProfile}>
              <CardAvatar profile style={{width: 110, height: 110}}>
                <span style={{display: 'inline-block', height: '100%', verticalAlign: 'middle',}}></span>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." className={classes.cardAvatar} />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{member.full_name + ' / ' + member.full_kana}</h6>
                <h4 className={classes.cardTitle}>{member.address1}</h4>
                <p className={classes.description}>
                  {member.japanese_description}<br/>
                  {member.certificate}<br/>
                  {member.skill_description}<br/>
                  {member.comment}
                </p>
                <Link to={'/member/members/' + params.member_id + '/detail'}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    &nbsp;&nbsp;&nbsp;編集&nbsp;&nbsp;&nbsp;
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

const MemberPreview = withStyles(styles)(_MemberPreview);
export {MemberPreview}
