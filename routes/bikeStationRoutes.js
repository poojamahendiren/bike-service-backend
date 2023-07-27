// routes/bikeStationRoutes.js
const express = require('express');
const router = express.Router();
const bikeStationController = require('../controllers/bikeStationController');

// Route to create a new bike station
router.post('/createBikeStation', bikeStationController.createBikeStation);

// Route to get all bike stations
router.get('/getAllBikeStations', bikeStationController.getAllBikeStations);

// Route to get a specific bike station by ID
router.get('/getBikeStationById/:id', bikeStationController.getBikeStationById);

// Route to update a bike station
router.put('/updateBikeStation/:id', bikeStationController.updateBikeStation);

// Route to delete a bike station
router.delete('/:id', bikeStationController.deleteBikeStation);

module.exports = router;
