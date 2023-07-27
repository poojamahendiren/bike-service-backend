// controllers/customerController.js
const Customer = require('../models/customer');

// Controller function to create a new customer
const createCustomer = async (req, res) => {
  try {
    // Assuming you have the necessary data from the request body
    const { email, mobile } = req.body;

    // Create the customer in the database
    const newCustomer = new Customer({ email, mobile });
    await newCustomer.save();

    res.status(201).json({ message: 'Customer created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller function to get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller function to get customer details by ID
const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
};
