const locations = {
  createLocation: (location) => {
    return `INSERT INTO inventory.locations (locationId, locationName, countryId) VALUES ( '${location.locationId}', '${location.locationName}', '${location.countryId}');`;
  },
  getLocationByLocationId: (locationId) => {
    return `SELECT * FROM inventory.locations WHERE locationId = '${locationId}';`;
  },
  deleteLocation: (locationId) => {
    return `DELETE FROM inventory.locations WHERE locationId = '${locationId}'`;
  },
  getAllLocations: () => {
    return `SELECT * FROM inventory.countries
            INNER JOIN inventory.locations
            ON inventory.countries.countryId = inventory.locations.countryId
            ORDER BY inventory.countries.countryId DESC;`;
  },
  createCountry: (country) => {
    return `INSERT INTO inventory.countries (id, countryId, countryName) VALUES (${country.id}, '${country.countryId}', '${country.countryName}');`;
  },
  getLocationsByCountryId: (countryId) => {
    return `SELECT locations.locationId, locations.locationName                   
            FROM inventory.locations
            INNER JOIN inventory.countries
              ON inventory.countries.countryId = inventory.locations.countryId
            WHERE inventory.countries.countryId = '${countryId}' 
            ORDER BY inventory.locations.locationName DESC;`;
  },
  getCountries: () => {
    return `SELECT * FROM inventory.countries ORDER BY inventory.countries.countryName ASC;`;
  },
  getLocationByProductId: (productId) => {
    return `SELECT
                locations.locationName,
                locations.locationId,
                products.productId
            FROM
                products
                INNER JOIN locations ON products.locationId = locations.locationId
            WHERE
                products.productId = '${productId}';`;
  },
  getLocationNameByLocationId: (locationId) => {
    return `SELECT locationName, locationId FROM inventory.locations WHERE inventory.locations.locationId = '${locationId}';`;
  },
  getLocationByProductId: (productId) => {
    return `SELECT
                locations.locationName,
                locations.locationId,
                products.productId
            FROM
                products
                INNER JOIN locations ON products.locationId = locations.locationId
            WHERE
                products.productId = '${productId}';`;
  },
  updateLocationByProductsId: (location, productId) => {
    return `UPDATE inventory.products SET locationId = '${location.locationId}' WHERE (productId = '${productId}');`;
  },
};
module.exports = locations;
