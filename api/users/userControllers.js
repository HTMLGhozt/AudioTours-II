const User = require('./userSchema.js');

const createUser = (req, res) => {
  const { username, password, creator } = req.body;

  const newUser = new User({ username, password, creator });

  newUser
    .save()
    .then(() => {
      res
        .status(201)
        .json({ username, creator });
    })
    .catch(err => res.status(500).json(err.message));
};

const updateUser = (req, res) => {
  const user = req.body;

  User.findByIdAndUpdate(user.id);
};

const login = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  User
    .findOne({ username })
    .then((fUser) => {
      fUser.checkPassword(password, (err, isMatch) => {
        console.log('inside checkPassword');
        if (err) res.status(500).json(err.message);
        else if (!isMatch) res.status(500).json('incorrect username/password');
        else {
          const { creator, purchasedTours, createdTours } = fUser;

          res.status(200).json({
            id: fUser._id,
            username,
            creator,
            purchasedTours,
            createdTours,
          });
        }
      });
    })
    .catch(err => res.status(500).json('error logging in: ' + err.message));
};

module.exports = {
  createUser,
  updateUser,
  login,
};
