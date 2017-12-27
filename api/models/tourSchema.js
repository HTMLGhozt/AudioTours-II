const mongoose = require('mongoose');
// const User = require('./userSchema.js');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017', { useMongoClient: true });
const { Schema } = mongoose;

const coordinates = {
  type: { type: String, default: 'Point' },
  coordinates: [Number],
};

const urlRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/; 
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

module.exports = mongoose.model('Tour', tourSchema);

// const Tour = mongoose.model('Tour', tourSchema);

// const test = new Tour({
//   start: [{ coordinates: [(109.9284084 * -1), 31.448154699999996] }],
//   points: [{
//     coordinates: { coordinates: [(109.9284084 * -1), 31.448154699999996] },
//     audio: 'TestyHtml.com',
//   }],
// });
// test
//   .save()
//   .then((t) => {
//     console.log(t);
//     console.log(t.points[0].coordinates.coordinates);
//   })
//   .catch(err => console.error(err));

// Tour.find({}, (users) => { console.log(users); });

// setTimeout(() => {
//   Tour.remove({}, (err) => {
//     if (err) console.error(err);
//     else console.info('no errors');
//   });
// }, 3000);
