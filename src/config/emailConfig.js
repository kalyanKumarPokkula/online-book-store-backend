const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASS } = require("./config.js");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});

module.exports = transporter;
