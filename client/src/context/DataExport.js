import moment from "moment";
import React, { useReducer, createContext } from "react";

export const initialState = createContext({
  fileName: "null.csv",
  headers: null,
  data: null,
});
const ExportDataContext = createContext({
  fileName: "Example.csv",
  headers: [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
  ],
  data: [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
    { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
    { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  ],
  changeDataExport: (page, data, fileName) => {},
});
function exportReducer(state, action) {
  const { data, type } = action;

  switch (action.type) {
    case "Products":
      return {
        ...state,
        data: data?.map((product) => {
          return {
            ...product,
            warranty: moment(product.warranty).format("YYYY-MM-DD"),
            date: moment(product.date).format("YYYY-MM-DD"),
          };
        }),
        fileName: `${type}.csv`,
        headers: [
          { label: "PONumber", key: "PONumber" },
          { label: "countryName", key: "countryName" },
          { label: "date", key: "date" },
          { label: "locationName", key: "locationName" },
          { label: "productName", key: "productName" },
          { label: "serialNumber", key: "serialNumber" },
          { label: "warranty", key: "warranty" },
        ],
      };
    case "Gaps":
      return {
        ...state,
        data: data,
        fileName: `${type}.csv`,
        headers: [
          { label: "productName", key: "productName" },
          { label: "quantityInLocation", key: "quantityInLocation" },
          { label: "quantity", key: "quantity" },
          { label: "gap", key: "gap" },
        ],
      };
    case "AmplifiersTraffic":
      return {
        ...state,
        data: data?.map((product) => {
          return {
            ...product,
            warranty: moment(product.warranty).format("YYYY-MM-DD"),
            date: moment(product.date).format("YYYY-MM-DD"),
          };
        }),
        fileName: `${type}.csv`,
        headers: [
          { label: "PONumber", key: "PONumber" },
          { label: "action", key: "action" },
          { label: "countryName", key: "countryName" },
          { label: "date", key: "date" },
          { label: "description", key: "description" },
          { label: "email", key: "email" },
          { label: "locationName", key: "locationName" },
          { label: "name", key: "name" },
          { label: "productName", key: "productName" },
          { label: "serialNumber", key: "serialNumber" },
          { label: "status", key: "status" },
          { label: "storage", key: "storage" },
          { label: "warranty", key: "warranty" },
        ],
      };
    case "AmplifiersMonitoring":
      return {
        ...state,
        data: data?.map((product) => {
          return {
            ...product,
            warranty: moment(product.warranty).format("YYYY-MM-DD"),
            date: moment(product.date).format("YYYY-MM-DD"),
          };
        }),
        fileName: `${type}.csv`,
        headers: [
          { label: "PONumber", key: "PONumber" },
          { label: "action", key: "action" },
          { label: "countryName", key: "countryName" },
          { label: "date", key: "date" },
          { label: "description", key: "description" },
          { label: "email", key: "email" },
          { label: "locationName", key: "locationName" },
          { label: "name", key: "name" },
          { label: "productName", key: "productName" },
          { label: "serialNumber", key: "serialNumber" },
          { label: "status", key: "status" },
          { label: "storage", key: "storage" },
          { label: "warranty", key: "warranty" },
        ],
      };
    case "Logs":
      return {
        ...state,
        data: data?.map((product) => {
          return {
            ...product,
            warranty: moment(product.warranty).format("YYYY-MM-DD"),
            date: moment(product.date).format("YYYY-MM-DD"),
          };
        }),
        fileName: `${type}.csv`,
        headers: [
          { label: "PONumber", key: "PONumber" },
          { label: "action", key: "action" },
          { label: "countryName", key: "countryName" },
          { label: "date", key: "date" },
          { label: "description", key: "description" },
          { label: "email", key: "email" },
          { label: "locationName", key: "locationName" },
          { label: "name", key: "name" },
          { label: "productName", key: "productName" },
          { label: "serialNumber", key: "serialNumber" },
          { label: "storage", key: "storage" },
          { label: "warranty", key: "warranty" },
        ],
      };

    case "Employees":
      return {
        ...state,
        data: data,
        fileName: `${type}.csv`,
        headers: [
          { label: "officeName", key: "officeName" },
          { label: "employeeName", key: "employeeName" },
          { label: "screen", key: "screen" },
          { label: "tv", key: "tv" },
          { label: "dockingStation", key: "dockingStation" },
          { label: "ipPhone", key: "ipPhone" },
          { label: "desktopComputer", key: "desktopComputer" },
          { label: "laptop", key: "laptop" },
          { label: "printer", key: "printer" },
          { label: "headset", key: "headset" },
          { label: "webCamera", key: "webCamera" },
        ],
      };
    default:
      return state;
  }
}

function ExportDataProvider(props) {
  const [state, dispatch] = useReducer(exportReducer, ExportDataContext);
  function changeDataExport(fileName, data) {
    dispatch({
      type: fileName,
      data: data,
    });
  }
  return (
    <ExportDataContext.Provider
      value={{
        state,
        fileName: state.fileName,
        headers: state.headers,
        data: state.data,
        changeDataExport,
      }}
      {...props}
    />
  );
}

export { ExportDataContext, ExportDataProvider };
