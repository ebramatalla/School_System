const mongoose = require("mongoose");
const User = require("./shared/user");

const specializationEnum = {
  cs: "cs",
  is: "is",
  it: "it",
};

const teacherSchema = new mongoose.Schema({
  specialization: {
    type: String,
    enum: specializationEnum,
  },
  myStudent: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});
const Teacher = User.discriminator("Teacher", teacherSchema);

module.exports = mongoose.model("Teacher");
module.exports.Specialization = specializationEnum;
