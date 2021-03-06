import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";

import CanvasJSReact from "../utils/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    customerRequest: 0,
    BillCount: 0,
    medicineCount: 0,
    companyCount: 0,
    employeeCount: 0,
    totalProfit: 0,
    totaSales: 0,
    totalBuy: 0,
    pendingRequests: 0,
    completedRequests: 0,
    sellAmountToday: 0,
    profitAmountToday: 0,
    expiresInWeek: 0,
    profitChartOptions: {},
    sellChartOptions: {},
  };

  componentDidMount() {
    this.fetchHomePage();
  }

  async fetchHomePage() {
    var apihandler = new APIHandler();
    var homeData = await apihandler.fetchTotalRequest();
    console.log(homeData);
    this.setState({ customerRequest: homeData.data.customer_request });
    this.setState({ BillCount: homeData.data.bill_request });
    this.setState({ medicineCount: homeData.data.medicine_request });
    this.setState({ companyCount: homeData.data.company_request });
    this.setState({ employeeCount: homeData.data.employee_request });
    this.setState({ totalProfit: homeData.data.profit_total });
    this.setState({ totalSales: homeData.data.sell_total });
    this.setState({ totalBuy: homeData.data.buy_total });
    this.setState({ pendingRequests: homeData.data.pending_requests });
    this.setState({ completedRequests: homeData.data.completed_requests });
    this.setState({ sellAmountToday: homeData.data.sell_amount_today });
    this.setState({ profitAmountToday: homeData.data.profit_amount_today });
    this.setState({
      expiresInWeek: homeData.data.medicine_expire_serializer_data,
    });

    var profitDataList = [];
    for (let i = 0; i < homeData.data.profit_chart.length; i++) {
      profitDataList.push({
        x: new Date(homeData.data.profit_chart[i].date),
        y: homeData.data.profit_chart[i].amt,
      });
    }
    this.state.profitChartOptions = {
      animationEnabled: true,
      title: {
        text: "Total Medicine Profits",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "PROFITS",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: profitDataList,
        },
      ],
    };

    var sellDataList = [];
    for (let i = 0; i < homeData.data.sell_chart.length; i++) {
      sellDataList.push({
        x: new Date(homeData.data.sell_chart[i].date),
        y: homeData.data.sell_chart[i].amt,
      });
    }
    this.state.sellChartOptions = {
      animationEnabled: true,
      title: {
        text: "Total Sell Medicine",
      },
      axisX: {
        valueFormatString: "DD MMMM YYYY",
      },
      axisY: {
        title: "Sales",
        prefix: "$",
      },
      data: [
        {
          yValueFormatString: "$#,###",
          xValueFormatString: "DD MMMM YYYY",
          type: "spline",
          dataPoints: sellDataList,
        },
      ],
    };
    this.setState({});
  }

  render() {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>HOME</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">assignment</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL REQUESTS</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.customerRequest}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">help</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.BillCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">forum</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL MEDICINES</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.medicineCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">person_add</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL COMPANY</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.companyCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL EMPLOYEE</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.employeeCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">help</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.totalProfit}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">forum</i>
                </div>
                <div className="content">
                  <div className="text">TOTAL SALES AMOUNT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.totalSales}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">person_add</i>
                </div>
                <div className="content">
                  <div className="text">MEDECINE EXPIRES IN WEEK</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.expiresInWeek}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-pink hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">playlist_add_check</i>
                </div>
                <div className="content">
                  <div className="text">COMPLETED REQUESTED</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="125"
                    data-speed="15"
                    data-fresh-interval="20"
                  >
                    {this.state.completedRequests}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-cyan hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">help</i>
                </div>
                <div className="content">
                  <div className="text">PENDING REQUESTS</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="257"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.pendingRequests}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-light-green hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">forum</i>
                </div>
                <div className="content">
                  <div className="text">SALES AMOUNT TODAY</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="243"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.sellAmountToday}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="info-box bg-orange hover-expand-effect">
                <div className="icon">
                  <i className="material-icons">person_add</i>
                </div>
                <div className="content">
                  <div className="text">TODAY SALES PROFIT</div>
                  <div
                    className="number count-to"
                    data-from="0"
                    data-to="1225"
                    data-speed="1000"
                    data-fresh-interval="20"
                  >
                    {this.state.profitAmountToday}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Medicine Profit</h2>
                </div>
                <CanvasJSChart
                  options={this.state.profitChartOptions}
                  /* onRef={ref => this.chart = ref} */
                />
              </div>
            </div>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Sell Chart</h2>
                </div>
                <CanvasJSChart
                  options={this.state.sellChartOptions}
                  /* onRef={ref => this.chart = ref} */
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
