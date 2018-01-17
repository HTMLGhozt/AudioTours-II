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
  if (!regex.test(this.password)) {
    const err = new Error('password doesn\'t match guidelines');
    next(err);
  }

  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) next(err);
    else this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function checkPassword(testPassword, cb) {
  bcrypt.compare(testPassword, this.password, (err, result) => {
    if (err) cb(err);
    cb(null, result);
  });
};

module.exports = mongoose.model('User', userSchema);
