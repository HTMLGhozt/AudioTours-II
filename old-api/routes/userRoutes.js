const userRouter = require('express').Router();

userRouter
  .route('/')
  .post()
  .put();

userRouter.post('/login');

export default userRouter;
