const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const validatePermissionUserAdmin = require("../../middleware/validatePermissionUserAdmin");
const locations = require("../../rds/querys/locations.js");

//@router           POST api/locations
//@description      Add new locations
//@access           Private
router.post(
  "/",
  validatePermissionUserAdmin,
  [
    check("locationName", "Please include a locationName").not().isEmpty(),
    check("countryId", "Please include a countryId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { locationName, countryId } = req.body;
    const location = {
      locationId: uuidv4(),
      locationName,
      countryId,
    };
    try {
      //Check if user is exist
      await connection.execute(
        locations.createLocation(location),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            return res.send([
              { msg: `New location(${locationName}) is created ` },
            ]);
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "Failed to Add new location" }] });
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           DELETE api/locations
//@description      Delete location by id
//@access           Private
router.delete(
  "/",
  validatePermissionUserAdmin,
  [check("locationId", "locationId is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { locationId } = req.body;
    try {
      await connection.execute(
        locations.getLocationByLocationId(locationId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.length > 0) {
            //Check if locations is exist
            await connection.execute(
              locations.deleteLocation(locationId),
              async (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else if (result.affectedRows > 0) {
                  return res.send({ msg: `Location ${locationId} deleted` });
                }
              }
            );
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "Location is not exist" }] });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/locations
//@description      Get list locations
//@access           Public
router.get("/", auth, async (req, res) => {
  try {
    await connection.execute(
      locations.getAllLocations(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/locations
//@description      create countries in db
//@access           Public
router.get("/createCountriesAndLocations", async (req, res) => {
  try {
    const countries = [
      {
        id: 0,
        countryId: "d7760ae-56a3-4e9c-9173-a9bfd43388a9",
        countryName: "Australia",
        locations: [],
      },

      {
        id: 1,
        countryId: "428ece74-5fa0-4b99-8321-342abd90101c",
        countryName: "Israel",
        locations: [
          { locationName: "Storage IL 1" },
          { locationName: "Storage IL 2" },
          { locationName: "RnD Lab" },
          { locationName: "IT Lab" },
        ],
      },
      {
        id: 2,
        countryId: "1fe9aad8-6203-42e6-8c27-3d18d96343f9",
        countryName: "US",
        locations: [
          { locationName: "CHI1" },
          { locationName: "CHI2" },
          { locationName: "CHI3" },
          { locationName: "Storage CHI" },
          { locationName: "CME Data Center" },
          { locationName: "NYC1" },
          { locationName: "NYC3" },
          { locationName: "NY4 Data Center" },
          { locationName: "MAT Relay site" },
          { locationName: "NYC Relay site 1" },
          { locationName: "NYC Relay site 2" },
        ],
      },
      {
        id: 3,
        countryId: "1fe9aad8-6203-42e6-8c27-3d18d96353f9",
        countryName: "Shanghai",
        locations: [{ locationName: "SHX Data Center" }],
      },
      {
        id: 4,
        countryId: "d39f34a0-5c06-43fc-9cdd-bb0409e441a2",
        countryName: "UK",
        locations: [
          { locationName: "LDN3" },
          { locationName: "LD4 Data Center" },
          { locationName: "LDN1" },
          { locationName: "HBF Relay site" },
        ],
      },
      {
        id: 5,
        countryId: "cfc0de37-6e41-4022-97f4-e6297d832d10",
        countryName: "Germany",
        locations: [
          { locationName: "FRK3" },
          { locationName: "FR2 Data Center" },
          { locationName: "Storage New Telco" },
          { locationName: "Huremberg Relay site" },
        ],
      },
      {
        id: 6,
        countryId: "2de52073-3ca0-4c75-a568-73ba2e6346ad",
        countryName: "Japan",
        locations: [
          { locationName: "TOK1" },
          { locationName: "TOK3" },
          { locationName: "CC2 Data Center" },
          { locationName: "TOK4" },
          { locationName: "MYA Softbank Data Center" },
        ],
      },
      {
        id: 7,
        countryId: "ba00a0df-433c-4ea1-b97a-980756727513",
        countryName: "Singapore",
        locations: [],
      },
      {
        id: 8,
        countryId: "7b5b0d36-b0a8-4c3d-b11c-62f78c3bfda1",
        countryName: "Italy",
        locations: [],
      },
      {
        id: 9,
        countryId: "ef885505-932a-4ba0-9516-2686eadb0c32",
        countryName: "Brazil",
        locations: [],
      },
    ];

    countries?.forEach(async (country) => {
      await connection.execute(
        locations.createCountry(country),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else {
            country?.locations?.forEach(async (location) => {
              await connection.execute(
                locations.createLocation(location),
                async (err, result, fields) => {
                  if (err) {
                    return res.status(400).json({ errors: [{ msg: err }] });
                  } else {
                    res.status(200).send("location of country created in db");
                  }
                }
              );
            });
          }
        }
      );
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/locations
//@description      get list of locations by countryId
//@access           Public
router.put("/getLocationsByCountryId", auth, async (req, res) => {
  try {
    const { countryId } = req.body;
    await connection.execute(
      locations.getLocationsByCountryId(countryId),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/locations
//@description      Get list locations
//@access           Public
router.get("/countries", auth, async (req, res) => {
  try {
    await connection.execute(
      locations.getCountries(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
