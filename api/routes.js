const { passwordHash } = require('./middleware/middlewares.js');
const { createUser, loginUser } = require('./controllers/users.js');

module.exports = (app) => {
  app.post('/user', passwordHash, createUser);
  app.post('/login', loginUser);
};
