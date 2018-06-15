import React from "react";
import { Link } from "react-router";
import {
  Row,
  Col,
  Panel,
  Button,
  Form,
  FormGroup,
  FormControl,
  Checkbox
} from "components";
import { RoutedComponent, connect } from "routes/routedComponent";
import { CONTENT_VIEW_FLUID } from "layouts/DefaultLayout/modules/layout";
import { LS } from "../../../shared/language/localized-strings";
import classes from "./../FPages.scss";
import classesLogin from "./FLogin.scss";
import images from "../../../static/images/images";

class FLoginContainer extends RoutedComponent {
  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: false,
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    };
  }

  render() {
    return (
      <Row>
        <Col lg={12}>
          <Button
            className="m-t-2 m-b-1"
            onClick={() => this.props.history.goBack()}
          >
            <i className="fa fa-angle-left m-r-1" />
            {LS.t.common.back}
          </Button>

          <Row>
            <Col className={classes.centerCol} md={4}>
              <Panel
                header={
                  <div className={classesLogin.header}>
                    <img
                      className={classesLogin.logo}
                      src={images.logo}
                      alt={LS.t.login.alt.noLogo}
                    />
                    <text>{LS.t.projectName}</text>
                  </div>
                }
                footer={
                  <div>
                    <Link to="/fpages/find-password">
                      {LS.t.login.link.forgetPassword}
                    </Link>
                    <Link to="/fpages/register" className="pull-right">
                      {LS.t.login.link.createAccount}
                    </Link>
                  </div>
                }
              >
                <h2 className={classes.panelHeader}>{LS.t.common.login}</h2>
                <p className="text-center m-b-3">
                  {LS.t.login.tip.introduction}
                </p>

                <Form onSubmit={e => e.preventDefault()}>
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder={LS.t.login.placeholder.userName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControl
                      type="password"
                      placeholder={LS.t.login.placeholder.password}
                    />
                  </FormGroup>
                  <Checkbox>{LS.t.login.label.rememberPassword}</Checkbox>

                  <Button block bsStyle="primary" className="m-b-2">
                    {LS.t.common.login}
                  </Button>
                </Form>
              </Panel>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect()(FLoginContainer);
