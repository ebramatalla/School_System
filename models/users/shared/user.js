const mongoose = require("mongoose");
const baseOptions = {
  discriminatorKey: "Kind", // our discriminator key, could be anything
  collection: "users", // the name of our collection
};
const Role = {
  manager: "manager",
  teacher: "teacher",
  student: "student",
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.student,
    },
  },
  baseOptions
);

const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.Role = Role;
