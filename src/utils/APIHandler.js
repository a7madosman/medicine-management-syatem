import axios from "axios";
import React from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import AuthHandler from "./AuthHandler";
import Config from "./Config";

export default class APIHandler {
  async checkLogin() {
    if (AuthHandler.checkTokenExpiry()) {
      try {
        var response = await axios.post(Config.refreshApiUrl, {
          refresh: AuthHandler.getRefreshToken(),
        });
        reactLocalStorage.set("token", response.data.access);
      } catch (error) {
        console.log(error);
        AuthHandler.logOutUser();
        window.location = "/";
      }
    }
  }

  // Save Data
  async saveCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description
  ) {
    await this.checkLogin();
    var response = await axios.post(
      Config.companyApiUrl,
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save Edited Data
  async editCompanyData(
    name,
    license_no,
    address,
    contact_no,
    email,
    description,
    id
  ) {
    await this.checkLogin();
    var response = await axios.put(
      Config.companyApiUrl + "" + id + "/",
      {
        name: name,
        license_no: license_no,
        address: address,
        contact_no: contact_no,
        email: email,
        description: description,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save bank details
  async saveCompanyBankData(bank_account_no, ifsc_no, company_id) {
    await this.checkLogin();
    var response = await axios.post(
      Config.companyBankyApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Edit bank details
  async fetchCompanyBankDetails(id) {
    await this.checkLogin();
    var response = await axios.get(Config.companyBankyApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  }

  // save Edited Bank company Data
  async editCompanyBankData(bank_account_no, ifsc_no, company_id, id) {
    await this.checkLogin();
    var response = await axios.put(
      Config.companyBankyApiUrl + "" + id + "/",
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        company_id: company_id,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save medicin, medicine details
  async saveMedicineData(
    name,
    medical_type,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails
  ) {
    await this.checkLogin();
    var response = await axios.post(
      Config.medicineApiUrl,
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch: batch,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save Edite medicin, medicine details
  async editMedicineData(
    name,
    medical_type,
    buy_price,
    sell_price,
    c_gst,
    s_gst,
    batch,
    shelf_no,
    expire_date,
    mfg_date,
    company_id,
    description,
    in_stock_total,
    qty_in_strip,
    medicinedetails,
    id
  ) {
    await this.checkLogin();
    var response = await axios.put(
      Config.medicineApiUrl + "" + id + "/",
      {
        name: name,
        medical_type: medical_type,
        buy_price: buy_price,
        sell_price: sell_price,
        c_gst: c_gst,
        s_gst: s_gst,
        batch: batch,
        shelf_no: shelf_no,
        expire_date: expire_date,
        mfg_date: mfg_date,
        company_id: company_id,
        description: description,
        in_stock_total: in_stock_total,
        qty_in_strip: qty_in_strip,
        medicine_details: medicinedetails,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save Company Account details
  async saveCompanyTranactionData(
    company_id,
    transaction_type,
    transaction_amt,
    transaction_date,
    payment_mode
  ) {
    await this.checkLogin();
    var response = await axios.post(
      Config.companyAccountApiUrl,
      {
        company_id: company_id,
        transaction_type: transaction_type,
        transaction_amt: transaction_amt,
        transaction_date: transaction_date,
        payment_mode: payment_mode,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // save Employee details
  async saveEmployeeData(name, joining_date, phone, address) {
    await this.checkLogin();
    var response = await axios.post(
      Config.employeeApiUrl,
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Get all companies
  async fetchAllCompany() {
    await this.checkLogin();
    var response = await axios.get(Config.companyApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Get all companies for medicine page
  async fetchCompanyOnly() {
    await this.checkLogin();
    var response = await axios.get(Config.companyonly, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Get all companies Accounts
  async fetchCompanyAccount() {
    await this.checkLogin();
    var response = await axios.get(Config.companyAccountApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Load company and medicine data
  async fetchAllMedicine() {
    await this.checkLogin();
    var response = await axios.get(Config.medicineApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // get specific company details
  async fetchCompanyDetails(id) {
    await this.checkLogin();
    var response = await axios.get(Config.companyApiUrl + "" + id + "/", {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Get all Employees
  async fetchEmployee() {
    await this.checkLogin();
    var response = await axios.get(Config.employeeApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Get Employee By ID
  async fetchEmployeeById(id) {
    await this.checkLogin();
    var response = await axios.get(Config.employeeApiUrl + "" + id + "/", {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  }

  // save Edite medicin, medicine details
  async editEmployeeData(name, joining_date, phone, address, id) {
    await this.checkLogin();
    var response = await axios.put(
      Config.employeeApiUrl + "" + id + "/",
      {
        name: name,
        joining_date: joining_date,
        phone: phone,
        address: address,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Get Single Employee Salary Data
  async fetchSalaryEmployee(id) {
    await this.checkLogin();
    var response = await axios.get(Config.employeeSalaryByIdApiUrl + "" + id, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  }

  // Get Single Employee Bank Data
  async fetchEmployeeBankData(id) {
    await this.checkLogin();
    var response = await axios.get(Config.employeeBankByIdApiUrl + "" + id, {
      headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
    });
    return response;
  }

  // Get Medicine By Name For Sugestions
  async fetchMedicineDetails(name) {
    if (name != "") {
      await this.checkLogin();
      var response = await axios.get(Config.medicineByNameApiUrl + "" + name, {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      });
      return response;
    } else {
      return { data: [] };
    }
  }

  // Add employee salary
  async addEmployeeSalaryData(salary_date, salary_amount, employee_id) {
    await this.checkLogin();
    var response = await axios.post(
      Config.employeeSalaryApiUrl,
      {
        salary_date: salary_date,
        salary_amount: salary_amount,
        employee_id: employee_id,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Add Employee Bank
  async addEmployeeBankData(bank_account_no, ifsc_no, employee_id) {
    await this.checkLogin();
    var response = await axios.post(
      Config.employeeBankApiUrl,
      {
        bank_account_no: bank_account_no,
        ifsc_no: ifsc_no,
        employee_id: employee_id,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Generate Bills
  async generateBill(name, address, contact, medicinedetails) {
    await this.checkLogin();
    var response = await axios.post(
      Config.generateBillApiUrl,
      {
        name: name,
        address: address,
        contact: contact,
        medicine_details: medicinedetails,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Get all Customer Request
  async fetchAllCustomerRequest() {
    await this.checkLogin();
    var response = await axios.get(Config.customerRequestApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }

  // Add Customer Medicine Request
  async saveCustomerRequest(customer_name, phone, medicine_details) {
    await this.checkLogin();
    var response = await axios.post(
      Config.customerRequestApiUrl,
      {
        customer_name: customer_name,
        phone: phone,
        medicine_details: medicine_details,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  // Update Customer Request
  async updateCustomerRequest(customer_id, name, phone, medicine_details) {
    await this.checkLogin();
    var response = await axios.put(
      Config.customerRequestApiUrl + "" + customer_id + "/",
      {
        customer_id: customer_id,
        customer_name: name,
        phone: phone,
        medicine_details: medicine_details,
        status: 1,
      },
      {
        headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
      }
    );
    return response;
  }

  async fetchTotalRequest() {
    await this.checkLogin();
    var response = await axios.get(Config.homeApiUrl, {
      headers: {
        Authorization: "Bearer " + AuthHandler.getLoginToken(),
      },
    });
    return response;
  }
}
