const mongoose = require('mongoose');

const { Schema } = mongoose;

const coordinates = {
  type: { type: String, default: 'Point' },
  coordinates: [Number],
};

// Verbose url parser
const urlRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const pointSchema = new Schema({
  key: String,
  name: { type: String, required: true },
  coordinates,
  audio: { type: String, match: [urlRegex, 'Please fill a valid url.'] },
});

const tourSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    creator: Schema.Types.ObjectId,
    // start: [coordinates],
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
