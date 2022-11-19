const mongoose = require("mongoose");
const User = require("./shared/user");

const specializationEnum = {
  arabic: "arabic",
  english: "english",
  math: "math",
};

const teacherSchema = new mongoose.Schema({
  specialization: {
    type: String,
    enum: specializationEnum,
  },
});
const Teacher = User.discriminator("Teacher", teacherSchema);

module.exports = mongoose.model("Teacher");
module.exports.specialization = specializationEnum;
