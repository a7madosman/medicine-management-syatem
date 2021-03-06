import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import { Link } from "react-router-dom";
// import AuthHandler from "../utils/AuthHandler";

export default class CompanyAddBankCompnent extends Component {
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
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyBankData(
      event.target.bank_account_no.value,
      event.target.ifsc_no.value,
      this.props.match.params.id
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });

    this.formRef.current.reset();
  }

  viewCompanyDetails = (company_id) => {
    this.props.history.push("/companydetails/" + company_id);
  };

  render() {
    window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Add Bank</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>
                      Add New Company Bank [ {this.props.match.params.id} ]
                    </strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="name">Account No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="bank_account_no"
                          name="bank_account_no"
                          className="form-control"
                          placeholder="Company Account Number"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="license_no">License No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="ifsc_no"
                          name="ifsc_no"
                          className="form-control"
                          placeholder="Enter IFSC Code."
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
                        ? "Add Company Bank"
                        : "Adding Company Bank Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Add Company Bank</strong>{" "}
                        {this.state.errorMessage}
                        <br />
                        <br />
                        <Link
                          to={"/companydetails/" + this.props.match.params.id}
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
