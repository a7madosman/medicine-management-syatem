import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import AuthHandler from "../utils/AuthHandler";

export default class CompanyDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    // console.log("==>", props.match.params.id);
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyBank: [],
    name: "",
    license_no: "",
    address: "",
    contact_no: "",
    email: "",
    description: "",
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.editCompanyData(
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value,
      this.props.match.params.id
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
  }

  componentDidMount() {
    this.fetchCompanyData();
  }

  async fetchCompanyData() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchCompanyDetails(
      this.props.match.params.id
    );
    // console.log("Company Details ==>", companydata);
    this.setState({ companyBank: companydata.data.data.company_bank });
    this.setState({ name: companydata.data.data.name });
    this.setState({ license_no: companydata.data.data.license_no });
    this.setState({ address: companydata.data.data.address });
    this.setState({ contact_no: companydata.data.data.contact_no });
    this.setState({ email: companydata.data.data.email });
    this.setState({ description: companydata.data.data.description });
    this.setState({ dataLoaded: true });
  }

  AddCompanyBank = () => {
    this.props.history.push("/addcompanybank/" + this.props.match.params.id);
  };

  EditCompanyBank = (company_bank_id) => {
    // console.log(company_bank_id);
    this.props.history.push(
      "/editcompanybank/" + this.props.match.params.id + "/" + company_bank_id
    );
  };

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
                      Edit{" "}
                      <span style={{ color: "red" }}>{this.state.name}</span>{" "}
                      Details
                    </strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <label htmlFor="name">Company Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Company Name"
                          defaultValue={this.state.name}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="license_no">License No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="license_no"
                          name="license_no"
                          className="form-control"
                          placeholder="Enter License No."
                          defaultValue={this.state.license_no}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="address">Address</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-control"
                          placeholder="Enter Company Address"
                          defaultValue={this.state.address}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="contact_no">Contact No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="contact_no"
                          name="contact_no"
                          className="form-control"
                          placeholder="Enter Company contact No."
                          defaultValue={this.state.contact_no}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="email">Email</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter Company Email"
                          defaultValue={this.state.email}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="description">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Enter Description"
                          defaultValue={this.state.description}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Save Changes"
                        : "Saving Company Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>
                          <span style={{ color: "red" }}>
                            {this.state.name}
                          </span>
                        </strong>{" "}
                        Company Details... {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger" timeout="1000">
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
                      <span style={{ color: "red" }}>{this.state.name}</span>{" "}
                      Company Releated Bank(s)
                    </strong>
                  </h2>
                  <div className=" header-dropdown m-r--5">
                    <button
                      onClick={this.AddCompanyBank}
                      className="btn btn-info"
                    >
                      Add Company Bank
                    </button>
                  </div>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Bank ID</th>
                        <th>Company ID</th>
                        <th>Name</th>
                        <th>License No.</th>
                        <th>Added_on</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyBank.map((company) => (
                        <tr key={company.id}>
                          <th scope="row">{company.id}</th>
                          <th scope="row">{company.company_id}</th>
                          <td>{company.bank_account_no}</td>
                          <td>{company.ifsc_no}</td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-warning" style={{marginRight:'1.5rem'}}
                              onClick={() => this.EditCompanyBank(company.id)}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger">
                              Delete
                            </button>
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
