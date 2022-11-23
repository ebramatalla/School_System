const express = require("express");
const mangerRoute = require("../controller/manger");
const route = express.Router();
const { body } = require("express-validator");
const Teacher = require("../models/users/teacher");
const isAuth = require("../middleware/isAuth");
const isRole = require("../middleware/isRole");
const { Role } = require("../models/users/shared/user");

// this route used by manger to add course
route.post(
  "/addCourse",
  isAuth,
  isRole([Role.manager]),
  body("name")
    .isString()
    .withMessage("Name Of Course Is Required and must be String"),
  body("specialization")
    .isString()
    .isIn(["cs", "is", "it"])
    .withMessage("specialization Of Course Is Required and must be String"),
  body("numberOfAllowedStudent")
    .isNumeric()
    .withMessage("number Of Allowed Student  Is Required"),
  body("availableFor")
    .isNumeric()
    .withMessage("availableFor  Is Required and must be number "),
  body("teacher")
    .isMongoId()
    .custom(async (value, { req }) => {
      const teacher = await Teacher.findById(value);
      if (!teacher) {
        throw new Error("Invalid Teacher");
      }
    }),
  mangerRoute.addCourse
);
/**
 * this route to add teacher
 */
route.post(
  "/addTeacher",
  isAuth,
  isRole([Role.manager]),
  body("name").isString().withMessage("Name Is Required And Must Be String "),
  body("email").isEmail().withMessage("Email Is Required And Must Be Valid "),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .custom(async (value, { req }) => {
      if (value.toLowerCase().includes(req.body.name)) {
        throw new Error("Please Choose Password isn't contain your name ");
      }
    })
    .withMessage("Please Choose Stronger Password"),
  body("specialization")
    .isIn(["cs", "is", "it"])
    .withMessage("specialization must be on of this specialization cs is it"),
  mangerRoute.addTeacher
);
// this  route to add student
route.post(
  "/addStudent",
  isAuth,
  isRole([Role.manager]),
  body("name").isString().withMessage("Name Is Required And Must Be String "),
  body("email").isEmail().withMessage("Email Is Required And Must Be Valid "),
  body("password")
    .isString()
    .isLength({ min: 5 })
    .custom(async (value, { req }) => {
      if (value.toLowerCase().includes(req.body["name"])) {
        throw new Error("Please Choose Password isn't contain your name ");
      }
    })
    .withMessage("Please Choose Stronger Password"),
  body("level")
    .isLength({ ma: 4, min: 1 })
    .isNumeric()
    .withMessage("Level must ne number and between 1 : 4 "),
  mangerRoute.addStudent
);

module.exports = route;
