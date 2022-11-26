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
const courseValidator = [
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
  courseValidator,
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
  courseValidator,
  teacherRoute.studentInCourse
);
// add score of student
route.post(
  "/addScore/:id",
  courseValidator,
  studentValidator,
  isAuth,
  isRole([Role.teacher]),
  teacherRoute.addPracticalScore
);

// add final score
route.post(
  "/addFinal/:id",
  isAuth,
  isRole([Role.teacher]),
  courseValidator,
  studentValidator,

  teacherRoute.addFinalScore
);

// put exam
route.post(
  "/putExam/:id",
  isAuth,
  isRole([Role.teacher]),
  courseValidator,
  body("questions")
    .isArray({ min: 5, max: 10 })
    .withMessage("Question must be Min 5 Question and max 15"),
  body("duration").isNumeric().withMessage("duration must be Number"),
  teacherRoute.addExam
);
// see the grade of exam
route.get("/seeGrade/:id", teacherRoute.scoresOfExam);
route.get("/addScore/:id", teacherRoute.addScoreOfExam);
module.exports = route;
