const dotenv = require("dotenv");

dotenv.config();

const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;

module.exports = {
  EMAIL,
  EMAIL_PASS,
};
