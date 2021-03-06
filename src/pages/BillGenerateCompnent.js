import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";
import AutoCompleteMedicine from "../components/AutoCompleteMedicine";

export default class BillGenerateCompnent extends Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    // To Reset Inputs
    // this.formRef = React.createRef();
  }

  state = {
    errRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    medicineDetails: [
      {
        medicine_name: "",
        id: 0,
        sr_no: 1,
        qty: "",
        qty_type: "",
        unit_price: "",
        c_gst: "",
        s_gst: "",
        amount: "",
      },
    ],
    currentSrno: 1,
  };

  async formSubmit(event) {
    event.preventDefault();
    // console.log(this.state.medicineDetails);
    // console.log(event.target.customer_name.value);
    // console.log(event.target.address.value);
    // console.log(event.target.contact.value);
    var customer_name = event.target.customer_name.value;
    var address = event.target.address.value;
    var phone = event.target.contact.value;

    this.setState({ btnMessage: 1 });
    var apiHandler = new APIHandler();
    var response = await apiHandler.generateBill(
      event.target.customer_name.value,
      event.target.address.value,
      event.target.contact.value,
      this.state.medicineDetails
    );
    // console.log(response);
    this.setState({ btnMessage: 0 });
    this.setState({ errRes: response.data.error });
    this.setState({ errorMessage: response.data.message });
    this.setState({ sendData: true });
    // console.log(this.state.medicineDetails);
    this.billGeneratePrint(
      customer_name,
      address,
      phone,
      this.state.medicineDetails
    );
    // To Reset Inputs
    // this.formRef.current.reset();
  }

  billGeneratePrint(customer_name, address, phone, medicineDetails) {
    var billDetails =
      "<style> table{ width:100%;border-collapse:collapse; } td{ padding:5px } th { padding:5px } </style><div>";
    billDetails += "<table border='1'>";
    billDetails += "<tr>";
    billDetails += "<td style='text-align:center' colspan='7'>";
    billDetails += "Bill For Customer";
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<td colspan='2'>";
    billDetails += "Name : " + customer_name;
    billDetails += "</td>";
    billDetails += "<td colspan='3'>";
    billDetails += "Address : " + address;
    billDetails += "</td>";
    billDetails += "<td colspan='2'>";
    billDetails += "Phone : " + phone;
    billDetails += "</td>";
    billDetails += "</tr>";
    billDetails += "<tr>";
    billDetails += "<th>";
    billDetails += "SR NO .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "Name .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "QTY .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "QTY TYPE .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "UNIT PRICE .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "GST .";
    billDetails += "</th>";
    billDetails += "<th>";
    billDetails += "AMOUNT .";
    billDetails += "</th>";
    billDetails += "</tr>";
    var totalamt = 0;

    for (var i = 0; i < medicineDetails.length; i++) {
      billDetails += "<tr>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].sr_no;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].medicine_name;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].qty_type;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].unit_price;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails +=
        "" + medicineDetails[i].c_gst + " " + medicineDetails[i].s_gst;
      billDetails += "</td>";
      billDetails += "<td>";
      billDetails += "" + medicineDetails[i].amount;
      billDetails += "</td>";
      billDetails += "</tr>";

      totalamt += parseInt(medicineDetails[i].amount);
    }

    billDetails += "<tr>";
    billDetails +=
      "<td colspan='6' style='text-align:right;font-weight:bold;background:green;color:white'>";
    billDetails += "Total : " + totalamt;
    billDetails += "<td>";
    billDetails += "</tr>";
    billDetails += "</table>";
    billDetails += "</div>";

    var mywindow = window.open(
      "",
      "Bill Print",
      "height=650&width=900&top=100&left=100"
    );

    mywindow.document.write(billDetails);

    mywindow.print();
  }

  viewCompanyDetails = (company_id) => {
    this.props.history.push("/companydetails/" + company_id);
  };

  AddMedicineDetails = () => {
    this.state.currentSrno = this.state.currentSrno + 1;
    var srno = this.state.currentSrno;
    this.state.medicineDetails.push({
      medicine_name: "",
      sr_no: srno,
      qty: "",
      qty_type: "",
      // unite_price: "",
      c_gst: "",
      s_gst: "",
      amount: "",
    });
    this.setState({});
  };

  RemoveMedicineDetails = () => {
    var srno = this.state.currentSrno - 1;
    if (this.state.medicineDetails.length > 1) {
      this.state.medicineDetails.pop();
    }
    this.setState({});
  };

  showDataInInputs = (index, item) => {
    // console.log(index);
    // console.log(item);
    this.state.medicineDetails[index].id = item.id;
    this.state.medicineDetails[index].qty = 1;
    this.state.medicineDetails[index].qty_type = "Pices";
    this.state.medicineDetails[index].unit_price = item.sell_price;
    this.state.medicineDetails[index].c_gst = item.c_gst;
    this.state.medicineDetails[index].s_gst = item.s_gst;
    this.state.medicineDetails[index].medicine_name = item.name;
    this.state.medicineDetails[index].amount =
      parseInt(item.sell_price) + parseInt(item.c_gst) + parseInt(item.s_gst);
    this.setState({});
  };

  qtyChangeUpdate = (event) => {
    // console.log(event.target.value);
    // console.log(event.target.dataset.index);
    var value = event.target.value;
    var index = event.target.dataset.index;

    // Update the item
    this.state.medicineDetails[index].amount =
      (parseInt(this.state.medicineDetails[index].unit_price) +
        parseInt(this.state.medicineDetails[index].c_gst) +
        parseInt(this.state.medicineDetails[index].s_gst)) *
      value;
    this.state.medicineDetails[index].qty = value;
    this.setState({});
  };

  render() {
    // window.scrollTo(0, 0);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Generate Bills</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    <strong>Generate Bills For Customers</strong>
                  </h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit}>
                    <div className="row">
                      <div className="col-lg-4">
                        <label htmlFor="customer_name">Customer Name</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="customer_name"
                              name="customer_name"
                              className="form-control"
                              placeholder="Enter Customer Name"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <label htmlFor="address">Address</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="address"
                              name="address"
                              className="form-control"
                              placeholder="Enter Customer Address"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="contact">Phone</label>
                        <div className="form-group">
                          <div className="form-line">
                            <input
                              type="text"
                              id="contact"
                              name="contact"
                              className="form-control"
                              placeholder="Enter Customer Phone"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4>Medicine Details</h4>
                    <hr />
                    {this.state.medicineDetails.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-2">
                          <label htmlFor="sr_no">SR No.</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="sr_no"
                                name="sr_no"
                                className="form-control"
                                defaultValue={index + 1}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="medicine_name">Medicine Name</label>
                          <div className="form-group">
                            <div className="form-line">
                              <AutoCompleteMedicine
                                itemPosition={index}
                                showDataInInputs={this.showDataInInputs}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="qty">Qty</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty"
                                name="qty"
                                className="form-control"
                                placeholder="Enter Quantity"
                                defaultValue={item.qty}
                                data-index={index}
                                onChange={this.qtyChangeUpdate}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="qty_type">Qty Type</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="qty_type"
                                name="qty_type"
                                className="form-control"
                                placeholder="Quantuty Type"
                                defaultValue={item.qty_type}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <label htmlFor="unit_price">Unit Price</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="unit_price"
                                name="unit_price"
                                className="form-control"
                                placeholder="Enter unite price"
                                defaultValue={item.unit_price}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <label htmlFor="amount">Amount</label>
                          <div className="form-group">
                            <div className="form-line">
                              <input
                                type="text"
                                id="amount"
                                name="amount"
                                className="form-control"
                                placeholder="Enter amount"
                                defaultValue={item.amount}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-lg-6">
                        <button
                          type="button"
                          onClick={this.AddMedicineDetails}
                          className="btn btn-block btn-success"
                        >
                          ADD MEDICINE DETAILS
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          onClick={this.RemoveMedicineDetails}
                          className="btn btn-block btn-danger"
                          type="button"
                        >
                          REMOVE MEDICINE DETAILS
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary m-t-15 waves-effect btn-block"
                      disabled={this.state.btnMessage == 0 ? false : true}
                    >
                      {this.state.btnMessage == 0
                        ? "Generate Bill"
                        : "Generating Bill Please Wait..."}
                    </button>
                    <br />
                    <br />
                    {this.state.errRes == false &&
                    this.state.sendData == true ? (
                      <div className="alert alert-success">
                        <strong>Sucecess</strong> {this.state.errorMessage}
                        <br />
                        <br />
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
