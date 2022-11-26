const express = require("express");
const route = express.Router();
const shared = require("../../controller/shared/shared");
const { Role } = require("../../models/users/shared/user");
const isRole = require("../../middleware/isRole");
const isAuth = require("../../middleware/isAuth");
const { body } = require("express-validator");

// edit user profile
route.patch(
  "edit",
  isAuth,
  isRole([Role.student, Role.teacher]),
  body("name").optional().isString().withMessage("Enter Valid Name"),
  body("email").optional().isEmail().withMessage("enter Valid Email"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password Must Be 8 Letter"),
  shared.EditUser
);
//return current  user
route.get("/me", isAuth, shared.me);
module.exports = route;
