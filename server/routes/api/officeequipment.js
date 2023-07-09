const express = require("express");
const router = express.Router();
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const validatePermissionUserAdmin = require("../../middleware/validatePermissionUserAdmin");
const officeequipment = require("../../rds/querys/officeequipment.js");

//@router           POST api/officeEquipment
//@description      Add new officeEquipment
//@access           Private
router.post(
  "/",
  validatePermissionUserAdmin,
  [check("equipmentName", "Please include a equipmentName").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { equipmentName } = req.body;
    const equipment = {
      equipmentId: uuidv4(),
      equipmentName: equipmentName,
    };
    const userCreateAction = req.header("userId");
    try {
      //Check if user is exist
      await connection.execute(
        officeequipment.createOfficeEquipment(),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            return res.send({
              msg: `New equipment(${equipment.equipmentName}) is created `,
            });
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "Failed to add new equipment" }] });
          }
        }
      );
    } catch (err) {
      return res.status(500).send("Server error");
    }
  }
);

//@router           DELETE api/officeEquipment
//@description      Delete officeEquipment by id
//@access           Private
router.delete(
  "/",
  validatePermissionUserAdmin,
  [check("equipmentId", "equipmentId is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { equipmentId } = req.body;
    try {
      const query = `SELECT * FROM inventory.officeequipment WHERE equipmentId = '${equipmentId}';`;
      await connection.execute(query, async (err, result, fields) => {
        if (err) return res.status(400).json({ errors: [{ msg: err }] });
        if (result.length > 0) {
          const equipment = {
            equipmentId,
            equipmentName: result[0].equipmentName,
          };
          const query = `DELETE FROM inventory.officeequipment WHERE equipmentId = '${equipmentId}'`;
          //Check if user is exist
          await connection.execute(query, async (err, result, fields) => {
            if (err) return res.status(400).json({ errors: [{ msg: err }] });
            else if (result.affectedRows > 0) {
              return res.send({
                msg: `Equipment ${equipment.equipmentName} deleted`,
              });
            } else {
              return res
                .status(400)
                .json({ errors: [{ msg: "Equipment is not found" }] });
            }
          });
        } else {
          return res
            .status(400)
            .json({ errors: [{ msg: "Equipment is not exist" }] });
        }
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/officeEquipment
//@description      Get list officeEquipment
//@access           Public
router.get("/", validatePermissionUserAdmin, async (req, res) => {
  try {
    const query = `SELECT * FROM inventory.officeequipment;`;
    await connection.execute(query, async (err, result, fields) => {
      if (err) return res.status(400).json({ errors: [{ msg: err }] });
      else res.send(result);
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
