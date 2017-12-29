const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 24,
      minlength: 5,
    },
    password: String,
    purchasedTours: [Schema.Types.ObjectId],
    createdTours: [Schema.Types.ObjectId],
    creator: { type: Boolean, default: false },
    // lastUpdate: Date,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

/*
 * userSchema.pre('save', (next) => {
 *   this.lastUpdate = Date.now();
 *   next();
 * });
 */

module.exports = mongoose.model('User', userSchema);
