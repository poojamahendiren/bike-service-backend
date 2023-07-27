// controllers/bikeStationController.js
const BikeStation = require('../models/bikeStation');

// API to create a new bike station
const createBikeStation = async (req, res) => {
  const { name, location, servicesOffered } = req.body;

  try {
    const newBikeStation = new BikeStation({
      name,
      location,
      servicesOffered,
    });

    await newBikeStation.save();
    res.status(201).json({ message: 'Bike station created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to get all bike stations
const getAllBikeStations = async (req, res) => {
  try {
    const bikeStations = await BikeStation.find().populate('servicesOffered');
    res.status(200).json(bikeStations);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to get a specific bike station by ID
const getBikeStationById = async (req, res) => {
  const { id } = req.params;

  try {
    const bikeStation = await BikeStation.findById(id).populate('servicesOffered');
    if (!bikeStation) {
      return res.status(404).json({ message: 'Bike station not found' });
    }
    res.status(200).json(bikeStation);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to update a bike station
const updateBikeStation = async (req, res) => {
  const { id } = req.params;
  const { name, location, servicesOffered } = req.body;

  try {
    const bikeStation = await BikeStation.findById(id);
    if (!bikeStation) {
      return res.status(404).json({ message: 'Bike station not found' });
    }

    bikeStation.name = name;
    bikeStation.location = location;
    bikeStation.servicesOffered = servicesOffered;
    await bikeStation.save();

    res.status(200).json({ message: 'Bike station updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to delete a bike station
const deleteBikeStation = async (req, res) => {
  const { id } = req.params;

  try {
    const bikeStation = await BikeStation.findByIdAndDelete(id);
    if (!bikeStation) {
      return res.status(404).json({ message: 'Bike station not found' });
    }
    res.status(200).json({ message: 'Bike station deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createBikeStation,
  getAllBikeStations,
  getBikeStationById,
  updateBikeStation,
  deleteBikeStation,
};
