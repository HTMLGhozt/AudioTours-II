const User = require('../models/userSchema.js');
const errorHandler = require('../helpers/errorHandler.js');

const createUser = (req, res) => {
  const { error, password } = req;
  const { username } = req.body;
  try {
    if (error) errorHandler(error.message, error.status);
    const newUser = new User({ username, password });
    newUser.save((err, user) => {
      if (err) errorHandler(`server error: ${err.message}`, 500);

      res.json(user);
    });
  } catch (e) {
    res.status(e.status).send(e.message);
  }
};

module.exports = {
  createUser,
};
