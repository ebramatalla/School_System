const mongoose = require("mongoose");
const { specialization } = require("../users/teacher");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    enum: specialization,
    required: true,
  },
  numberOfAllowedStudent: {
    type: Number,
    required: true,
  },
  availableFor: {
    type: Number,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses;
