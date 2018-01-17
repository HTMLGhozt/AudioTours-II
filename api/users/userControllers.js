const User = require('./userSchema.js');

const createUser = (req, res) => {
  const { username, password, creator } = req.body;

  const newUser = new User({ username, password, creator });
  newUser
    .save()
    .then(fUser => res.json(fUser))
    .catch(err => res.status(500).json(err.message));
};

const updateUser = () => {};

const login = (req, res) => {
  const { username, password } = req.body;

  User
    .findOne({ username })
    .then((fUser) => {
      fUser.checkPassword(password, (err, isMatch) => {
        if (err) res.status(500).json(err);
        else if (!isMatch) res.status(500).json('incorrect username/password');
        else res.json(fUser);
      });
    })
    .catch(err => res.status(500).json(err.message));
};

module.exports = {
  createUser,
  updateUser,
  login,
};
