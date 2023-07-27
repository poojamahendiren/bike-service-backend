const mongoose = require('mongoose');

// Schema definition for User
const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
