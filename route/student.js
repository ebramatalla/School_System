const express = require("express");
const route = express.Router();
const studentController = require("../controller/student");
const isAuth = require("../middleware/isAuth");

route.post("/enrollCourse/:id", isAuth, studentController.enrollCourse);

module.exports = route;
