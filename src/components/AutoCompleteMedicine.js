import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";

export default class AutoCompleteMedicine extends Component {
  constructor(props) {
    super(props);
    this.loadDataMedicine = this.loadDataMedicine.bind(this);
    this.inputData = React.createRef();
  }

  state = {
    onFocus: false,
    dataList: [],
  };

  onFocusChange = () => {
    this.setState({ onFocus: true });
  };

  onBlurChange = () => {
    this.setState({ onFocus: false });
  };

  async loadDataMedicine(event) {
    var apihandler = new APIHandler();
    var response = await apihandler.fetchMedicineDetails(event.target.value);
    this.setState({ dataList: response.data });
  }

  onShowItem = (item) => {
    // console.log(item);
    this.inputData.current.value = item.name;
    // pass the data to the parent compnent <BillGenerateComponent>
    this.props.showDataInInputs(this.props.itemPosition, item);
    this.onBlurChange();
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="text"
          id="medicine_name"
          name="medicine_name"
          className="form-control"
          placeholder="Medicine Name"
          onFocus={this.onFocusChange}
          autoComplete="off"
          onChange={this.loadDataMedicine}
          ref={this.inputData}
        />

        {this.state.onFocus == true ? (
          <div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                border: "1px solid lightgrey",
                boxShadow: "1px 1px 1px lightgrey",
                position: "absolute",
                width: "100%",
                zIndex: 1,
                background: "white",
              }}
            >
              {this.state.dataList.map((item, index) => (
                <li
                  key={index}
                  style={{
                    padding: "5px",
                    borderBottom: "1px solid lightgrey",
                  }}
                  onClick={() => this.onShowItem(item)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
