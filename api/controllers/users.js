const User = require('../models/userSchema.js');
const errorHandler = require('../helpers/errorHandler.js');

const createUser = (req, res) => {
  try {
    const { error, password } = req;
    const { username } = req.body;
    if (error) errorHandler(error.message, error.status);
    const newUser = new User({ username, password });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err.errmsg));
  } catch (e) {
    res.status(e.status).send(e);
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) errorHandler('username AND password are required.');
    User.findOne({ username }, (err, user) => {
      if (err) errorHandler('No user by that name.');
      console.log(user);
    });
  } catch (e) {
    res.status(e.status).json(e.message);
  }
};

module.exports = {
  createUser,
  loginUser,
};
