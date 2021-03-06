import React, { Component } from "react";
import Navbar from "./Navbar";
import OverLay from "./OverLay";
import Sidebar from "./Sidebar";

import "adminbsb-materialdesign/css/themes/all-themes.css";
import GoogleFontLoader from "react-google-font-loader";

export default class MainComponent extends Component {
  state = {
    bodyClass: "theme-red ls-closed",
    displayOverlay: "none",
    width: window.screen.width,
  };

  onBarClick = () => {
    if (this.state.bodyClass === "theme-red ls-closed overlay-open") {
      this.setState({ bodyClass: "theme-red ls-closed" });
      this.setState({ displayOverlay: "none" });
    } else if (this.state.bodyClass === "theme-red ls-closed") {
      this.setState({ bodyClass: "theme-red ls-closed overlay-open" });
      this.setState({ displayOverlay: "block" });
    }
  };

  onscreenresize = () => {
    this.setState({ width: window.screen.width });
  };

  componentDidMount() {
    window.addEventListener("resize", this.onscreenresize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onscreenresize);
  }

  //Text Box Focus On Click
  componentDidMount() {
    var inputall = document.querySelectorAll("input");
    inputall.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentNode.className = "form-line focused";
      });
    });
    inputall.forEach((input) => {
      input.addEventListener("blur", function () {
        this.parentNode.className = "form-line";
      });
    });
  }

  render() {
    if (this.state.width > 1170) {
      document.getElementById("root").className = "theme-red";
    } else {
      document.getElementById("root").className = this.state.bodyClass;
    }

    var Page = this.props.page;

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

        <OverLay display={this.state.displayOverlay} />
        <Navbar onBarClick={this.onBarClick} />
        <Sidebar activepage={this.props.activepage} />
        <Page {...this.props} />
      </React.Fragment>
    );
  }
}
