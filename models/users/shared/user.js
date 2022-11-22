const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
var uniqueValidator = require("mongoose-unique-validator");
var jwt = require("jsonwebtoken");

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
      unique: true,
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
      required: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    confirmationCode: {
      type: Number,
    },
  },
  baseOptions
);
// that to sure email is unique
userSchema.plugin(uniqueValidator);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.confirmationCode;
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// gen auth
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "ebram");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findToLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login");
  }
  return user;
};
// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.Role = Role;
