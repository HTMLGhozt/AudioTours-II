const userRouter = require('express').Router();

const { createUser, updateUser, login } = require('./userControllers.js');

userRouter
  .route('/')
  .post(createUser)
  .put(updateUser);

userRouter
  .post('/login', login);

module.exports = userRouter;
