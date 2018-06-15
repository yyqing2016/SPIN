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
  InputGroup,
  Alert
} from "components";
import { RoutedComponent, connect } from "routes/routedComponent";
import { CONTENT_VIEW_FLUID } from "layouts/DefaultLayout/modules/layout";
import { LS } from "../../../shared/language/localized-strings";
import classes from "./../FPages.scss";
import classesFindPassword from "./FFindPassword.scss";
import images from "../../../static/images/images";
import { Modal } from "../../../components";

class FFindPasswordContainer extends RoutedComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      showModule: "showFindPassword",
      userName: "",
      vcode: "",
      phoneVCode: "",
      password: "",
      confirm: ""
    };
  }

  getLayoutOptions() {
    return {
      contentView: CONTENT_VIEW_FLUID,
      sidebarEnabled: false,
      navbarEnabled: false,
      footerEnabled: false,
      headerEnabled: false
    };
  }

  componentDidMount() {
    this.drawVCode();
  }

  showModal() {
    return (
      <Modal
        bsSize="large"
        show={this.state.showModal}
        onHide={() => this.setState({ showModal: false })}
        className={classesFindPassword.modal}
      >
        <Modal.Body>
          <Alert bsStyle="success">
            <span className="fa-stack fa-lg m-r-1">
              <i className="fa fa-circle-thin fa-stack-2x text-success" />
              <i className="fa fa-check fa-stack-1x text-success" />
            </span>
            <strong>{LS.t.findPassword.toast.comfirmPasswordTitle}</strong>
            {LS.t.findPassword.toast.comfirmPasswordTip}
          </Alert>
        </Modal.Body>
      </Modal>
    );
  }

  drawVCode() {
    /*生成4位随机数*/
    function rand() {
      var str = "abcdefghijklmnopqrstuvwxyz0123456789";
      var arr = str.split("");
      var validate = "";
      var ranNum;
      for (var i = 0; i < 4; i++) {
        ranNum = Math.floor(Math.random() * 36); //随机数在[0,35]之间
        validate += arr[ranNum];
      }
      return validate;
    }

    /*干扰线的随机x坐标值*/
    function lineX() {
      var ranLineX = Math.floor(Math.random() * 90);
      return ranLineX;
    }

    /*干扰线的随机y坐标值*/
    function lineY() {
      var ranLineY = Math.floor(Math.random() * 40);
      return ranLineY;
    }

    function clickChange() {
      var mycanvas = document.getElementById("mycanvas");
      var cxt = mycanvas.getContext("2d");
      cxt.fillStyle = "#2c97de";
      cxt.fillRect(0, 0, 90, 32);

      /*生成干扰线20条*/
      for (var j = 0; j < 20; j++) {
        cxt.strokeStyle = "#fff";
        cxt.beginPath(); //若省略beginPath，则每点击一次验证码会累积干扰线的条数
        cxt.moveTo(lineX(), lineY());
        cxt.lineTo(lineX(), lineY());
        cxt.lineWidth = 0.5;
        cxt.closePath();
        cxt.stroke();
      }

      cxt.fillStyle = "white";
      cxt.font = "bold 20px Arial";
      cxt.fillText(rand(), 25, 25); //把rand()生成的随机数文本填充到canvas中
    }

    clickChange();

    /*点击验证码更换*/
    mycanvas.onclick = function(e) {
      e.preventDefault();
      clickChange();
    };
  }

  doFindPassword() {
    console.log(this.state);
    this.setState({ showModule: "showSetNewPassword" });
  }

  doSetNewPassword() {
    console.log("asdf");
    this.setState({ showModal: true }, () =>
      setTimeout(() => this.setState({ showModal: false }), 1500)
    );
  }

  setItemValue(e, item) {
    this.setState({ [item]: e.target.value });
  }

  showFindPasswordFrom() {
    return (
      <Form onSubmit={e => e.preventDefault()}>
        <FormGroup>
          <FormControl
            type="text"
            placeholder={LS.t.findPassword.placeholder.userName}
            onChange={e => this.setItemValue(e, "userName")}
          />
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder={LS.t.findPassword.placeholder.vcode}
              onChange={e => this.setItemValue(e, "vcode")}
            />
            <InputGroup.Addon className={classesFindPassword.canvasWrap}>
              <canvas
                id="mycanvas"
                className={classesFindPassword.canvas}
                width="90"
                height="31"
              >
                您的浏览器不支持canvas，请换个浏览器试试~
              </canvas>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder={LS.t.findPassword.placeholder.phoneVCode}
              onChange={e => this.setItemValue(e, "phoneVCode")}
            />
            <InputGroup.Addon>
              {LS.t.findPassword.buttonText.getVCode}
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        <Button
          block
          bsStyle="primary"
          className="m-b-2"
          onClick={() => this.doFindPassword()}
        >
          {LS.t.common.confirm}
        </Button>
      </Form>
    );
  }

  showSetNewPasswordFrom() {
    return (
      <Form onSubmit={e => e.preventDefault()}>
        <FormGroup>
          <FormControl
            type="password"
            placeholder={LS.t.findPassword.placeholder.password}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            placeholder={LS.t.findPassword.placeholder.confirm}
          />
        </FormGroup>
        <Button
          block
          bsStyle="primary"
          className="m-b-2"
          onClick={() => this.doSetNewPassword()}
        >
          {LS.t.common.login}
        </Button>
      </Form>
    );
  }

  render() {
    return (
      <div>
        {this.showModal()}
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
                    <div className={classesFindPassword.header}>
                      <img
                        className={classesFindPassword.logo}
                        src={images.logo}
                        alt={LS.t.findPassword.alt.noLogo}
                      />
                      <text>{LS.t.projectName}</text>
                    </div>
                  }
                  footer={
                    <div className={classesFindPassword.login}>
                      <Link to="/fpages/login" className="pull-right">
                        {LS.t.findPassword.link.login}
                      </Link>
                    </div>
                  }
                >
                  <h2 className={classes.panelHeader}>
                    {LS.t.common.findPassword}
                  </h2>
                  <p className="text-center m-b-3">
                    {LS.t.findPassword.tip.introduction}
                  </p>
                  {this.state &&
                    this.state.showModule === "showFindPassword" &&
                    this.showFindPasswordFrom()}
                  {this.state &&
                    this.state.showModule === "showSetNewPassword" &&
                    this.showSetNewPasswordFrom()}
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(FFindPasswordContainer);
