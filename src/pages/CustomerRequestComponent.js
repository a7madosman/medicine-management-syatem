import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";

export default class CustomerRequestComponent extends Component {
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
    customerRequestDataList: [],
    dataLoaded: false,
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.saveCustomerRequest(
      event.target.customer_name.value,
      event.target.phone.value,
      event.target.medicine_details.value
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    this.fetchCustomerRequest();

    this.formRef.current.reset();
    // event.target.customer_name.value = ""
    // event.target.phone.value = ""
    // event.target.medicine_details.value = ""
  }

  componentDidMount() {
    this.fetchCustomerRequest();
  }

  async fetchCustomerRequest() {
    var apihandler = new APIHandler();
    var customerRequestData = await apihandler.fetchAllCustomerRequest();
    // console.log(customerRequestData);
    this.setState({ customerRequestDataList: customerRequestData.data.data });
    this.setState({ dataLoaded: true });
  }

  async ComplteteCustomerRequest(customer_id, name, phone, medicine_details) {
    // console.log(customer_id);
    // console.log(this.props);
    var apihandler = new APIHandler();
    var response = await apihandler.updateCustomerRequest(
      customer_id,
      name,
      phone,
      medicine_details
    );
    this.fetchCustomerRequest();
  }

  render() {
    // window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Manage Customer Medicine Details</h2>
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
                    <strong>Add Customer Request</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="customer_name">Customer Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="customer_name"
                          name="customer_name"
                          className="form-control"
                          placeholder="Enter Customer Name"
                        />
                      </div>
                    </div>

                    <label htmlFor="phone">Phone</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-control"
                          placeholder="Enter  Customer Phone."
                        />
                      </div>
                    </div>

                    <label htmlFor="medicine_details">Medicine Details</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medicine_details"
                          name="medicine_details"
                          className="form-control"
                          placeholder="Enter Medicine Details"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Add Medicine Request"
                        : "Adding Medicine Request Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success </strong> {this.state.errorMessage}
                      </div>
                    ) : (
                      ""
                    )}
                    {this.state.errRes == true &&
                    this.state.sendData == true ? (
                      <div className="alert alert-danger">
                        <strong>Faild </strong>
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
                    <strong>All Customer Medicine Requests</strong>
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Medicine Details</th>
                        <th>Status</th>
                        <th>Added_on</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.customerRequestDataList.map((customer) => (
                        <tr key={customer.id}>
                          <th scope="row">{customer.id}</th>
                          <td>{customer.customer_name}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.medicine_details}</td>
                          <td>
                            {customer.status == 0 ? (
                              <span style={{ color: "red" }}>
                                <strong>Pending</strong>
                              </span>
                            ) : (
                              <span style={{ color: "green" }}>
                                <strong>Completed</strong>
                              </span>
                            )}
                          </td>
                          <td>
                            {new Date(customer.added_on).toLocaleString()}
                          </td>
                          <td>
                            {customer.status == 0 ? (
                              <button
                                className="btn btn-block btn-warning"
                                onClick={() =>
                                  this.ComplteteCustomerRequest(
                                    customer.id,
                                    customer.customer_name,
                                    customer.phone,
                                    customer.medicine_details
                                  )
                                }
                              >
                                Completed ?
                              </button>
                            ) : (
                              <button className="btn btn-block btn-success">
                                Completed
                              </button>
                            )}
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
