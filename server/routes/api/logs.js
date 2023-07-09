const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const auth = require("../../middleware/auth");
const logs = require("../../rds/querys/logs.js");

//@router           GET api/logs/products
//@description      Get list of logs by products
//@access           Public
router.get("/products", auth, async (req, res) => {
  try {
    await connection.execute(
      logs.getLogsProducts(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/logs/AmplifierTraffic
//@description      Get list of logs by products By Params: locationId or countryId or search
//@access           Public
router.put("/getAllLogsProductByParams", auth, async (req, res) => {
  const { search, locationId, countryId } = req.body;
  try {
    await connection.execute(
      logs.getAllLogsProductByParams(search, locationId, countryId),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/logs/AmplifierTraffic
//@description      Get list of logs by products AmplifierTraffic
//@access           Public
router.get("/amplifierTraffic", auth, async (req, res) => {
  try {
    await connection.execute(
      logs.getLogsAmplifierTraffic(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/logs/AmplifierTraffic
//@description      Get list of logs by products Amplifiers Traffic By Params: locationId or countryId or search
//@access           Public
router.put(
  "/getAllLogsProductAmplifiersTrafficByParams",
  auth,
  async (req, res) => {
    const { search, locationId, countryId } = req.body;
    try {
      await connection.execute(
        logs.getLogsAmplifierTrafficByParams(search, locationId, countryId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else res.send(result);
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/logs/monitoringAmplifiers
//@description      Get list of logs by products monitoringAmplifiers
//@access           Public
router.get("/monitoringAmplifiers", auth, async (req, res) => {
  try {
    await connection.execute(
      logs.getLogsMonitoringAmplifiers(),
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

//@router           GET api/logs/AmplifierTraffic
//@description      Get list of logs by products Amplifiers Monitoring By Params: locationId or countryId or search
//@access           Public
router.put(
  "/getAllLogsProductAmplifiersMonitoringByParams",
  auth,
  async (req, res) => {
    const { locationId, countryId, search } = req.body;
    try {
      await connection.execute(
        logs.getLogsMonitoringAmplifiersByParams(search, locationId, countryId),
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
  }
);

//@router           GET api/logs/users
//@description      Get list of logs by user id
//@access           Public
router.get("/users", auth, async (req, res) => {
  try {
    await connection.execute(
      logs.getLogsUsers()(),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           GET api/logs/products
//@description      Get list of logs by locationId
//@access           Public
router.get("/:locationId", auth, async (req, res) => {
  const { locationId } = req.params;
  try {
    await connection.execute(
      logs.getLogsByLocationId(locationId),
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
