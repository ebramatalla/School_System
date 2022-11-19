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
  },
  numberOfAllowedStudent: {
    type: Number,
    required: true,
  },
  Teacher: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses;
