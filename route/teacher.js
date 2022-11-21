const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const teacherRoute = require("../controller/teacher");
const isAuth = require("../middleware/isAuth");

route.post("/te/:id", isAuth, teacherRoute.addHomeWork);

module.exports = route;
