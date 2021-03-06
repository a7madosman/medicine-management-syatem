import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import { Link } from "react-router-dom";
// import AuthHandler from "../utils/AuthHandler";

export default class MedicineAddCompnent extends Component {
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
    companyList: [],
    medicinedetails: [
      {
        salt_name: "",
        salt_qty: "",
        salt_qty_type: "",
        description: "",
      },
    ],
  };

  async formSubmit(event) {
    event.preventDefault();
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    // console.log("sent==>", event);
    var response = await apiHandler.saveMedicineData(
      event.target.name.value,
      event.target.medical_type.value,
      event.target.buy_price.value,
      event.target.sell_price.value,
      event.target.c_gst.value,
      event.target.s_gst.value,
      event.target.batch.value,
      event.target.shelf_no.value,
      event.target.expire_date.value,
      event.target.mfg_date.value,
      event.target.company_id.value,
      event.target.description1.value,
      event.target.in_stock_total.value,
      event.target.qty_in_strip.value,
      this.state.medicinedetails
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

  componentDidMount() {
    this.loadCompany();
  }

  async loadCompany() {
    var apihandler = new APIHandler();
    var comapnydata = await apihandler.fetchCompanyOnly();
    this.setState({ companyList: comapnydata.data });
  }

  RemoveItems = () => {
    if (this.state.medicinedetails.length != 1) {
      this.state.medicinedetails.pop(this.state.medicinedetails - 1);
    }
    this.setState({});
  };

  handleInputs = (event) => {
    var keyname = event.target.name;
    var value = event.target.value;
    var index = event.target.getAttribute("data-index");
    this.state.medicinedetails[index][keyname] = value;
    // console.log(this.state.medicinedetails);
    this.setState({});
  };

  AddItems = () => {
    var items = {
      salt_name: "",
      salt_qty: "",
      salt_qty_type: "",
      description: "",
    };
    this.state.medicinedetails.push(items);
    this.setState({});
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Add Medicine</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>Add Medicine</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="name">Name</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Medicine Name"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="medical_type">Type</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="medical_type"
                          name="medical_type"
                          className="form-control"
                          placeholder="Medicine Type"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="buy_price">Buy Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="buy_price"
                          name="buy_price"
                          className="form-control"
                          placeholder="Buy Price"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="sell_price">Sell Price</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="sell_price"
                          name="sell_price"
                          className="form-control"
                          placeholder="Sell Price"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="c_gst">C_GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="c_gst"
                          name="c_gst"
                          className="form-control"
                          placeholder="C_GST"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="s_gst">S_GST</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="s_gst"
                          name="s_gst"
                          className="form-control"
                          placeholder="S_GST"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="batch">Batch</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="batch"
                          name="batch"
                          className="form-control"
                          placeholder="Batch"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="shelf_no">Shelf No.</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="shelf_no"
                          name="shelf_no"
                          className="form-control"
                          placeholder="Shelf No."
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="expire_date">Expire Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="expire_date"
                          name="expire_date"
                          className="form-control"
                          placeholder="Expire Date"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="mfg_date">MFG Date</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="date"
                          id="mfg_date"
                          name="mfg_date"
                          className="form-control"
                          placeholder="MFG Date"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="company_id">Company</label>
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

                    <label htmlFor="description1">Description</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="description1"
                          name="description1"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="in_stock_total">In Stock (Total)</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="in_stock_total"
                          name="in_stock_total"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="qty_in_strip">Quantity In Strip</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="number"
                          id="qty_in_strip"
                          name="qty_in_strip"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-success"
                          onClick={this.AddItems}
                          type="button"
                        >
                          Add Details
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          className="btn btn-block btn-danger"
                          onClick={this.RemoveItems}
                          type="button"
                        >
                          Remove Details
                        </button>
                      </div>
                    </div>
                    {this.state.medicinedetails.map((item, index) => (
                      <div className="from-group row" key={index}>
                        <div className="col-lg-3">
                          <label htmlFor="salt_name">Salt Name</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_name"
                              name="salt_name"
                              className="form-control"
                              placeholder="Enter Salt Name"
                              // required
                              onChange={this.handleInputs}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="salt_qty">Salt Quantity</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty"
                              name="salt_qty"
                              className="form-control"
                              placeholder="Enter Salt Quantity"
                              // required
                              onChange={this.handleInputs}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="salt_qty_type">
                            Salt Quantity Type
                          </label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="salt_qty_type"
                              name="salt_qty_type"
                              className="form-control"
                              placeholder="Enter Salt Quantity Type"
                              // required
                              onChange={this.handleInputs}
                              data-index={index}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <label htmlFor="description">Description</label>
                          <div className="form-line">
                            <input
                              type="text"
                              id="description"
                              name="description"
                              className="form-control"
                              placeholder="Enter description"
                              // required
                              onChange={this.handleInputs}
                              data-index={index}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Add Medicine"
                        : "Adding Medicine Details Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Success</strong> {this.state.errorMessage}
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
        </div>
      </section>
    );
  }
}
