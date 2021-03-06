import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";

export default class CompanyEditBankCompnent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    bank_account_no: "",
    ifsc_no: "",
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      this.props.match.params.company_id,
      this.props.match.params.id
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  viewCompanyDetails = (company_id) => {
    this.props.history.push("/companydetails/" + company_id);
  };

  componentDidMount() {
    this.fetchCompanyBankData();
  }

  async fetchCompanyBankData() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyBankDetails(
      this.props.match.params.id
    );
    // console.log(companydata);
    this.setState({ bank_account_no: companydata.data.data.bank_account_no });
    this.setState({ ifsc_no: companydata.data.data.ifsc_no });
    this.setState({ dataLoaded: true });
  }

  render() {
    window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>DASHBOARD</h2>
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
                    <strong>
                      Edit Company Bank [ {this.props.match.params.id} ]
                    </strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Bank Account No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Bank Account Number"
                          required
                          defaultValue={this.state.bank_account_no}
                        />
                      </div>
                    </div>

                    <label htmlFor="license_no">IFSC No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="ifsc_no"
                          name="ifsc_no"
                          className="form-control"
                          placeholder="Enter IFSC Code."
                          defaultValue={this.state.ifsc_no}
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Edit Company Bank"
                        : "Adding New Company Bank Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Company Bank </strong> {this.state.errorMessage}
                        <br />
                        <br />
                        <Link
                          to={
                            "/companydetails/" +
                            this.props.match.params.company_id
                          }
                          className="btn btn-info"
                          style={{ alignItems: "center" }}
                        >
                          Back to company page
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Faild</strong> No data has been added...
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
        </div>
      </section>
    );
  }
}
