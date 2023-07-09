const baseDev = "http://localhost:5002/api";

const base = baseDev;
const users = `${base}/users`;
const products = `${base}/products`;
const offices = `${base}/offices`;
const officeEquipment = `${base}/officeequipment`;
const logsProducts = `${base}/logs`;
const locations = `${base}/locations`;
const employees = `${base}/employees`;

const requests = {
  Users: {
    /**
     * HEADER: Content-Type
     * BODY:
     */
    GetUnapprovedUsers: `${users}/getUnapprovedUsers`,

    /**
     * HEADER: (Content-Type)
     * BODY: (email, name, password)
     */
    Registration: users,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (userId)
     */
    DeleteUserByID: `${users}`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (userId, permission)
     */
    ConfirmUser: `${users}/updateUserPermission`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllUsers: `${users}/getAllUsers`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (email, password)
     */
    Login: `${users}/login`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (userId, email, name, password, permission)
     */
    UpdateUser: `${users}`,
  },

  Products: {
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (serialNumber, PONumber, productName, warranty, storage, status, description, locationId)
     */
    AddProduct: products,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (productId, description, storage, status, locationNew[{locationId},{locationName}])
     */
    UpdateProductLocation: products,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (productId, description, storage, status, locationNew[{locationId},{locationName}])
     */
    UpdateProduct: `${products}/updateProduct`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (productId, description, storage)
     */
    DeleteProduct: products,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    getAllProducts: products,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: productId
     */
    getProductById: `${products}/getProductById`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    getAllProductsByLocationId: products,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, countryId, search
     */
    getAllProductsByParams: `${products}/getByParams`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, countryId, search
     */
    getGaps: `${products}/getGaps`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, products
     */
    AddGapToLocation: `${products}/addGapToLocation`,
  },

  Offices: {
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (officeName)
     */
    AddOffice: offices,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllOffices: offices,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    DeleteOfficeById: offices,
  },

  OfficeEquipment: {
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (equipmentName)
     */
    addOfficeEquipment: officeEquipment,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (equipmentId)
     */
    DeleteOfficeEquipment: officeEquipment,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAll: officeEquipment,
  },

  LogsProducts: {
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllLogsProducts: `${logsProducts}/products`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, countryId, search
     */
    GetAllLogsProductByParams: `${logsProducts}/getAllLogsProductByParams`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, countryId, search
     */
    GetAllLogsProductAmplifiersMonitoringByParams: `${logsProducts}/getAllLogsProductAmplifiersMonitoringByParams`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: locationId, countryId, search
     */
    GetAllLogsProductAmplifiersTrafficByParams: `${logsProducts}/getAllLogsProductAmplifiersTrafficByParams`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (locationId)
     */
    GetAllLogsProductsByLocationId: `${logsProducts}`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllLogsMonitoringAmplifiers: `${logsProducts}/monitoringAmplifiers`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllLogsAmplifierTraffic: `${logsProducts}/amplifierTraffic`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllLogsUsers: `${logsProducts}/users`,
  },

  Locations: {
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (locationName, countryId)
     */
    AddLocations: locations,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (locationId)
     */
    DeleteLocation: locations,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAll: locations,
    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: officeId, search
     */
    GetAllLocationByCounrtyId: `${locations}/getLocationsByCountryId`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    GetAllCountries: `${locations}/countries`,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY:
     */
    CreateCountriesAndLocations: `${locations}/createCountriesAndLocations`,
  },

  Employees: {
    /**
        * HEADER: (userId, x-auth-token , Content-Type)
        * BODY: (employeeName, officeId
        * officeequipmentforemployees
        [
            {sum, name}, {sum, name}, {sum, name},
            {sum, name}, {sum, name}, {sum, name},
            {sum, name}, {sum, name}, {sum, name},
        ])
        */
    AddEmployee: employees,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (employeeId)
     */
    DeleteEmployee: employees,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: (employeeId)
     */
    GetEmployees: employees,

    /**
         * HEADER: (userId, x-auth-token , Content-Type)
         * BODY: (employeeId, employeeName, officeId
         * officeequipmentforemployees
         [
            {sum, name}, {sum, name}, {sum, name},
            {sum, name}, {sum, name}, {sum, name},
            {sum, name}, {sum, name}, {sum, name},
         ]) 
         */
    UpdateEmployee: employees,

    /**
     * HEADER: (userId, x-auth-token , Content-Type)
     * BODY: officeId, search
     */
    GetEmployeesByParams: `${employees}/getEmployeesByParams`,
  },
};

export default requests;
