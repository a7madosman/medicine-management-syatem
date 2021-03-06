import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import AuthHandler from "../utils/AuthHandler";

export default class CompanyComponent extends Component {
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
    companyDataList: [],
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCompanyData(
      event.target.name.value,
      event.target.license_no.value,
      event.target.address.value,
      event.target.contact_no.value,
      event.target.email.value,
      event.target.description.value
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });

    this.formRef.current.reset();
  }

  componentDidMount() {
    this.fetchCompanyData();
  }

  async fetchCompanyData() {
    var apihandler = new APIHandler();
    var companydata = await apihandler.fetchAllCompany();
    // console.log(companydata);
    this.setState({ companyDataList: companydata.data.data });
    this.setState({ dataLoaded: true });
  }

  viewCompanyDetails = (company_id) => {
    // console.log(company_id);
    // console.log(this.props);
    this.props.history.push("/companydetails/" + company_id);
  };

  render() {
    window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Add Company</h2>
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
                    <strong>Add New Company</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="name">Company Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Enter Company Name"
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
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Add Company"
                        : "Adding Company Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>New Company</strong> {this.state.errorMessage}
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
                    <strong>All Companies</strong>
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>License No.</th>
                        <th>Address</th>
                        <th>Contact No.</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th>Added_on</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.companyDataList.map((company) => (
                        <tr key={company.id}>
                          <th scope="row">{company.id}</th>
                          <td>{company.name}</td>
                          <td>{company.license_no}</td>
                          <td>{company.address}</td>
                          <td>{company.contact_no}</td>
                          <td>{company.email}</td>
                          <td>{company.description}</td>
                          <td>{new Date(company.added_on).toLocaleString()}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() =>
                                this.viewCompanyDetails(company.id)
                              }
                            >
                              View
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
