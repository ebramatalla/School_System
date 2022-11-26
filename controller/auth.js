const User = require("../models/users/shared/user");
const mail = require("../mails/mail");
const login = async (req, res, next) => {
  try {
    const user = await User.findToLogin(req.body.email, req.body.password);
    // if (!user.active) {
    //   throw new Error({ message: "Please Active Account First" });
    // }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
};
// const confirm = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user.active) {
//       throw new Error({ message: "User Already active" });
//     }
//     if (!user) {
//       throw new Error({ message: "email is invalid" });
//     }
//     const key = mail.random();
//     user.confirmationCode = key;
//     const r = mail.Confirmation(user.email, key);
//     const token = await user.generateAuthToken();

//     await user.save();
//     res.status(200).send({ message: "email send to " + user.email, token });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const activeUser = async (req, res) => {
//   try {
//     if (req.user.confirmationCode === req.body.code) {
//       req.user.active = true;
//     } else {
//       throw new Error("Invalid Code");
//     }
//     await req.user.save();
//     res.status(200).send({ message: "active" });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
module.exports = { login, logout };
