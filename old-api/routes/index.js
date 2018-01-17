const userRouter = require('./userRoutes.js');
// const tourRouter = require('./tourRoutes.js');
const api = require('express').Router();

api.use('/users', userRouter);
// api.use('/tours', tourRouter);

module.exports = api;

// // const { passwordHash } = require('./middleware/middlewares.js');
// const { createUser, loginUser } = require('./controllers/users.js');
// const tours = require('./controllers/tours.js');
// module.exports = (app) => {
//   app.post('/user', /* passwordHash, */ createUser);
//   app.post('/login', loginUser);

//   app.get('/allTours', tours.getAllTours);

//   app
//     .route('/tour/:id')
//     .get(tours.getTourById)
//     .put(tours.editTour)
//     .delete(tours.deleteTour);

//   app.post('/tour/create', tours.createTour);
// };
