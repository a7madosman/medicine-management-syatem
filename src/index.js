import reactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import { PrivateRouteNew } from "./utils/PrivateRouteNew";
import HomeComponent from "./pages/HomeComponent";
import CompanyComponent from "./pages/CompanyComponent";
import CompanyDetailsCompmnent from "./pages/CompanyDetailsComponent";
import Config from "./utils/Config";
import LogoutComponent from "./pages/LogoutComponent";
import CompanyAddBankCompnent from "./pages/CompanyAddBankCompnent";
import CompanyEditBankCompnent from "./pages/CompanyEditBankCompnent";
import MedicineAddCompnent from "./pages/MedicineAddComponent";
import MedicineManageComponent from "./pages/MedicineManageComponent";
import CompanyAccountComponent from "./pages/CompanyAccountComponent";
import EmployeeComponent from "./pages/EmployeeComponent";
import EmployeeDetailsComponent from "./pages/EmployeeDetailsComponent";
import BillGenerateCompnent from "./pages/BillGenerateCompnent";
import CustomerRequestComponent from "./pages/CustomerRequestComponent";

reactDom.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route
        exact
        path={Config.logoutPageUrl}
        component={LogoutComponent}
      ></Route>

      <PrivateRouteNew
        exact
        path="/home"
        activepage="0"
        page={HomeComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/company"
        activepage="1"
        page={CompanyComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/companydetails/:id"
        activepage="1"
        page={CompanyDetailsCompmnent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/addcompanybank/:id"
        activepage="1"
        page={CompanyAddBankCompnent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/editcompanybank/:company_id/:id"
        activepage="1"
        page={CompanyEditBankCompnent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/addMedicine"
        activepage="2"
        page={MedicineAddCompnent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/manageMedicine"
        activepage="3"
        page={MedicineManageComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/managecompanyaccount"
        activepage="4"
        page={CompanyAccountComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/employeeManage"
        activepage="5"
        page={EmployeeComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/employeedetails/:id"
        activepage="5"
        page={EmployeeDetailsComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/employeeManage"
        activepage="5"
        page={EmployeeComponent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/generateBill"
        activepage="6"
        page={BillGenerateCompnent}
      ></PrivateRouteNew>

      <PrivateRouteNew
        exact
        path="/customerRequest"
        activepage="7"
        page={CustomerRequestComponent}
      ></PrivateRouteNew>
    </Switch>
  </Router>,
  document.getElementById("root")
);
