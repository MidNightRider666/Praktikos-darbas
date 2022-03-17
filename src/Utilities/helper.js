const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../dbConfig');

function HidePass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyPass(enteredPass, userObj) {
  return bcrypt.compareSync(enteredPass, userObj.password);
}

function generateJwtToken(userObj) {
  const jwtSecret = jwt_secret;
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  const jwtSecret = jwt_secret;

  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (err) {
    return false;
  }
}

module.exports = {
  HidePass,
  verifyPass,
  generateJwtToken,
  verifyJwtToken,
};
