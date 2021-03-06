import React, { Component } from "react";

import userIcon from "adminbsb-materialdesign/images/user.png";
import Config from "../utils/Config";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  state = {
    defaultClass: "btn-group user-helper-dropdown",
  };

  constructor(props) {
    super(props);
    this.divref = React.createRef();
    this.divref2 = React.createRef();
  }

  // componentWillMount() {
  //   document.addEventListener("mousedown", this.handleMouseClick, false);
  // }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleMouseClick, false);
  }

  // componentWillMount() { // origin should be componentWillUnmount
  //   document.addEventListener("mousedown", this.handleMouseClick, false);
  // }
  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleMouseClick, false);
  }

  handleMouseClick = (e) => {
    if (e.target === this.divref.current || e.target === this.divref2.current) {
      return;
    } else {
      this.setState({ defaultClass: "btn-group user-helper-dropdown"});
    }
  };

  showLogoutMenu = () => {
    if (this.state.defaultClass === "btn-group user-helper-dropdown") {
      this.setState({ defaultClass: "btn-group user-helper-dropdown open" });
    } else {
      this.setState({ defaultClass: "btn-group user-helper-dropdown" });
    }
  };

  render() {
    return (
      <section>
        <aside id="leftsidebar" className="sidebar">
          <div className="user-info">
            <div className="image">
              <img src={userIcon} width="48" height="48" alt="User" />
            </div>
            <div className="info-container">
              <div
                className="name"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                John Doe
              </div>
              <div className="email">john.doe@example.com</div>
              <div className={this.state.defaultClass}>
                <i
                  className="material-icons"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                  onClick={this.showLogoutMenu}
                  ref={this.divref}
                >
                  keyboard_arrow_down
                </i>
                <ul className="dropdown-menu pull-right">
                  <li>
                    <Link to={Config.logoutPageUrl} ref= {this.divref2}> 
                      <i className="material-icons">input</i>Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="menu">
            <ul className="list">
              {Config.sidebarItems.map((item) => (
                <li
                  key={item.index}
                  className={
                    item.index == this.props.activepage ? "active" : ""
                  }
                >
                  <Link to={item.url}>
                    <i className="material-icons">{item.icons}</i>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="legal">
            <div className="copyright">
              &copy; 2016 - 2017 <a href="#">AdminBSB - Material Design</a>.
            </div>
            <div className="version">
              <b>Version: </b> 1.0.5
            </div>
          </div>
        </aside>
      </section>
    );
  }
}
