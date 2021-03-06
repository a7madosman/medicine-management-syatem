import React, { Component } from "react";
import GoogleFontLoader from "react-google-font-loader";
import { Redirect } from "react-router-dom";

import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
import AuthHandler from "../utils/AuthHandler";
import Config from "../utils/Config";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,
  };

  saveInput = (Event) => {
    var key = Event.target.name;
    this.setState({ [key]: Event.target.value });
    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  formSubmit = (Event) => {
    Event.preventDefault();
    this.setState({ loginStatus: 1 });
    AuthHandler.login(
      this.state.username,
      this.state.password,
      this.handleAjaxResponse
    );
  };

  handleAjaxResponse = (data) => {
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = Config.homeUrl;
    }
  };

  getMessages = () => {
    if (this.state.loginStatus === 0) {
      return "";
    } else if (this.state.loginStatus === 1) {
      return (
        <div className="alert alert-warning" style={{ textAlign: "center" }}>
          <strong>Check Info</strong> Please wait ...
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      return (
        <div className="alert alert-success" style={{ textAlign: "center" }}>
          <strong>Logged In Successfully</strong>
        </div>
      );
    } else if (this.state.loginStatus === 4) {
      return (
        <div className="alert alert-danger" style={{ textAlign: "center" }}>
          <strong>Invalid Login Details</strong>
        </div>
      );
    }
  };

  render() {
    if (AuthHandler.loggedIn()) {
      return <Redirect to={Config.homeUrl} />;
    }

    document.body.className = "login-page";

    return (
      <React.Fragment>
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400, "700"],
            },
            {
              font: "Roboto Mono",
              weights: [400, 700],
            },
          ]}
          subsets={["latin", "cyrillic-ext"]}
          fonts={[
            {
              font: "Roboto",
              weights: [400, "700"],
            },
            {
              font: "Material+Icons",
            },
          ]}
        />

        <div className="login-box">
          <div className="logo">
            <a href="#">
              Admin<b>BSB</b>
            </a>
            <small>Admin BootStrap Based - Material Design</small>
          </div>
          <div className="card">
            <div className="body">
              <form id="sign_in" method="POST" onSubmit={this.formSubmit}>
                <div className="msg">Sign in to start your session</div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">person</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      required
                      autoFocus
                      onChange={this.saveInput}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required
                      onChange={this.saveInput}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-8 p-t-5">
                    <input
                      type="checkbox"
                      name="rememberme"
                      id="rememberme"
                      className="filled-in chk-col-pink"
                    />
                    <label htmlFor="rememberme">Remember Me</label>
                  </div>
                  <div className="col-xs-4">
                    <button
                      className="btn btn-block bg-pink waves-effect"
                      type="submit"
                      disabled={this.state.btnDisabled}
                    >
                      SIGN IN
                    </button>
                  </div>
                </div>
                <div className="row m-t-15 m-b--20">
                  <div className="col-xs-6">
                    <a href="sign-up.html">Register Now!</a>
                  </div>
                  <div className="col-xs-6 align-right">
                    <a href="forgot-password.html">Forgot Password?</a>
                  </div>
                </div>
                {this.getMessages()}
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
