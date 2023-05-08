const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 40,
  },
  city: {
    type: String,
    required: false,
    maxlength: 40,
  },
  state: {
    type: String,
    required: false,
    maxlength: 40,
  },
  country: {
    type: String,
    required: false,
    maxlength: 40,
  },
  photo: String,
});

module.exports = mongoose.model('User', userSchema);
