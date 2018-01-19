const tourRouter = require('express').Router();

const { createTour, updateTour } = require('./tourControllers.js');

tourRouter.post('/newTour', createTour);
  // .put(updateTour);

module.exports = tourRouter;
