const User = require('../models/userSchema.js');
// const errorHandler = require('../helpers/errorHandler.js');

// const createUser = (req, res) => {
//   const { error, password } = req;
//   const { username } = req.body;

//   if (error) errorHandler(error.message, error.status);
//   const newUser = new User({ username, password });

//   newUser
//     .save()
//     .then(user => res.json(user))
//     .catch(err => res.status(500).json(err.errmsg));
// };

// const editUser = (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) errorHandler('username AND password are required.');
//   User
//     .findOne({ username })
//     .then(fUser => res.json(fUser))
//     .catch(err => res.status(500).json('No user by that name.'));
// };

// const loginUser = (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) errorHandler('username AND password are required.');
//     User
//       .findOne({ username })
//       .then(fUser => res.json(fUser))
//       .catch(err => res.status(500).json('No user by that name.'));
//   } catch (e) {
//     res.status(e.status).json(e.message);
//   }
// };

// module.exports = {
//   createUser,
//   loginUser,
//   editUser,
// };
