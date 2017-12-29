const { passwordHash } = require('./middleware/middlewares.js');
const { createUser } = require('./controllers/users.js');

module.exports = (app) => {
  app.post('/user', passwordHash, createUser);
};
