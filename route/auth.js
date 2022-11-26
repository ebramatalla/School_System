const express = require("express");
const authController = require("../controller/auth");
const isAuth = require("../middleware/isAuth");

const route = express.Router();

route.post("/logout", isAuth, authController.logout);

route.post("/login", authController.login);

// route.post("/active", authController.confirm);

// route.post("/confirm", isAuth, authController.activeUser);

module.exports = route;
