import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
// import { Link } from "react-router-dom";
// import AuthHandler from "../utils/AuthHandler";

export default class MedicineManageCompnent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    companyList: [],
    medicinedetails: [],
    medicineDataList: [],
    dataLoaded: false,
    name: "",
    medical_type: "",
    buy_price: "",
    sell_price: "",
    c_gst: "",
    s_gst: "",
    batch: "",
    shelf_no: "",
    expire_date: "",
    mfg_date: "",
    company_id: "",
    description1: "",
    in_stock_total: "",
    qty_in_strip: "",
    total_salt_list: 0,
    medicine_id: 0,
  };

  async formSubmit(event) {
    event.preventDefault();
    // console.log(this.state.medicinedetails);
    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    // console.log("sent==>", event);
    var response = await apiHandler.editMedicineData(
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
      this.state.medicinedetails,
      this.state.medicine_id
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
    this.loadInitialData();
  }

  async loadInitialData() {
    var apihandler = new APIHandler();
    var comapnydata = await apihandler.fetchCompanyOnly();
    var medicinedetails = await apihandler.fetchAllMedicine();
    this.setState({ companyList: comapnydata.data });
    // console.log("Medicine Details ..>", medicinedetails.data.data);
    this.setState({ medicineDataList: medicinedetails.data.data });
    this.setState({ dataLoaded: true });
  }

  RemoveItems = () => {
    if (this.state.medicinedetails.length != this.state.total_salt_list) {
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
      id: 0,
    };
    this.state.medicinedetails.push(items);
    this.setState({});
  };

  viewMedicineDetails = (index) => {
    // console.log(this.state.medicineDataList[index]);
    this.setState({ medicine_id: this.state.medicineDataList[index].id });
    this.setState({ name: this.state.medicineDataList[index].name });
    this.setState({
      medical_type: this.state.medicineDataList[index].medical_type,
    });
    this.setState({ buy_price: this.state.medicineDataList[index].buy_price });
    this.setState({
      sell_price: this.state.medicineDataList[index].sell_price,
    });
    this.setState({ c_gst: this.state.medicineDataList[index].c_gst });
    this.setState({ s_gst: this.state.medicineDataList[index].s_gst });
    this.setState({ batch: this.state.medicineDataList[index].batch });
    this.setState({ shelf_no: this.state.medicineDataList[index].shelf_no });
    this.setState({
      expire_date: this.state.medicineDataList[index].expire_date,
    });
    this.setState({ mfg_date: this.state.medicineDataList[index].mfg_date });
    this.setState({
      company_id: this.state.medicineDataList[index].company_id,
    });
    this.setState({
      description1: this.state.medicineDataList[index].description,
    });
    this.setState({
      in_stock_total: this.state.medicineDataList[index].in_stock_total,
    });
    this.setState({
      qty_in_strip: this.state.medicineDataList[index].qty_in_strip,
    });
    this.setState({
      total_salt_list: this.state.medicineDataList[index].medicine_detail
        .length,
    });

    this.setState({
      medicinedetails: this.state.medicineDataList[index].medicine_detail,
    });
  };

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Manage Medicine</h2>
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
                    <strong>All Medicines</strong>
                  </h2>
                </div>

                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Medical Type</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>Batvh No.</th>
                        <th>Expire Date</th>
                        <th>MFG Date</th>
                        <th>In Stock</th>
                        <th>Company</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.medicineDataList.map((medicine, index) => (
                        <tr key={medicine.id}>
                          <th scope="row">{medicine.id}</th>
                          <td>{medicine.name}</td>
                          <td>{medicine.medical_type}</td>
                          <td>{medicine.buy_price}</td>
                          <td>{medicine.sell_price}</td>
                          <td>{medicine.batch}</td>
                          <td>{medicine.shelf_no}</td>
                          <td>{medicine.mfg_date}</td>
                          <td>{medicine.in_stock_total}</td>
                          <td>{medicine.company.name}</td>
                          <td>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.viewMedicineDetails(index)}
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

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>Manage Medicine</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
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
                          defaultValue={this.state.name}
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
                          defaultValue={this.state.medical_type}
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
                          defaultValue={this.state.buy_price}
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
                          defaultValue={this.state.sell_price}
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
                          defaultValue={this.state.c_gst}
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
                          defaultValue={this.state.s_gst}
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
                          defaultValue={this.state.batch}
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
                          defaultValue={this.state.shelf_no}
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
                          defaultValue={this.state.expire_date}
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
                          defaultValue={this.state.mfg_date}
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
                            <option
                              value={item.id}
                              key={item.id}
                              selected={
                                item.id == this.state.company_id ? true : false
                              }
                            >
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
                          defaultValue={this.state.description1}
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
                          defaultValue={this.state.in_stock_total}
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
                          defaultValue={this.state.qty_in_strip}
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
                              onChange={this.handleInputs}
                              data-index={index}
                              value={item.salt_name}
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
                              onChange={this.handleInputs}
                              data-index={index}
                              value={item.salt_qty}
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
                              onChange={this.handleInputs}
                              data-index={index}
                              value={item.salt_qty_type}
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
                              onChange={this.handleInputs}
                              data-index={index}
                              value={item.description}
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
                        ? "Save Medicine Changes"
                        : "Updating Medicine Details Please Wait..."}
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
