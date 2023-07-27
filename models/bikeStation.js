// models/BikeStation.js
const mongoose = require('mongoose');

const bikeStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  servicesOffered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'service',
    },
  ],
});

//module.exports = mongoose.model('BikeStation', bikeStationSchema);

const bikeStation = mongoose.model('BikeStation', bikeStationSchema);
module.exports = bikeStation;

