const express = require("express");
require("./database/mongoose");
const mangerRoute = require("../src/route/manger");
const teacherRoute = require("../src/route/teacher");
const studentRoute = require("../src/route/student");
const authRoute = require("../src/route/auth");

const app = express();
app.use(express.json());
app.use(mangerRoute);
app.use(teacherRoute);
app.use(studentRoute);
app.use(authRoute);
const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
