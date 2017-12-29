const bcrypt = require('bcrypt');

const errorHandler = (errMessage, status = 422) => {
  const error = new Error(errMessage);
  error.status = status;
  throw error;
};
const passwordHash = (req, res, next) => {
  const { password } = req.body;
  try {
    if (!password) errorHandler('Password is required.');
    if (password.length < 8) errorHandler('Passwords must contain at least 8 characters');
    if (!/[$-/:-?{-~!"^_`[\]]/.test(password)) errorHandler('Passwords must contain atleast 1 symbol.');
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
