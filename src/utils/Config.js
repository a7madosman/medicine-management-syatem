export default class Config {
  static loginUrl = "http://localhost:8000/api/gettoken/";
  static refreshApiUrl = "http://localhost:8000/api/refresh_token/";
  static companyApiUrl = "http://localhost:8000/api/company/";
  static companyBankyApiUrl = "http://localhost:8000/api/companybank/";
  static companyonly = "http://localhost:8000/api/companyonly/";
  static generateBillApiUrl = "http://localhost:8000/api/generate_bill_api/";
  static medicineApiUrl = "http://localhost:8000/api/medicine/";
  static medicineByNameApiUrl = "http://localhost:8000/api/medicinebyname/";
  static companyAccountApiUrl = "http://localhost:8000/api/companyaccount/";
  static customerRequestApiUrl = "http://localhost:8000/api/customer_request/";
  static homeApiUrl = "http://localhost:8000/api/home_api/";

  static employeeBankApiUrl = "http://localhost:8000/api/employee_all_bank/";
  static employeeSalaryApiUrl =
    "http://localhost:8000/api/employee_all_salary/";

  static employeeApiUrl = "http://localhost:8000/api/employee/";
  static employeeBankByIdApiUrl =
    "http://localhost:8000/api/employee_bankby_id/";
  static employeeSalaryByIdApiUrl =
    "http://localhost:8000/api/employee_salaryby_id/";

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
