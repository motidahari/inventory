import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const employees = {
  addEmployee: async (userAction, employee) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(employee),
    };
    const result = fetchData(requests.Employees.AddEmployee, requestOptions);
    return result;
  },

  deleteEmployeeById: async (userAction, employee) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(employee),
    };
    const result = fetchData(requests.Employees.DeleteEmployee, requestOptions);
    return result;
  },

  getAllEmployees: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Employees.GetEmployees, requestOptions);
    return result;
  },

  updateEmployee: async (userAction, employee) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(employee),
    };
    const result = fetchData(requests.Employees.UpdateEmployee, requestOptions);
    return result;
  },

  getEmployeesByParams: async (userAction, employee) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(employee),
    };
    const result = fetchData(
      requests.Employees.GetEmployeesByParams,
      requestOptions
    );
    return result;
  },
};

export default employees;
