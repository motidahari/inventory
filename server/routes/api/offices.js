const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const validatePermissionUserAdmin = require("../../middleware/validatePermissionUserAdmin");
const offices = require("../../rds/querys/offices.js");
const employees = require("../../rds/querys/employees");

//@router           POST api/offices
//@description      Add new Office
//@access           Private
router.post(
  "/",
  validatePermissionUserAdmin,
  [check("officeName", "office is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { officeName } = req.body;
    try {
      const office = {
        officeId: uuidv4(),
        officeName: officeName,
      };
      //Create new office
      await connection.execute(
        offices.createOffice(office),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else {
            res.send(office);
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/offices
//@description      Get all Offices
//@access           Private
router.get("/", auth, async (req, res) => {
  try {
    await connection.execute(
      offices.getAllOffice(),
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

//@router           DELETE api/offices
//@description      Delete Office by OfficeId
//@access           Private
router.delete(
  "/",
  validatePermissionUserAdmin,
  [check("officeId", "officeId is required").not().isEmpty()],
  async (req, res) => {
    try {
      const { officeId, officeName } = req.body;

      await connection.execute(
        employees.deleteOfficeEquipmentForEmployeesByOfficeId(officeId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
        }
      );

      await connection.execute(
        employees.deleteEmployeesByOfficeId(officeId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
        }
      );

      await connection.execute(
        offices.deleteOfficeByOfficeId(officeId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            res.json("Office deleted");
          } else {
            res
              .status(400)
              .json({ errors: [{ msg: "Office does not exist" }] });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
