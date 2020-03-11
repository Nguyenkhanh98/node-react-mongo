const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const log = require('../loggers/bunyan');

const SALT_WORK_FACTOR = 10;
const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter full name'],
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  phone: {
    type: String,
  },
},
{ timestamps: true });
User.pre('save', function preSave(next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function genSalt(err, salt) {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, function hashPassword(error, hash) {
      if (error) return next(error);
      this.password = hash;
      return next();
    });
    return next();
  });
  return next();
});

User.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('User', User);
