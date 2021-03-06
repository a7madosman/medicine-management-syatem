import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import AuthHandler from "../utils/AuthHandler";

export default class CompanyAccountComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.formRef = React.createRef();
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyAccount: [],
    companyList: [],
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyTranactionData(
      event.target.company_id.value,
      event.target.transaction_type.value,
      event.target.transaction_amt.value,
      event.target.transaction_date.value,
      event.target.payment_mode.value
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.updateDataAgain();
    this.formRef.current.reset();
  }

  componentDidMount() {
    this.fetchCompanyAccount();
  }

  async fetchCompanyAccount() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyOnly();
    this.updateDataAgain();
    // var companyaccountdata = await apihandler.fetchCompanyAccount();
    // console.log("Accounts", companyaccountdata);
    // console.log("company list", companydata);
    // this.setState({ companyAccount: companyaccountdata.data.data });
    this.setState({ companyList: companydata.data });
    this.setState({ dataLoaded: true });
  }

  async updateDataAgain() {
    var apihandler = new APIHandler();
    var companyaccountdata = await apihandler.fetchCompanyAccount();
    this.setState({ companyAccount: companyaccountdata.data.data });
  }

  render() {
    window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Manage Company Account</h2>
          </div>

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
                    <strong>Add Company Account Bill</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="name">Company Name</label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control"
                              name="company_id"
                              id="company_id"
                            >
                              {this.state.companyList.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label htmlFor="transaction_type">
                          Transaction Type
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <select
                              className="form-control"
                              name="transaction_type"
                              id="transaction_type"
                            >
                              <option value="1">Debit</option>
                              <option value="2">Credit</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label htmlFor="transaction_amt">Amount</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="transaction_amt"
                              name="transaction_amt"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="transaction_date">
                          transaction Date
                        </label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="date"
                              id="transaction_date"
                              name="transaction_date"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label htmlFor="payment_mode">Payment Mode</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="payment_mode"
                              name="payment_mode"
                              className="form-control"
                              placeholder="Enter Description"
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
                        ? "Add Company Transaction"
                        : "Adding Company Tansaction Please Wait..."}
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
                    <strong>All Companies Account Transactions</strong>
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Company Name</th>
                        <th>Company ID</th>
                        <th>Transaction Type</th>
                        <th>Ammount</th>
                        <th>payment Mode</th>
                        <th>payment Date</th>
                        <th>Added ON</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyAccount.map((companyaccount) => (
                        <tr key={companyaccount.id}>
                          <td>{companyaccount.id}</td>
                          <td>{companyaccount.company.name}</td>
                          <td>{companyaccount.company.id}</td>
                          <td>
                            {companyaccount.transaction_type == 1
                              ? "DEBIT"
                              : "CREDIT"}
                          </td>
                          <td>{companyaccount.transaction_amt}</td>
                          <td>{companyaccount.payment_mode}</td>
                          <td>{companyaccount.transaction_date}</td>
                          <td>
                            {new Date(companyaccount.added_on).toLocaleString()}
                          </td>
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
