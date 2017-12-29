const bcrypt = require('bcrypt');
const errorHandler = require('../helpers/errorHandler.js');

const passwordHash = (req, res, next) => {
  const { password } = req.body;
  try {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/;
    if (regex.test(password)) errorHandler('password doesn\'t match guidelines');
    bcrypt.hash(password, 11, (err, hash) => {
      if (err) errorHandler(`server error: ${err.message}`, 500);
      else req.password = hash;
      next();
    });
  } catch (e) {
    req.error = e;
    next();
  }
};

module.exports = {
  passwordHash,
};
