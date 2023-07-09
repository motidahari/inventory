const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const validatePermissionUserEditor = require("../../middleware/validatePermissionUserEditor");
const createLogsProducts = require("./../createLogsProducts");
const moment = require("moment");
const products = require("../../rds/querys/products.js");
const logs = require("../../rds/querys/logs.js");
const locations = require("../../rds/querys/locations.js");

//@router           POST api/products
//@description      Add new product
//@access           Private
router.post(
  "/",
  validatePermissionUserEditor,
  [
    check("productName", "Please include a productName").not().isEmpty(),
    check("locationId", "Please include a locationId").not().isEmpty(),
    check("quantity", "Please include a quantity").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      serialNumber,
      PONumber,
      productName,
      warranty,
      locationId,
      description,
      storage,
      status,
    } = req.body;
    const userCreateAction = req.header("userId");
    try {
      const product = {
        productId: uuidv4(),
        serialNumber: serialNumber?.replace("'", '"'),
        productName: productName?.replace("'", '"'),
        PONumber: PONumber?.replace("'", '"'),
        warranty: warranty,
        locationId: locationId,
      };
      await connection.execute(
        products.createProduct(product),
        async (err, result, fields) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err }] });
          } else if (result.affectedRows > 0) {
            const log = {
              logId: uuidv4(),
              action: "Add",
              userCreateAction,
              description: description?.replace("'", '"'),
              productId: product.productId,
              storage: locationId,
              status: status || "",
            };
            const msgToClient = {
              succeeded: [
                `New products(${product.productName}) is created `,
                `New logsproducts for logsproducts(${log.logId}) is created `,
              ],
              failed: [
                `Failed to Add new logsproducts for logsproducts(${log})`,
              ],
            };
            await createLogsProducts(
              req,
              res,
              log,
              logs.createLogProduct(log),
              msgToClient
            );
          } else {
            return res.status(400).json({
              errors: [{ msg: `Failed to add new product(${productName})` }],
            });
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           PUT api/products
//@description      update product storage
//@access           Private
router.put(
  "/",
  validatePermissionUserEditor,
  [
    check("productId", "Please include a productId").not().isEmpty(),
    check("locationId", "Please include a locationId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { productId, locationId, description, status } = req.body;
    const userCreateAction = req.header("userId");
    let product = {
      productId: productId,
      locationId: locationId,
      description: description,
      newLocation: {
        locationName: "",
        locationId: "",
      },
      oldLocation: {
        locationName: "",
        locationId: locationId,
      },
    };

    try {
      await connection.execute(
        locations.getLocationByProductId(product.productId),
        async (err, location, fields) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err }] });
          } else {
            product.oldLocation.locationName = location[0].locationName;
            product.oldLocation.locationId = location[0].locationId;
            await connection.execute(
              logs.getLogProductByProductId(product.productId),
              async (err, logProduct, fields) => {
                if (err) {
                  return res.status(400).json({ errors: [{ msg: err }] });
                } else {
                  await connection.execute(
                    locations.getLocationNameByLocationId(product.locationId),
                    async (err, location, fields) => {
                      if (err) {
                        return res.status(400).json({ errors: [{ msg: err }] });
                      } else {
                        product.newLocation.locationName =
                          location[0]?.locationName;
                        product.newLocation.locationId =
                          location[0]?.locationId;
                        //Change location to product
                        await connection.execute(
                          products.updateProductLocation(product),
                          async (err, result, fields) => {
                            if (err) {
                              return res
                                .status(400)
                                .json({ errors: [{ msg: err }] });
                            } else if (result.affectedRows > 0) {
                              //create logsproducts for action
                              const log = {
                                logId: uuidv4(),
                                action: `Update location to(${product.newLocation.locationName})`,
                                userCreateAction,
                                description: product.description
                                  ? product.description?.replace("'", '"')
                                  : `Update location ${product.oldLocation.locationName} -> ${product.newLocation.locationName}`,
                                productId: product.productId,
                                storage: product.oldLocation.locationId,
                                status: logProduct[0]?.status,
                              };
                              const msgToClient = {
                                succeeded: [
                                  `${log.action} product(${log.productId}) is Succeeded`,
                                  `create logsproducts for product(${log.productId}) is created `,
                                ],
                                failed: [
                                  `Failed to Add new logsproducts for logsproducts(${log})`,
                                ],
                              };
                              await createLogsProducts(
                                req,
                                res,
                                log,
                                logs.createLogProduct(log),
                                msgToClient
                              );
                            } else {
                              return res.status(400).json({
                                errors: [
                                  {
                                    msg: `Failed to update location of product(${productId}) `,
                                  },
                                ],
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           PUT api/products
//@description      update product
//@access           Private
router.put(
  "/updateProduct",
  validatePermissionUserEditor,
  [
    check("productName", "Please include a productName").not().isEmpty(),
    check("warranty", "Please include a warranty").not().isEmpty(),
    check("locationId", "Please include a locationId").not().isEmpty(),
    check("productId", "Please include a productId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      productId,
      serialNumber,
      PONumber,
      status,
      productName,
      warranty,
      description,
      locationId,
    } = req.body;

    const userCreateAction = req.header("userId");
    let oldLocation = {
      locationName: "",
      locationId: "",
    };
    let product = {
      productId: productId,
      locationId: locationId,
      serialNumber: serialNumber,
      PONumber: PONumber,
      productName: productName,
      warranty: warranty,
      status: status,
      newLocation: {
        locationName: "",
        locationId: "",
      },
      oldLocation: {
        locationName: "",
        locationId: locationId,
      },
    };
    try {
      await connection.execute(
        locations.getLocationByProductId(product.productId),
        async (err, location, fields) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err }] });
          } else {
            product.oldLocation.locationName = location[0].locationName;
            product.oldLocation.locationId = location[0].locationId;

            await connection.execute(
              logs.getLogProductByProductId(product.productId),
              async (err, logProduct, fields) => {
                if (err) {
                  return res.status(400).json({ errors: [{ msg: err }] });
                } else {
                  await connection.execute(
                    locations.getLocationNameByLocationId(product.locationId),
                    async (err, resultLocation, fields) => {
                      if (err) {
                        return res.status(400).json({ errors: [{ msg: err }] });
                      } else {
                        product.newLocation.locationName =
                          resultLocation[0].locationName;
                        product.newLocation.locationId =
                          resultLocation[0].locationId;
                        product.locationId = resultLocation[0].locationId;
                        //Change location to product
                        await connection.execute(
                          products.updateProduct(product),
                          async (err, result, fields) => {
                            if (err) {
                              return res
                                .status(400)
                                .json({ errors: [{ msg: err }] });
                            } else if (result.affectedRows > 0) {
                              const log = {
                                logId: uuidv4(),
                                action: `Update product details(${product.productName?.replace(
                                  "'",
                                  '"'
                                )})`,
                                userCreateAction,
                                description: product.description
                                  ? product.description?.replace("'", '"')
                                  : `Update location ${product.oldLocation.locationName} -> ${product.newLocation.locationName}`,
                                productId: product.productId,
                                storage: product.oldLocation.locationId,
                                status:
                                  product?.status || logProduct[0]?.status,
                              };
                              const msgToClient = {
                                succeeded: [
                                  `${log.action} product(${log.productId}) is Succeeded`,
                                  `create logsproducts for product(${log.productId}) is created `,
                                ],
                                failed: [
                                  `Failed to Add new logsproducts for logsproducts(${log})`,
                                ],
                              };
                              await createLogsProducts(
                                req,
                                res,
                                log,
                                logs.createLogProduct(log),
                                msgToClient
                              );
                            } else {
                              return res.status(400).json({
                                errors: [
                                  {
                                    msg: `Failed to update location of product(${productId}) `,
                                  },
                                ],
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           DELETE api/products
//@description      Delete product by productId
//@access           Private
router.delete(
  "/",
  validatePermissionUserEditor,
  [check("productId", "productId is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { productId, description, storage } = req.body;
    const userCreateAction = req.header("userId");
    try {
      await connection.execute(
        logs.getLogProductByProductId(productId),
        async (err, logProduct, fields) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err }] });
          } else {
            //Delete product from products
            await connection.execute(
              products.deleteProduct({ productId: productId }),
              async (err, result, fields) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ errors: [{ msg: "Product is not exist" }] });
                } else if (result.affectedRows > 0) {
                  const log = {
                    logId: uuidv4(),
                    action: "Delete",
                    userCreateAction,
                    description: description?.replace("'", '"') || "",
                    productId: productId,
                    storage: logProduct[0]?.storage || "",
                    status: logProduct[0]?.status || "",
                  };
                  const msgToClient = {
                    succeeded: [
                      `${log.action} product(${log.productId}) is deleted from DB`,
                      `create logsproducts for product(${log.productId}) is created `,
                    ],
                    failed: [
                      `Failed to Add new logsproducts for logsproducts(${log})`,
                    ],
                  };
                  await createLogsProducts(
                    req,
                    res,
                    log,
                    logs.createLogProduct(log),
                    msgToClient
                  );
                } else {
                  return res.status(400).json({
                    errors: [
                      {
                        msg: `Failed to delete product(${productId}) from products`,
                      },
                    ],
                  });
                }
              }
            );
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/products
//@description      Get list products
//@access           Public
router.get("/", auth, async (req, res) => {
  try {
    await connection.execute(
      products.getAllProducts(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/products
//@description      Get list products
//@access           Public
router.get("/getProductById/:productId", auth, async (req, res) => {
  const { productId } = req.params;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await connection.execute(
      products.getProductByProductId(productId),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result[0]);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/products
//@description      Get list products by locationId
//@access           Public
router.get("/:locationId", auth, async (req, res) => {
  const { locationId } = req.params;
  try {
    await connection.execute(
      products.getProductByLocationId(locationId),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           PUT api/products
//@description      Get all gaps
//@access           Private
router.put(
  "/getGaps",
  auth,
  [check("locationId", "Please include a locationId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { locationId } = req.body;
    try {
      await connection.execute(
        products.getGapsByLocationId(locationId),
        async (err, result, fields) => {
          if (err) {
            return res.status(400).json({ errors: [{ msg: err }] });
          } else {
            let i = 0;
            const result2 = result.map((row) => {
              return {
                ...row,
                gapId: i++,
              };
            });
            res.send(result2);
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           POST api/products
//@description      update product storage
//@access           Private
router.post(
  "/addGapToLocation",
  auth,
  [
    check("locationId", "Please include a locationId").not().isEmpty(),
    check("products", "Please include a products").isArray(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { locationId, listProducts } = req.body;
    try {
      arr.forEach(async (gap) => {
        await connection.execute(
          products.createGapToLocation({ ...gap, locationId: locationId }),
          async (err, result, fields) => {
            if (err) {
              return res.status(400).json({ errors: [{ msg: err }] });
            }
          }
        );
      });
      return res.send({ msg: "GAP added" });
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           GET api/products
//@description      Get list products by locationId or countryId or search
//@access           Public
router.put("/getByParams", auth, async (req, res) => {
  const { locationId, countryId, search } = req.body;
  try {
    await connection.execute(
      products.getProductsByParams(locationId, countryId, search),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
