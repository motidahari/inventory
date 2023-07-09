const logs = {
  createLogProduct: (log) => {
    return `INSERT INTO inventory.logsproducts( logId, action, userCreateAction, description, storage, productId, status, date) VALUES( '${log.logId}', '${log.action}', '${log.userCreateAction}', '${log.description}', '${log.storage}', '${log.productId}', '${log.status}', NOW());`;
  },
  getLogsProducts: () => {
    return `SELECT 
              products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, 
              locations.locationId, locations.locationName, 
              countries.countryName , countries.countryId, 
              logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date, 
              users.name, users.email
          FROM inventory.products 

          INNER JOIN inventory.logsproducts  
              ON inventory.logsproducts.productId = inventory.products.productId
          INNER JOIN inventory.users  
              ON inventory.users.userId = inventory.logsproducts.userCreateAction
          LEFT JOIN inventory.locations  
              ON locations.locationId = products.locationId
          LEFT JOIN inventory.countries  
              ON inventory.countries.countryId = inventory.locations.countryId
          ORDER BY inventory.logsproducts.date DESC; `;
  },
  getAllLogsProductByParams: (search, locationId, countryId) => {
    let conditions = "";
    if (locationId?.length) {
      conditions += ` inventory.products.locationId = '${locationId}' OR  inventory.logsproducts.storage = '${locationId}' `;
    }
    if (countryId?.length) {
      if (conditions?.length) {
        conditions += ` AND inventory.countries.countryId = '${countryId}'`;
      } else {
        conditions += ` inventory.countries.countryId = '${countryId}'`;
      }
    }
    if (search?.length) {
      if (conditions?.length) {
        conditions += ` AND ( 
                    ${
                      locationId?.length
                        ? `inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR 
                    products.productName LIKE '%${search}%' OR 
                    products.PONumber LIKE '%${search}%' OR 
    
                    logsproducts.action LIKE '%${search}%' OR 
                    logsproducts.description LIKE '%${search}%' OR 
                    logsproducts.storage LIKE '%${search}%' OR 
                    logsproducts.status LIKE '%${search}%' OR 
    
                    users.name LIKE '%${search}%' OR 
                    users.email LIKE '%${search}%' OR 
    
                    locations.locationName LIKE '%${search}%' OR 
                    countries.countryName LIKE '%${search}%'
                )`;
      } else {
        conditions += ` ( 
                    ${
                      locationId?.length
                        ? `inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR 
                    products.productName LIKE '%${search}%' OR 
                    products.PONumber LIKE '%${search}%' OR 
    
                    logsproducts.action LIKE '%${search}%' OR 
                    logsproducts.description LIKE '%${search}%' OR 
                    logsproducts.storage LIKE '%${search}%' OR 
                    logsproducts.status LIKE '%${search}%' OR 
    
                    users.name LIKE '%${search}%' OR 
                    users.email LIKE '%${search}%' OR 
    
                    locations.locationName LIKE '%${search}%' OR 
                    countries.countryName LIKE '%${search}%'
                )`;
      }
    }

    let query = `SELECT 
                        products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, 
                        locations.locationId, locations.locationName, 
                        countries.countryName , countries.countryId, 
                        logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date, 
                        users.name, users.email
                    FROM inventory.products 

                    INNER JOIN inventory.logsproducts  
                        ON inventory.logsproducts.productId = inventory.products.productId
                    INNER JOIN inventory.users  
                        ON inventory.users.userId = inventory.logsproducts.userCreateAction
                    LEFT JOIN inventory.locations  
                        ON locations.locationId = products.locationId
                    LEFT JOIN inventory.countries  
                        ON inventory.countries.countryId = inventory.locations.countryId
                    ${conditions?.length ? `WHERE ${conditions} ` : ""}
                    ORDER BY inventory.logsproducts.date DESC;`;

    return query;
  },
  getLogsAmplifierTraffic: () => {
    return `SELECT 
                    products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, 
                    locations.locationName , locations.locationId, 
                    countries.countryName , countries.countryId, 
                    logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date, 
                    users.name, users.email
                FROM inventory.products 

                INNER JOIN inventory.logsproducts  
                    ON inventory.logsproducts.productId = inventory.products.productId
                INNER JOIN inventory.users  
                    ON inventory.users.userId = inventory.logsproducts.userCreateAction
                LEFT JOIN inventory.locations  
                    ON locations.locationId = products.locationId
                LEFT JOIN inventory.countries  
                    ON inventory.countries.countryId = inventory.locations.countryId
            WHERE
                inventory.logsproducts.status IS NOT NULL AND inventory.logsproducts.status != ''
            ORDER BY inventory.logsproducts.date DESC;`;
  },
  getLogsAmplifierTrafficByParams: (search, locationId, countryId) => {
    let conditions = "";

    if (locationId?.length) {
      conditions += ` inventory.products.locationId = '${locationId}' OR  inventory.logsproducts.storage = '${locationId}'`;
    }
    if (countryId?.length) {
      if (conditions?.length) {
        conditions += ` AND inventory.countries.countryId = '${countryId}'`;
      } else {
        conditions += ` inventory.countries.countryId = '${countryId}'`;
      }
    }
    if (search?.length) {
      if (conditions?.length) {
        conditions += ` AND ( 
                    ${
                      locationId?.length
                        ? `inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR 
                    products.productName LIKE '%${search}%' OR 
                    products.PONumber LIKE '%${search}%' OR 
    
                    logsproducts.action LIKE '%${search}%' OR 
                    logsproducts.description LIKE '%${search}%' OR 
                    logsproducts.storage LIKE '%${search}%' OR 
                    logsproducts.status LIKE '%${search}%' OR 
    
                    users.name LIKE '%${search}%' OR 
                    users.email LIKE '%${search}%' OR 
    
                    locations.locationName LIKE '%${search}%' OR 
                    countries.countryName LIKE '%${search}%'
                )`;
      } else {
        conditions += ` ( 
                    ${
                      locationId?.length
                        ? `inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR 
                    products.productName LIKE '%${search}%' OR 
                    products.PONumber LIKE '%${search}%' OR 
    
                    logsproducts.action LIKE '%${search}%' OR 
                    logsproducts.description LIKE '%${search}%' OR 
                    logsproducts.storage LIKE '%${search}%' OR 
                    logsproducts.status LIKE '%${search}%' OR 
    
                    users.name LIKE '%${search}%' OR 
                    users.email LIKE '%${search}%' OR 
    
                    locations.locationName LIKE '%${search}%' OR 
                    countries.countryName LIKE '%${search}%'
                )`;
      }
    }

    let query = `SELECT 
                        products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, 
                        locations.locationName , locations.locationId, 
                        countries.countryName , countries.countryId, 
                        logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date, 
                        users.name, users.email
                    FROM inventory.products 

                    INNER JOIN inventory.logsproducts  
                        ON inventory.logsproducts.productId = inventory.products.productId
                    INNER JOIN inventory.users  
                        ON inventory.users.userId = inventory.logsproducts.userCreateAction
                    LEFT JOIN inventory.locations  
                        ON locations.locationId = products.locationId
                    LEFT JOIN inventory.countries  
                        ON inventory.countries.countryId = inventory.locations.countryId
                    WHERE
                        inventory.logsproducts.status IS NOT NULL AND inventory.logsproducts.status != '' AND
                        ${conditions?.length ? ` ${conditions}` : ""}
                    ORDER BY inventory.logsproducts.date DESC;`;

    return query;
  },
  getLogsMonitoringAmplifiers: () => {
    return `WITH logsproducts AS (
            SELECT
                *
            FROM (
                SELECT
                    *,
                    row_number() OVER (PARTITION BY inventory.logsproducts.productId ORDER BY inventory.logsproducts.date DESC) AS "rank"
                FROM
                    inventory.logsproducts
                WHERE
                    inventory.logsproducts.status IS NOT NULL
                    AND inventory.logsproducts.status != '') AS logsproducts
            WHERE
                logsproducts.rank = 1
        )
        SELECT
            products.productId, products.deleted, products.serialNumber, products.productName, products.PONumber, products.warranty, 
            locations.locationName, locations.locationId, countries.countryName, countries.countryId, logsproducts.logId, logsproducts.action, 
            logsproducts.description, logsproducts.storage, logsproducts.status, logsproducts.date, users.name, users.email
        FROM
            logsproducts
            INNER JOIN inventory.products ON inventory.products.productId = inventory.logsproducts.productId
            INNER JOIN inventory.users ON inventory.users.userId = inventory.logsproducts.userCreateAction
            LEFT JOIN inventory.locations ON locations.locationId = products.locationId
            LEFT JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
          ORDER BY inventory.logsproducts.date DESC;`;
  },
  getLogsMonitoringAmplifiersByParams: (search, locationId, countryId) => {
    let conditions = "";

    if (locationId?.length) {
      conditions += ` inventory.products.locationId = '${locationId}' OR  inventory.logsproducts.storage = '${locationId}' `;
    }
    if (countryId?.length) {
      if (conditions?.length) {
        conditions += ` AND inventory.countries.countryId = '${countryId}'`;
      } else {
        conditions += ` inventory.countries.countryId = '${countryId}'`;
      }
    }
    if (search?.length) {
      if (conditions?.length) {
        conditions += ` AND ( 
                    ${
                      locationId?.length
                        ? ` inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR
                    products.productName LIKE '%${search}%' OR
                    products.PONumber LIKE '%${search}%' OR

                    logsproducts.action LIKE '%${search}%' OR
                    logsproducts.description LIKE '%${search}%' OR
                    logsproducts.storage LIKE '%${search}%' OR
                    logsproducts.status LIKE '%${search}%' OR

                    users.name LIKE '%${search}%' OR
                    users.email LIKE '%${search}%' OR

                    locations.locationName LIKE '%${search}%' OR
                    countries.countryName LIKE '%${search}%'
                )`;
      } else {
        conditions += ` (
                    ${
                      locationId?.length
                        ? `inventory.locations.locationId ='${locationId}' OR`
                        : ""
                    }
                    products.serialNumber LIKE '%${search}%' OR 
                    products.productName LIKE '%${search}%' OR 
                    products.PONumber LIKE '%${search}%' OR 
    
                    logsproducts.action LIKE '%${search}%' OR 
                    logsproducts.description LIKE '%${search}%' OR 
                    logsproducts.storage LIKE '%${search}%' OR 
                    logsproducts.status LIKE '%${search}%' OR 
    
                    users.name LIKE '%${search}%' OR 
                    users.email LIKE '%${search}%' OR 
    
                    locations.locationName LIKE '%${search}%' OR 
                    countries.countryName LIKE '%${search}%'
            )`;
      }
    }
    let query = `WITH logsproducts AS (
                        SELECT
                            *
                        FROM (
                            SELECT
                                *,
                                row_number() OVER (PARTITION BY inventory.logsproducts.productId ORDER BY inventory.logsproducts.date DESC) AS "rank"
                            FROM
                                inventory.logsproducts
                            WHERE
                                inventory.logsproducts.status IS NOT NULL
                                AND inventory.logsproducts.status != '') AS logsproducts
                        WHERE
                            logsproducts.rank = 1
                    )
                    SELECT
                        products.productId, products.locationId, products.deleted, products.serialNumber, products.productName, 
                        products.PONumber, products.warranty, locations.locationName, countries.countryName, 
                        countries.countryId, logsproducts.logId, logsproducts.action, 
                        logsproducts.description, logsproducts.storage, logsproducts.status, logsproducts.date, users.name, users.email
                    FROM
                        logsproducts
                        INNER JOIN inventory.products ON inventory.products.productId = inventory.logsproducts.productId
                        INNER JOIN inventory.users ON inventory.users.userId = inventory.logsproducts.userCreateAction
                        LEFT JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                        LEFT JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                    ${conditions?.length ? `WHERE ${conditions}` : ""}
                  ORDER BY inventory.logsproducts.date DESC;`;
    return query;
  },
  getLogsUsers: () => {
    return `SELECT  
                    users.userId , users.email , users.name , users.permission , users.createdAt, 
                    logsusers.logId , logsusers.userId ,logsusers.userCreateAction ,logsusers.action ,logsusers.date 
                FROM inventory.logsusers 

                INNER JOIN inventory.users ON inventory.users.userId = inventory.logsusers.userId;`;
  },
  getLogsByLocationId: (locationId) => {
    return `SELECT
                    products.productId,products.deleted, products.serialNumber, products.productName, products.PONumber, products.warranty, 
                    locations.locationName, locations.locationId, 
                    countries.countryName, countries.countryId, 
                    logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date, 
                    users.name, users.email
                FROM inventory.products

                LEFT JOIN inventory.locations ON locations.locationId = products.locationId
                LEFT JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                INNER JOIN inventory.logsproducts ON inventory.logsproducts.productId = inventory.products.productId
                INNER JOIN inventory.users ON inventory.users.userId = inventory.logsproducts.userCreateAction
                WHERE locations.locationId = '${locationId}'
                ORDER BY inventory.products.date DESC;`;
  },
  getLogProductByProductId: (productId) => {
    return `SELECT * FROM logsproducts WHERE productId = '${productId}' ORDER BY inventory.logsproducts.date DESC LIMIT 1;`;
  },
};
module.exports = logs;
