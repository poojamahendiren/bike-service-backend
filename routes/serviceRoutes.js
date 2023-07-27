const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Route to get all services
router.get('/getAllServices', serviceController.getAllServices);

// Route to create a new service
router.post('/createService', serviceController.createService);

// Route to delete a service
router.delete('/deleteService/:id', serviceController.deleteService);

module.exports = router;
