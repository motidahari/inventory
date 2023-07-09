import requests from "./requests.js";
import { fetchData } from "./fetchData.js";

const users = {
  registration: async (userData) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const result = fetchData(requests.Users.Registration, requestOptions);
    return result;
  },

  login: async (userData) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const result = fetchData(requests.Users.Login, requestOptions);
    return result;
  },

  deleteUser: async (userAction, userData) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(userData),
    };
    const result = fetchData(requests.Users.DeleteUserByID, requestOptions);
    return result;
  },

  updateUser: async (userAction, userData) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(userData),
    };
    const result = fetchData(requests.Users.UpdateUser, requestOptions);
    return result;
  },

  getUnapprovedUsers: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Users.GetUnapprovedUsers, requestOptions);
    return result;
  },

  getAllUsers: async (userAction) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
    };
    const result = fetchData(requests.Users.GetAllUsers, requestOptions);
    return result;
  },

  confirmUser: async (userAction, userData) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userAction.token,
        userId: userAction.userId,
      },
      body: JSON.stringify(userData),
    };
    const result = fetchData(requests.Users.ConfirmUser, requestOptions);
    return result;
  },
};

export default users;
