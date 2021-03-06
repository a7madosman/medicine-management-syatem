import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="#" className="bars" onClick={this.props.onBarClick}></a>
            <a className="navbar-brand" href="index.html">
              ADMINBSB - MATERIAL DESIGN
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
