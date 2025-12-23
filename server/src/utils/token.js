const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  try {
    var token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
