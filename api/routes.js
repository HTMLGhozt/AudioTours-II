const User = require('./models/userSchema.js');
const middleware = require('./middlewares.js');

module.exports = (app) => {
  app.post('/user', middleware.passHash, (req, res) => {
    res.JSON(User);
  });
};
