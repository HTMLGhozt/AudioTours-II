const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const pointSchema = new Schema({});

const tourSchema = new Schema({
  points: [pointSchema],
});

module.exports = model('User', tourSchema);
