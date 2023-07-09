import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const locations = {
  addLocation: async (userAction, location) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(location),
    };
    const result = fetchData(requests.Locations.AddLocations, requestOptions);
    return result;
  },

  deleteLocationById: async (userAction, location) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(location),
    };
    const result = fetchData(requests.Locations.DeleteLocation, requestOptions);
    return result;
  },

  getAllLocations: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Locations.GetAll, requestOptions);
    return result;
  },

  getAllCountries: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.Locations.GetAllCountries,
      requestOptions
    );
    return result;
  },

  getLocationsByCountryId: async (userAction, product) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(product),
    };
    const result = fetchData(
      requests.Locations.GetAllLocationByCounrtyId,
      requestOptions
    );
    return result;
  },

  createCountriesAndLocations: async (userAction, product) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(product),
    };
    const result = fetchData(
      requests.Locations.CreateCountriesAndLocations,
      requestOptions
    );
    return result;
  },
};

export default locations;
