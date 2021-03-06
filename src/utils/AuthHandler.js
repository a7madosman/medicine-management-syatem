import axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

export default class AuthHandler {
  static login(username, password, callback) {
    axios
      .post(Config.loginUrl, {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
          callback({ error: false, message: "Loged In Successfully ...." });
        }
      })
      .catch(function (error) {
        console.log(error.response);
        callback({
          error: true,
          message: "Error in loged in provided details ....",
        });
      });
  }
  static loggedIn() {
    if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
      return true;
    } else {
      return false;
    }
  }
  static getLoginToken() {
    return reactLocalStorage.get("token");
  }
  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }
  static logOutUser() {
    reactLocalStorage.remove("token");
  }

  static checkTokenExpiry() {
    var expire = false;
    var token = this.getLoginToken();
    var tokenArray = token.split(".");
    var jwt = JSON.parse(atob(tokenArray[1]));
    if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
      expire = jwt.exp * 1000;
    } else {
      expire = false;
    }

    if (!expire) {
      return false;
    }

    return Date.now() > expire;
  }
}
