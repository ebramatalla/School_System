const mongoose = require("mongoose");
const User = require("./shared/user");

const studentSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
  },
});

const Student = User.discriminator("Student", studentSchema);

module.exports = mongoose.model("Student");
