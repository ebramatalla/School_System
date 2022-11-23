const express = require("express");
const route = express.Router();
const { body, param } = require("express-validator");
const teacherRoute = require("../controller/teacher");
const isAuth = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Role } = require("../models/users/shared/user");
const Courses = require("../models/Courses/course");
const Student = require("../models/users/student");

// validate course to use it in route
const corseValidator = [
  param("id")
    .isMongoId()
    .custom(async (value, { req }) => {
      const course = await Courses.findById(value);
      if (!course) {
        throw new Error("invalid course");
      }
    }),
];

// validate Student to use it in route
const studentValidator = [
  body("studentId")
    .isMongoId()
    .custom(async (value, { req }) => {
      const student = await Student.findById(value);
      if (!student) {
        throw new Error("invalid student");
      }
    }),
];

route.post(
  "/teacher/:id",
  isAuth,
  corseValidator,
  body("homework")
    .isString()
    .withMessage("Homework Is required and must be string"),
  body("time").isNumeric().withMessage("time must be number of days"),
  isRole([Role.teacher]),
  teacherRoute.addHomeWork
);

// see all student enrolled in my course
route.get(
  "/studentInCourse/:id",
  isAuth,
  isRole([Role.teacher]),
  corseValidator,
  teacherRoute.studentInCourse
);
// add score of student
route.post(
  "/addScore/:id",
  corseValidator,
  studentValidator,
  isAuth,
  isRole([Role.teacher]),
  teacherRoute.addPracticalScore
);

// add final score
route.post(
  "/addFinal/:id",
  corseValidator,
  studentValidator,
  isAuth,
  isRole([Role.teacher]),
  teacherRoute.addFinalScore
);

module.exports = route;
