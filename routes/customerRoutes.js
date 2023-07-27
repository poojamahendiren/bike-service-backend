const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to create a new customer
router.post('/createCustomer', customerController.createCustomer);

// Route to get all customers
router.get('/getAllCustomers', customerController.getAllCustomers);

// Route to get customer details by ID
router.get('/getCustomerById/:id', customerController.getCustomerById);

module.exports = router;
