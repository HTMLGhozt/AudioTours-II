const Tours = require('../models/tourSchema.js');
const errorHandler = require('../helpers/errorHandler.js');

/*
const coordinates = {
  type: { type: String, default: 'Point' },
  coordinates: [Number],
};
const pointSchema = new Schema({
  name: { type: String, required: true },
  coordinates,
  audio: { type: String, match: [urlRegex, 'Please fill a valid url.'] },
});
const tourSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    creator: Schema.Types.ObjectId,
    start: [coordinates],
    points: [pointSchema],
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
*/

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
