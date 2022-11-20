const mongoose = require("mongoose");
const validator = require("validator");
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
      required: true,
      trim: true,
      lowercase: true,
      if(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    role: {
      type: String,
      enum: Role,
    },
  },
  baseOptions
);

const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.Role = Role;
