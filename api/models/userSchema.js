const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    purchasedTours: [/* Tour Objects */],
    createdTours: [/* Tour Objects */],
    _creator: {
      type: Boolean,
      default: false,
    },
    // _lastUpdate: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

// userSchema.pre('save', (next) => {
//   this._lastUpdate = Date.now();
//   next();
// });

module.exports = mongoose.model('User', userSchema);
