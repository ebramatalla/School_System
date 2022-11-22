const mongoose = require("mongoose");
const User = require("./shared/user");

const studentSchema = new mongoose.Schema({
  isWarn: {
    type: Boolean,
    default: false,
  },
  numberOfFalls: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  currentCourses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      practicalScore: { type: Number, default: 0 },
      finalScore: { type: Number, default: 0 },
    },
  ],
  endedCourses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId },
      practicalScore: { type: Number, default: 0 },
      finalScore: { type: Number, default: 0 },
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
