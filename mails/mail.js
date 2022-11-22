const nodemailer = require("nodemailer");

function random() {
  return Math.floor(Math.random() * (9999 - 1000) + 1000);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "senderemail542@gmail.com",
    pass: "yxglmmynvqtnuvsz",
  },
});
const sendEmail = (email, key) => {
  transporter.sendMail(
    {
      from: "senderemail542@gmail.com",
      to: email,
      subject: "Use This Key To Confirm Email",
      text: "The Key " + key,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
module.exports = { random, sendEmail };
