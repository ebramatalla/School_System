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
route.get(
  "/studentInCourse/:id",
  isAuth,
  isRole([Role.teacher]),
  teacherRoute.studentInCourse
);

route.post("/addScore/:id", teacherRoute.addPracticalScore);

route.post("/addFinal/:id", teacherRoute.addFinalScore);

module.exports = route;
