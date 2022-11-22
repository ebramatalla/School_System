const mongoose = require("mongoose");
const User = require("./shared/user");

const studentSchema = new mongoose.Schema({
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
  myHomework: [
    {
      name: String,
      homework: { type: String },
      time: { type: Date, default: new Date().toISOString() },
    },
  ],
});

const Student = User.discriminator("Student", studentSchema);

module.exports = mongoose.model("Student");
