import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const logs = {
  GetAllLogsProducts: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsProducts,
      requestOptions
    );
    return result;
  },

  GetAllLogsProductsParams: async (userAction, params) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(params),
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsProductByParams,
      requestOptions
    );
    return result;
  },

  GetAllLogsMonitoringAmplifiers: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsMonitoringAmplifiers,
      requestOptions
    );
    return result;
  },

  GetAllLogsProductsAmplifiersMonitoringByParams: async (
    userAction,
    params
  ) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(params),
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsProductAmplifiersMonitoringByParams,
      requestOptions
    );
    return result;
  },

  GetAllLogsAmplifierTraffic: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsAmplifierTraffic,
      requestOptions
    );
    return result;
  },

  GetAllLogsProductsAmplifiersTrafficByParams: async (userAction, params) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(params),
    };
    const result = fetchData(
      requests.LogsProducts.GetAllLogsProductAmplifiersTrafficByParams,
      requestOptions
    );
    return result;
  },

  GetAllLogsProductsByLocationId: async (userAction, location) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      `${requests.LogsProducts.GetAllLogsProductsByLocationId}/${location.locationId}`,
      requestOptions
    );
    return result;
  },
};

export default logs;
