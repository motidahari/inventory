import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const products = {
  addProduct: async (userAction, product) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(product),
    };
    const result = fetchData(requests.Products.AddProduct, requestOptions);
    return result;
  },

  UpdateProductLocation: async (userAction, product) => {
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
      requests.Products.UpdateProductLocation,
      requestOptions
    );
    return result;
  },

  UpdateProduct: async (userAction, product) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(product),
    };
    const result = fetchData(requests.Products.UpdateProduct, requestOptions);
    return result;
  },

  deleteProduct: async (userAction, product) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(product),
    };
    const result = fetchData(requests.Products.DeleteProduct, requestOptions);
    return result;
  },

  getAllProducts: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Products.getAllProducts, requestOptions);
    return result;
  },

  getAllProductsByLocationId: async (userAction, location) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.Products.getAllProductsByLocationId + "/" + location.locationId,
      requestOptions
    );
    return result;
  },

  getProductById: async (userAction, product) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(
      requests.Products.getProductById + "/" + product.productId,
      requestOptions
    );
    return result;
  },

  getProductByParams: async (userAction, params) => {
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
      requests.Products.getAllProductsByParams,
      requestOptions
    );
    return result;
  },

  getGaps: async (userAction, location) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(location),
    };
    const result = fetchData(requests.Products.getGaps, requestOptions);
    return result;
  },

  addGapToLocation: async (userAction, gapsToLocaions) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(gapsToLocaions),
    };
    const result = fetchData(
      requests.Products.AddGapToLocation,
      requestOptions
    );
    return result;
  },
};

export default products;
