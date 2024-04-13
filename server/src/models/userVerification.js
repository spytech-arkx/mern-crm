const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);
module.exports = UserVerification;
