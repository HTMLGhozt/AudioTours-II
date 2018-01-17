const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 24,
      minlength: 3,
      lowercase: true,
      match: [/^[a-zA-Z0-9_-]*$/, 'must be alphanumeric.'],
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

userSchema.pre('save', function hashPassword(next) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/;
  if (!regex.test(this.password)) next(new Error('password doesn\'t match guidelines'));

  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) next(new Error(err));
    else this.password = hash;
    next();
  });
});
/*
 * userSchema.pre('save', (next) => {
 *   this.lastUpdate = Date.now();
 *   next();
 * });
 */
/**
 * const passwordHash = (req, res, next) => {
  try {
    const { password } = req.body;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/;
    if (!regex.test(password)) errorHandler('password doesn\'t match guidelines');
    bcrypt.hash(password, 11, (err, hash) => {
      if (err) errorHandler(`server error: ${err.message}`, 500);
      else req.password = hash;
      next();
    });
  } catch (e) {
    req.error = e;
    next();
  }
};
 */
module.exports = mongoose.model('User', userSchema);
