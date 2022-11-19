const express = require("express");
const { Role } = require("./models/shared/user");
require("./database/mongoose");
require("./models/shared/user");
const Student = require("./models/manger");
const { specialization } = require("./models/teacher");

const app = express();

app.use(express.json);
const port = 3000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
