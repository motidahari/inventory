import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const officeEquipment = {
  addOfficeEquipment: async (userAction, officeEquipment) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(officeEquipment),
    };
    const result = fetchData(
      requests.OfficeEquipment.addOfficeEquipment,
      requestOptions
    );
    return result;
  },

  deleteOfficeEquipmentById: async (userAction, officeEquipment) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(officeEquipment),
    };
    const result = fetchData(
      requests.OfficeEquipment.DeleteOfficeEquipment,
      requestOptions
    );
    return result;
  },

  getAllOfficeEquipment: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.OfficeEquipment.GetAll, requestOptions);
    return result;
  },
};

export default officeEquipment;
