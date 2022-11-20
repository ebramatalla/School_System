const mongoose = require("mongoose");
const User = require("./shared/user");

const studentSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: false,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  currentCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  endedCourses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      degree: Number,
    },
  ],
});

const Student = User.discriminator("Student", studentSchema);

module.exports = mongoose.model("Student");
