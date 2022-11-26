const express = require("express");
require("./database/mongoose");

const mangerRoute = require("../src/route/manger");
const teacherRoute = require("../src/route/teacher");
const studentRoute = require("../src/route/student");
const authRoute = require("../src/route/auth");
const sharedRoute = require("../src/route/Shared/Shared");
const Corn = require("../src/controller/schedule ");
const app = express();
const ErrorHandler = require("./ErrorHandler/handleError");

app.use(express.json());

app.use(mangerRoute);
app.use(sharedRoute);
app.use(teacherRoute);
app.use(studentRoute);
app.use(authRoute);
app.use(ErrorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
  Corn.startAllExams();
  Corn.endAllExam();
});
