const express = require("express");
const route = express.Router();
const studentController = require("../controller/student");
const isAuth = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Role } = require("../models/users/shared/user");
const { body, param } = require("express-validator");
const Courses = require("../models/Courses/course");

route.post(
  "/enrollCourse/:id",
  isAuth,
  isRole([Role.student]),
  param("id")
    .isMongoId()
    .custom(async (value, { req }) => {
      const course = await Courses.findById(value);
      if (!course) {
        throw new Error("invalid course");
      }
    }),
  studentController.enrollCourse
);

// view home work of enrolled course
route.get(
  "/homework",
  isAuth,
  isRole([Role.student]),
  studentController.getAllHomework
);

// mark home work as complete

module.exports = route;
