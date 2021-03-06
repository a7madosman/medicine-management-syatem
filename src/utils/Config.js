export default class Config {
  static BASE_URL = "https://test-manage-system.herokuapp.com/";
  static loginUrl = BASE_URL + "api/gettoken/";
  static refreshApiUrl = BASE_URL + "api/refresh_token/";
  static companyApiUrl = BASE_URL + "api/company/";
  static companyBankyApiUrl = BASE_URL + "api/companybank/";
  static companyonly = BASE_URL + "api/companyonly/";
  static generateBillApiUrl = BASE_URL + "api/generate_bill_api/";
  static medicineApiUrl = BASE_URL + "api/medicine/";
  static medicineByNameApiUrl = BASE_URL + "api/medicinebyname/";
  static companyAccountApiUrl = BASE_URL + "api/companyaccount/";
  static customerRequestApiUrl = BASE_URL + "api/customer_request/";
  static homeApiUrl = BASE_URL + "api/home_api/";

  static employeeBankApiUrl = BASE_URL + "api/employee_all_bank/";
  static employeeSalaryApiUrl = BASE_URL + "api/employee_all_salary/";

  static employeeApiUrl = BASE_URL + "api/employee/";
  static employeeBankByIdApiUrl = BASE_URL + "api/employee_bankby_id/";
  static employeeSalaryByIdApiUrl = BASE_URL + "api/employee_salaryby_id/";

  static homeUrl = "/home";
  static logoutPageUrl = "/logout";

  static sidebarItems = [
    { index: "0", title: "Home", url: "/home", icons: "home" },
    { index: "1", title: "Company", url: "/company", icons: "account_balance" },
    {
      index: "2",
      title: "Add Medicine",
      url: "/addMedicine",
      icons: "add_to_queue",
    },
    {
      index: "3",
      title: "Manage Medicine",
      url: "/manageMedicine",
      icons: "mode_edit",
    },
    {
      index: "4",
      title: "Manage Company Account",
      url: "/managecompanyaccount",
      icons: "mode_edit",
    },
    {
      index: "5",
      title: "Manage Employee",
      url: "/employeeManage",
      icons: "person_add",
    },
    {
      index: "6",
      title: "Generate Bill",
      url: "/generateBill",
      icons: "assignment",
    },
    {
      index: "7",
      title: "Customer Request",
      url: "/customerRequest",
      icons: "person_add",
    },
  ];
}
