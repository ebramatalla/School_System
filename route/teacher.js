const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const teacherRoute = require("../controller/teacher");
const isAuth = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Role } = require("../models/users/shared/user");

route.post(
  "/teacher/:id",
  isAuth,
  isRole([Role.teacher]),
  teacherRoute.addHomeWork
);

// see all student enrolled in my course

module.exports = route;
