const User = require('./models/userSchema.js');
const { passwordHash } = require('./middlewares.js');

const errorHandler = (errMessage, status = 422) => {
  const error = new Error(errMessage);
  error.status = status;
  throw error;
};

module.exports = (app) => {
  app.post('/user', passwordHash, (req, res) => {
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
      console.log(e.status, e.message);
      res.status(e.status).json(e.message);
    }
  });
};
