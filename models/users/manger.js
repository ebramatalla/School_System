const mongoose = require("mongoose");
const User = require("./shared/user");

const mangerSchema = new mongoose.Schema({});
const Manger = User.discriminator("Manger", mangerSchema);

module.exports = mongoose.model("Manger");
