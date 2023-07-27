// models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  // Add other fields for the customer details as per your requirements
});

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;
