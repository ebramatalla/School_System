const express = require("express");
require("./database/mongoose");
const course = require("./models/Courses/course");
const { Specialization } = require("./models/users/teacher");

const app = express();

const cs50 = new course({
  name: "Cs50",
  specialization: Specialization.cs,
  numberOfAllowedStudent: 100,
});
cs50.save();

app.use(express.json);
const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
