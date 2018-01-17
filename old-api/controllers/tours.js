const Tours = require('../models/tourSchema.js');
const errorHandler = require('../helpers/errorHandler.js');

/* tour/:id */

const getTourById = (req, res) => {
  const { id } = req.params;

  Tours
    .findById(id)
    .then(fTour => res.json(fTour))
    .catch(err => res.status(500).json(err));
};

const editTour = (req, res) => {
  const { id } = req.params;

  Tours
    .findById(id);
};

const deleteTour = (req, res) => {};

/* alt routes */

const createTour = (req, res) => {};

const getAllTours = (req, res) => {};

module.exports = {
  getTourById,
  createTour,
  editTour,
  deleteTour,
  getAllTours,
};
