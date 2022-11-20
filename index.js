const express = require("express");
require("./database/mongoose");
const teacher = require("../src/models/users/teacher");
const mangerRoute = require("../src/route/manger");

const app = express();
app.use(express.json());
app.use(mangerRoute);
const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
