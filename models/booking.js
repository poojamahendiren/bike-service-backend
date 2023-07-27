const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
    required: true,
  },
  bikeStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bikeStation',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'readyForDelivery', 'completed'],
    default: 'pending',
  },
  // Add other fields for the booking details as per your requirements
});

const booking = mongoose.model('Booking', bookingSchema);
module.exports = booking;

