const User = require("../models/users/shared/user");
const login = async (req, res) => {
  try {
    const user = await User.findToLogin(req.body.email, req.body.password);
    // if (!user.active) {
    //   throw new Error({ message: "Please Active Account First" });
    // }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports = { login };
