const e = require("express");
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/School",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected Successfully to DataBase");
  }
);
