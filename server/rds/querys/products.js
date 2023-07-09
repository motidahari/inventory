const moment = require("moment");

const products = {
  createProduct: (product) => {
    return `INSERT INTO inventory.products (productId, serialNumber, productName, PONumber, warranty, date, locationId) VALUES ('${product.productId}', '${product.serialNumber}', '${product.productName}', '${product.PONumber}', '${product.warranty}', NOW(), '${product.locationId}');`;
  },
  getAllProducts: () => {
    return `SELECT
                    *
                FROM
                    inventory.products
                INNER JOIN inventory.locations ON inventory.locations.locationId = inventory.products.locationId
                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId 
                WHERE products.deleted = '0'
                ORDER BY inventory.products.date DESC;`;
  },
  deleteProduct: (productId) => {
    return `DELETE FROM inventory.products WHERE productId = '${productId}';`;
  },
  updateProduct: (product) => {
    return `UPDATE inventory.products SET 
                    locationId = '${product.locationId}', 
                    serialNumber = '${product.serialNumber?.replace("'", '"')}',
                    PONumber = '${product?.PONumber?.replace("'", '"')}',
                    productName = '${product?.productName?.replace("'", '"')}',
                    warranty = '${moment(product?.warranty).format(
                      "YYYY/MM/DD"
                    )}' 
                WHERE (productId = '${product?.productId}');`;
  },
  updateProductLocation: (product) => {
    return `UPDATE inventory.products SET locationId = '${product.locationId}' WHERE (productId = '${product.productId}');`;
  },
  deleteProduct: (product) => {
    return `UPDATE inventory.products 
                SET deleted = 1 
                WHERE productId = '${product.productId}';`;
  },
  getProducts: () => {
    return `SELECT 
                    products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, products.date,
                    locations.locationName , locations.locationId,
                    countries.countryName , countries.countryId
                FROM inventory.products 
                INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                WHERE products.deleted = '0'
                ORDER BY inventory.products.date DESC ;`;
  },
  getProductsByParams: (locationId, countryId, search) => {
    let conditions = "";
    if (locationId?.length) {
      conditions += ` inventory.products.locationId = '${locationId}'`;
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
                    products.serialNumber LIKE '%${search}%' OR
                    products.productName LIKE '%${search}%' OR
                    products.PONumber LIKE '%${search}%' OR
                    locations.locationName LIKE '%${search}%' OR
                    countries.countryName LIKE '%${search}%'
                )`;
      } else {
        conditions += ` ( 
                    products.serialNumber LIKE '%${search}%' OR
                    products.productName LIKE '%${search}%' OR
                    products.PONumber LIKE '%${search}%' OR
                    locations.locationName LIKE '%${search}%' OR
                    countries.countryName LIKE '%${search}%'
                )`;
      }
    }

    let query = `SELECT *
                        FROM (
                            SELECT
                                products.id, products.productId, products.deleted, products.serialNumber, products.productName,
                                products.PONumber, products.warranty, products.date, locations.locationName, locations.locationId, 
                                countries.countryName, countries.countryId
                            FROM
                                inventory.products
                                INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                                ${
                                  conditions?.length
                                    ? `WHERE ${conditions} `
                                    : ""
                                }
                            ) AS products
                        WHERE
                            products.deleted != '1'
                        ORDER BY inventory.products.date DESC;`;
    return query;
  },
  getProductByProductId: (productId) => {
    return `SELECT 
                    products.productId , products.serialNumber , products.productName , products.PONumber, products.warranty, products.date,
                    locations.locationName , locations.locationId,
                    countries.countryName , countries.countryId,
                    logsproducts.logId , logsproducts.action , logsproducts.description , logsproducts.storage , logsproducts.status , logsproducts.date,
                    users.name, users.email
                FROM inventory.products 
                
                INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                INNER JOIN inventory.logsproducts ON inventory.logsproducts.productId = inventory.products.productId
                INNER JOIN inventory.users ON inventory.users.userId = inventory.logsproducts.userCreateAction 
                WHERE products.productId = '${productId}' AND products.deleted = '0' 
                ORDER BY inventory.products.date DESC LIMIT 1;`;
  },
  getProductByLocationId: (locationId) => {
    return `SELECT 
                    products.productId ,products.deleted, products.serialNumber , products.productName , products.PONumber, products.warranty, products.date,
                    locations.locationName , locations.locationId,
                    countries.countryName , countries.countryId
                FROM inventory.products 
                INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                WHERE inventory.products.locationId = '${locationId}' AND products.deleted = '0';`;
  },
  getGapsByLocationId: (locationId) => {
    return `SELECT 
                    countProducts.inLocation AS quantityInLocation, 
                    IFNULL(gap.quantity, 0) AS quantity, 
                    IFNULL((countProducts.inLocation - gap.quantity), countProducts.inLocation) AS gap, 
                    countProducts.productName 
                
                FROM inventory.locations 
                                            
                LEFT JOIN (SELECT 
                            COUNT(inventory.products.productName) AS inLocation, 
                            products.locationId, 
                            products.productName   
                        FROM products 
                        WHERE products.deleted = '0' AND inventory.products.locationId = '${locationId}' 
                        GROUP BY inventory.products.productName) as countProducts 
                ON inventory.locations.locationId = '${locationId}' OR countProducts.locationId = inventory.locations.locationId 
                                        
                LEFT JOIN (SELECT  * 
                            FROM inventory.gaps  
                            WHERE inventory.gaps.locationId = '${locationId}') AS gap 
                ON  gap.productName = countProducts.productName AND gap.locationId =  countProducts.locationId 
                
                WHERE inventory.locations.locationId = '${locationId}';`;
  },
  createGapToLocation: (gap) => {
    return `INSERT INTO inventory.gaps(locationId, productName, quantity) VALUES('${gap.locationId}', '${gap.productName}', '${gap.quantity}'); `;
  },
  getGapsByParams: (locationId, countryId, search) => {
    if (search?.length && locationId?.length && countryId?.length) {
      //search by locationId or countryId or search
      return `SELECT *
                        FROM (
                            SELECT
                            products.id, products.productId, products.deleted, products.serialNumber, products.productName, products.PONumber, products.warranty, products.date, locations.locationName, locations.locationId, countries.countryName, countries.countryId
                            FROM
                                inventory.products
                                INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                                INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                            WHERE
                                    (products.serialNumber LIKE '%${search}%' OR
                                    products.productName LIKE '%${search}%' OR
                                    products.PONumber LIKE '%${search}%' OR
                                    locations.locationName LIKE '%${search}%' OR
                                    countries.countryName LIKE '%${search}%') AND
                                    (inventory.products.locationId = '${locationId}' OR
                                    inventory.countries.countryId = '${countryId}')) AS products
                        WHERE
                            products.deleted != '1'
                        ORDER BY products.date DESC;`;
    } else if (
      !search?.length == 0 &&
      (locationId?.length || countryId?.length)
    ) {
      //search by locationId or countryId
      return `SELECT *
                    FROM (
                        SELECT
                            products.id,
                            products.productId,
                            products.deleted,
                            products.serialNumber,
                            products.productName,
                            products.PONumber,
                            products.warranty,
                            products.date,
                            locations.locationName,
                            locations.locationId,
                            countries.countryName,
                            countries.countryId
                        FROM
                            inventory.products
                        INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                        INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                        WHERE
                            inventory.products.locationId = '${locationId}'
                            OR inventory.countries.countryId = '${countryId}') AS products
                    WHERE
                        products.deleted != '1'
                    ORDER BY products.date DESC;`;
    } //search by search
    else if (search?.length == 0 && !locationId?.length && !countryId?.length) {
      return `SELECT * 
                    FROM (SELECT
                            products.id,
                            products.productId,
                            products.deleted,
                            products.serialNumber,
                            products.productName,
                            products.PONumber,
                            products.warranty,
                            products.date,
                            locations.locationName,
                            locations.locationId,
                            countries.countryName,
                            countries.countryId
                        FROM
                            inventory.products
                            INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                            INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                        WHERE
                            products.serialNumber LIKE '%${search}%'
                            OR products.productName LIKE '%${search}%'
                            OR products.PONumber LIKE '%${search}%'
                            OR locations.locationName LIKE '%${search}%'
                            OR countries.countryName LIKE '%${search}%') AS products
                WHERE
                    products.deleted != '1'
                ORDER BY products.date DESC;`;
    } else {
      //get all products
      return `SELECT
                        products.productId,
                        products.deleted,
                        products.serialNumber,
                        products.productName,
                        products.PONumber,
                        products.warranty,
                        products.date,
                        locations.locationName,
                        locations.locationId,
                        countries.countryName,
                        countries.countryId
                    FROM
                        inventory.products
                        INNER JOIN inventory.locations ON locations.locationId = inventory.products.locationId
                        INNER JOIN inventory.countries ON inventory.countries.countryId = inventory.locations.countryId
                    WHERE
                        products.deleted != 1
                    ORDER BY products.date DESC;`;
    }
  },
};
module.exports = products;
