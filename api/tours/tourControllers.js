const Tour = require('./tourSchema.js');
const User = require('../users/userSchema.js');
/*
  name: { type: String, required: true, unique: true },
  description: String,
  creator: Schema.Types.ObjectId,
  // start: [coordinates],
  points: [pointSchema],
  isPublished: { type: Boolean, default: false },
*/
const createTour = (req, res) => {
  const {
    id,
    name,
    description,
    points,
    isPublished,
  } = req.body;
  console.info(id, name, description, points, isPublished);
  const newTour = new Tour({
    name, description, points, isPublished,
  });

  newTour
    .save()
    .then((nTour) => {
      User
        .findById(id)
        .then((fUser) => {
          const nUser = fUser.toObject();
          nUser.createdTours.push(nTour._id);
          console.info(nUser);
          User.findByIdAndUpdate(
            id,
            { $set: { createdTours: nUser.createdTours } },
            { new: true },
            (err, user) => {
              if (err) console.error(`err1: ${err.message}`);
              if (err) res.status(500).json({ message: 'FUBAR' });
              else res.status(201).json(user);
            },
          );
        })
        .catch((err) => {
          console.error('err2');
          throw new Error({ message: 'error' });
        });
    })
    .catch((err) => {
      console.error(`error3: ${err.message}`);
      res.status(500).json({ message: `FUBAR: ${err.message}` })
    });
};

const editTour = (req, res) => {

};

const purchaseTour = (req, res) => {

};

module.exports = {
  createTour,
  editTour,
  purchaseTour,
};
