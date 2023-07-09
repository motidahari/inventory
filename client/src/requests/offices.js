import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const offices = {
  addOffice: async (userAction, office) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(office),
    };
    const result = fetchData(requests.Offices.AddOffice, requestOptions);
    return result;
  },

  deleteOfficeById: async (userAction, office) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(office),
    };
    const result = fetchData(requests.Offices.DeleteOfficeById, requestOptions);
    return result;
  },

  getAllOffices: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Offices.GetAllOffices, requestOptions);
    return result;
  },
};

export default offices;
