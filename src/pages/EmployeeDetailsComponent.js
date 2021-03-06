import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import AuthHandler from "../utils/AuthHandler";

export default class EmployeeDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formSubmitSalary = this.formSubmitSalary.bind(this);
    this.formSubmitBank = this.formSubmitBank.bind(this);
    this.formRef = React.createRef();
    // console.log(this.props.match.params.id);
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    errResSalery: 0,
    sendDataSalery: false,
    errorMessageSalery: 0,
    btnMessageSalary: 0,
    btnMessageBank: 0,
    errResBank: 0,
    sendDataBank: false,
    errorMessageBank: 0,
    employeeList: [],
    employeeBankList: [],
    name: "",
    joining_date: "",
    phone: "",
    address: "",
    dataLoaded: false,
    employeeSalaryList: [],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editEmployeeData(
      event.target.name.value,
      event.target.joining_date.value,
      event.target.phone.value,
      event.target.address.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.updateDataAgain();
  }

  componentDidMount() {
    this.fetchEmployeeDataById();
  }

  async fetchEmployeeDataById() {
    this.updateDataAgain();
    // console.log("employee", employee);
  }

  async updateDataAgain() {
    var apihandler = new APIHandler();
    var employee = await apihandler.fetchEmployeeById(
      this.props.match.params.id
    );
    var employeeSalary = await apihandler.fetchSalaryEmployee(
      this.props.match.params.id
    );
    var employeeBank = await apihandler.fetchEmployeeBankData(
      this.props.match.params.id
    );

    this.setState({ name: employee.data.data.name });
    this.setState({ address: employee.data.data.address });
    this.setState({ phone: employee.data.data.phone });
    this.setState({ joining_date: employee.data.data.joining_date });

    this.setState({ employeeSalaryList: employeeSalary.data });
    this.setState({ employeeBankList: employeeBank.data });
    // console.log(employeeBank);
    // this.setState({ employeeList: employee.data.data });
    this.setState({ dataLoaded: true });
  }

  async formSubmitSalary(event) {
    event.preventDefault();
    this.setState({ btnMessageSalary: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.addEmployeeSalaryData(
      event.target.salary_date.value,
      event.target.salary_amount.value,
      this.props.match.params.id
    );
    // console.log(response);
    this.setState({ btnMessageSalary: 0 });
    this.setState({ errResSalery: response.data.error });
    this.setState({ errorMessageSalery: response.data.message });
    this.setState({ sendDataSalery: true });
    event.target.salary_date.value = "";
    event.target.salary_amount.value = "";
    this.updateDataAgain();
  }

  async formSubmitBank(event) {
    event.preventDefault();
    // console.log(event.target.bank_account_no.value);
    // console.log(event.target.ifsc_no.value);
    // console.log(this.props.match.params.id);

    this.setState({ btnMessageBank: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.addEmployeeBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      this.props.match.params.id
    );
    console.log(response);
    this.setState({ btnMessageBank: 0 });
    this.setState({ errResBank: response.data.error });
    this.setState({ errorMessageBank: response.data.message });
    this.setState({ sendDataBank: true });
    this.formRef.current.reset();
    this.updateDataAgain();
  }

  render() {
    // window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>
              Edit Employee - #ID: [ {this.props.match.params.id} ]{" "}
              {this.state.name}
            </h2>
          </div>

          {/* View & Edit Employee Data */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {/* Loader */}
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div className="preloader pl-size-xl">
                        <div className="spinner-layer">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>
                    <strong>Edit Employee</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="name">Name</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                              defaultValue={this.state.name}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="name">Joining Date</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="joining_date"
                              name="joining_date"
                              className="form-control"
                              defaultValue={this.state.joining_date}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="phone">Phone</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="phone"
                              name="phone"
                              className="form-control"
                              defaultValue={this.state.phone}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="address">Address</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter address"
                              defaultValue={this.state.address}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Edit Employee"
                        : "Editing Employee Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success </strong> ... {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Faild </strong> ...
                        {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Add Employee Salary */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>
                      Add Employee{" "}
                      <strong style={{ color: "red" }}>
                        [ {this.state.name} ]
                      </strong>{" "}
                      Salary
                    </strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmitSalary} ref={this.formRef}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="salary_date">Salary Date</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="salary_date"
                              name="salary_date"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="salary_amount">Salary Amount</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="salary_amount"
                              name="salary_amount"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessageSalary == 0 ? false : true}
                    >
                      {this.state.btnMessageSalary == 0
                        ? "Add Salary"
                        : "Saving Salary Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errResSalery == false &&
                    this.state.sendDataSalery == true ? (
                      <div className="alert alert-success">
                        <strong>Success </strong> ...{" "}
                        {this.state.errorMessageSalery}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errResSalery == true &&
                    this.state.sendDataSalery == true ? (
                      <div className="alert alert-danger">
                        <strong>Faild </strong> ...
                        {this.state.errorMessageSalery}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Add Employee Bank */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>
                      Add Employee{" "}
                      <strong style={{ color: "red" }}>
                        [ {this.state.name} ]
                      </strong>{" "}
                      Bank
                    </strong>
                  </h2>
                </div>

                <div className="body">
                  <form onSubmit={this.formSubmitBank} ref={this.formRef}>
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="bank_account_no">Account No.</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="bank_account_no"
                              name="bank_account_no"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="ifsc_no">IFSC No.</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="ifsc_no"
                              name="ifsc_no"
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessageBank == 0 ? false : true}
                    >
                      {this.state.btnMessageBank == 0
                        ? "Add Bank"
                        : "Saving Bank Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errResBank == false &&
                    this.state.sendDataBank == true ? (
                      <div className="alert alert-success">
                        <strong>Success </strong> ...{" "}
                        {this.state.errorMessageBank}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errResBank == true &&
                    this.state.sendDataBnank == true ? (
                      <div className="alert alert-danger">
                        <strong>Faild </strong> ...
                        {this.state.errorMessageBank}
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Vie Employee Salary */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {/* Loader */}
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div className="preloader pl-size-xl">
                        <div className="spinner-layer">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>
                    <strong>Employee Sallary</strong>
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Salary Date</th>
                        <th>Salary Amount</th>
                        <th>Added ON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeSalaryList.map((salary) => (
                        <tr key={salary.id}>
                          <td>{salary.id}</td>
                          <td>{salary.salary_date}</td>
                          <td>{salary.salary_amount}</td>
                          <td>{new Date(salary.added_on).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Vie Employee Bank */}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {/* Loader */}
                  {this.state.dataLoaded === false ? (
                    <div className="text-center">
                      <div className="preloader pl-size-xl">
                        <div className="spinner-layer">
                          <div className="circle-clipper left">
                            <div className="circle"></div>
                          </div>
                          <div className="circle-clipper right">
                            <div className="circle"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <h2>
                    <strong>Employee Banks</strong>
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Bank Account No.</th>
                        <th>IFSC No.</th>
                        <th>Added ON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.employeeBankList.map((bank) => (
                        <tr key={bank.id}>
                          <td>{bank.id}</td>
                          <td>{bank.bank_account_no}</td>
                          <td>{bank.ifsc_no}</td>
                          <td>{new Date(bank.added_on).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
