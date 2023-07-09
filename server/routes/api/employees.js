const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const validatePermissionUserEditor = require("../../middleware/validatePermissionUserEditor");
const employees = require("../../rds/querys/employees.js");

//@router           POST api/employees
//@description      Add new employee
//@access           Private
router.post(
  "/",
  validatePermissionUserEditor,
  [
    check("employeeName", "Please include a employeeName").not().isEmpty(),
    check("officeId", "Please include a officeName").not().isEmpty(),
    check("desktopComputer", "Please include a officeName").not().isEmpty(),
    check("dockingStation", "Please include a officeName").not().isEmpty(),
    check("headset", "Please include a officeName").not().isEmpty(),
    check("ipPhone", "Please include a officeName").not().isEmpty(),
    check("laptop", "Please include a officeName").not().isEmpty(),
    check("printer", "Please include a officeName").not().isEmpty(),
    check("screen", "Please include a officeName").not().isEmpty(),
    check("tv", "Please include a officeName").not().isEmpty(),
    check("webCamera", "Please include a officeName").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      employeeName,
      officeId,
      desktopComputer,
      dockingStation,
      headset,
      ipPhone,
      laptop,
      printer,
      screen,
      tv,
      webCamera,
    } = req.body;

    const employee = {
      employeeName,
      officeId,
      desktopComputer,
      dockingStation,
      headset,
      ipPhone,
      laptop,
      printer,
      screen,
      tv,
      webCamera,
      employeeId: uuidv4(),
    };
    try {
      //Create new employee
      await connection.execute(
        employees.createEmployee(employee),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            // Add equipment to employee
            await connection.execute(
              employees.createOfficeEquipmentForEmployees(employee),
              async (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else if (result.affectedRows > 0) {
                  return res.send({
                    msg: `New employee(${employee.employeeName}) is created `,
                  });
                } else {
                  return res.status(400).json({
                    errors: `Failed to Add new employee(${employee.employeeName})`,
                  });
                }
              }
            );
          } else {
            return res
              .status(400)
              .json({ errors: "Failed to Add new employee" });
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           PUT api/employees
//@description      update employee equipments
//@access           Private
router.put(
  "/",
  validatePermissionUserEditor,
  [
    check("employeeId", "Please include a employeeId").not().isEmpty(),
    check("employeeName", "Please include a employeeName").not().isEmpty(),
    check("officeId", "Please include a officeName").not().isEmpty(),
    check("desktopComputer", "Please include a officeName").not().isEmpty(),
    check("dockingStation", "Please include a officeName").not().isEmpty(),
    check("headset", "Please include a officeName").not().isEmpty(),
    check("ipPhone", "Please include a officeName").not().isEmpty(),
    check("laptop", "Please include a officeName").not().isEmpty(),
    check("printer", "Please include a officeName").not().isEmpty(),
    check("screen", "Please include a officeName").not().isEmpty(),
    check("tv", "Please include a officeName").not().isEmpty(),
    check("webCamera", "Please include a officeName").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      employeeId,
      employeeName,
      officeId,
      desktopComputer,
      dockingStation,
      headset,
      ipPhone,
      laptop,
      printer,
      screen,
      tv,
      webCamera,
    } = req.body;

    const employee = {
      employeeId,
      employeeName,
      officeId,
      desktopComputer,
      dockingStation,
      headset,
      ipPhone,
      laptop,
      printer,
      screen,
      tv,
      webCamera,
    };

    try {
      //Create new employee
      await connection.execute(
        employees.updateEmployee(employee),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            await connection.execute(
              employees.updateOfficeEquipmentForEmployees(employee),
              async (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else if (result.affectedRows > 0) {
                  return res.send({
                    msg: `Update Employee is Succeeded `,
                  });
                } else {
                  return res.status(400).json({
                    errors: `Failed to Update Employee(${employee.employeeName})`,
                  });
                }
              }
            );
          } else {
            return res.status(400).json({
              errors: `Failed to Update employee(${employee.employeeId})`,
            });
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           PUT api/employees
//@description      get employees by params:
//@access           Private
router.put("/getEmployeesByParams", auth, async (req, res) => {
  try {
    let query = ``;
    const { officeId, search } = req.body;
    await connection.execute(
      employees.getEmployeesByParams(search, officeId),
      async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        else res.send(result);
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//@router           DELETE api/employees
//@description      Delete employees by id
//@access           Private
router.delete(
  "/",
  validatePermissionUserEditor,
  [check("employeeId", "employeeId is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { employeeId } = req.body;
    try {
      //Delete officeequipmentforemployees
      await connection.execute(
        employees.deleteOfficeEquipmentForEmployees(employeeId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            //Delete employees
            await connection.execute(
              employees.deleteEmployee(employeeId),
              async (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else if (result.affectedRows > 0) {
                  return res.send({
                    msg: `DELETE employee by employeeID(${employeeId}) `,
                  });
                } else {
                  return res.status(400).json({
                    errors: `employee by employeeId(${employeeId}) is not found`,
                  });
                }
              }
            );
          } else {
            return res.status(400).json({
              errors: [
                {
                  msg: `officeequipmentforemployees by employeeId(${employeeId}) is not found`,
                },
              ],
            });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/employees
//@description      Get list employees
//@access           Public
router.get("/", auth, async (req, res) => {
  try {
    await connection.execute(
      employees.getEmployees(),
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
