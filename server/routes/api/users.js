const express = require("express");
const connection = require("../../config/DB");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const config = require("../../config/default.json");
const jwt = require("jsonwebtoken");
const validatePermissionUserAdmin = require("../../middleware/validatePermissionUserAdmin");
const createLogsUsers = require("./../createLogsUsers");
const users = require("../../rds/querys/users.js");
const router = express.Router();

//@router           POST api/users
//@description      Register user
//@access           Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 6  or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, name, password } = req.body;
    try {
      //Check if user is exist
      await connection.execute(
        users.getUserByEmail({ email: email }),
        async (err, result, fields) => {
          if (err)
            return res
              .status(400)
              .json({ errors: "Error when get user by email" });
          if (result.length > 0 && result[0].email === email.toLowerCase()) {
            return res.status(400).json({ errors: [{ msg: "User exist" }] });
          } else {
            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);
            const user = {
              userId: uuidv4(),
              name: name,
              email: email,
              password: encryptedPassword,
            };
            //Save user
            await connection.execute(
              users.createUser(user),
              (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else {
                  res.json({ msg: "User created" });
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

//@router           POST api/users
//@description      login user
//@access           Public
router.post(
  "/login",
  [
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 6  or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      //Check if user is exist
      await connection.execute(
        users.getUserByEmail({ email: email }),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.length > 0) {
            if (result[0].permission === "") {
              return res.status(400).json({
                errors: [
                  {
                    msg: "The administrator has not yet authorized this user, please contact your organization manager",
                  },
                ],
              });
            }
            let user = {
              id: result[0].userId,
              email: result[0].email,
              name: result[0].name,
              permission: result[0].permission,
              token: "",
            };
            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            if (
              result[0].email.toLowerCase() === email.toLowerCase() &&
              bcrypt.compareSync(password, result[0].password)
            ) {
              //Return jsonwebToken
              const payLoad = {
                id: result[0].userId,
                email: result[0].email,
                name: result[0].name,
                permission: result[0].permission,
              };
              jwt.sign(
                payLoad,
                config["jwtSecret"],
                { expiresIn: 360000 },
                (err, token) => {
                  if (err)
                    return res.status(400).json({ errors: [{ msg: err }] });
                  else {
                    user.token = token;
                    return res.json({ user });
                  }
                }
              );
            } else {
              return res
                .status(400)
                .json({ errors: [{ msg: "User authentication failed" }] });
            }
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "The user is not exist" }] });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           DELETE api/users
//@description      Delete user
//@access           Private
router.delete(
  "/",
  validatePermissionUserAdmin,
  [check("userId", "Please include a valid userId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.body;
    try {
      //Check if user is exist
      await connection.execute(
        users.deleteUser(userId),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          else if (result.affectedRows > 0) {
            res.json({ msg: "User deleted" });
            await createLogsUsers(req, res, userId, "User deleted ", {
              msg: "User deleted",
            });
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "User is not exist" }] });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           PUT api/users
//@description      Update user
//@access           Public
router.put(
  "/",
  [
    check("userId", "userId is required").not().isEmpty(),
    check("name", "Name is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6  or more characters"
    ).isLength({ min: 6 }),
  ],
  validatePermissionUserAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, email, name, password, permission } = req.body;
    let user = {
      userId: userId,
      email: email,
      name: name,
      password: password,
      permission: permission,
    };
    try {
      //Check if user is exist
      await connection.execute(
        users.getUserByEmailAndUserId(user),
        async (err, result, fields) => {
          if (err) return res.status(400).json({ errors: [{ msg: err }] });
          if (result.length > 0 && result[0].email === email.toLowerCase()) {
            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);
            user.password = encryptedPassword;
            //Update user
            await connection.execute(
              users.updateUser(user),
              (err, result, fields) => {
                if (err)
                  return res.status(400).json({ errors: [{ msg: err }] });
                else {
                  return res.send({ msg: "User updated " });
                }
              }
            );
          } else {
            return res
              .status(400)
              .json({ errors: [{ msg: "User is not exist" }] });
          }
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           UPDATE api/users
//@description      Confirm user by admin with some permission
//@access           Private
router.put(
  "/updateUserPermission",
  validatePermissionUserAdmin,
  [
    check("userId", "userId is required").not().isEmpty(),
    check("permission", "permission is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, permission } = req.body;
    const user = {
      userId: userId,
      permission: permission,
    };
    const permissions = ["Admin", "Editor", "Viewer"];
    try {
      if (permissions.includes(permission)) {
        await connection.execute(
          users.updateUserPermission(user),
          async (err, result, fields) => {
            if (err) return res.status(400).json({ errors: [{ msg: err }] });
            else if (result.affectedRows > 0) {
              return res.send({ msg: `User permission updated ` });
            } else {
              return res
                .status(400)
                .json({ errors: [{ msg: "result.changedRows < 0" }] });
            }
          }
        );
      } else {
        res.status(400).json({ errors: [{ msg: "permission is not valid" }] });
      }
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@router           GET api/users
//@description      get all users awaiting administrator approval
//@access           Private
router.get(
  "/getUnapprovedUsers",
  validatePermissionUserAdmin,
  async (req, res) => {
    try {
      await connection.execute(
        users.getUnapprovedUsers(),
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

//@router           GET api/users
//@description      get all users
//@access           Private
router.get("/getAllUsers", validatePermissionUserAdmin, async (req, res) => {
  try {
    await connection.execute(
      users.getAllUsers(),
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
