// controllers/serviceController.js
const Service = require('../models/service');

// Controller function to get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller function to create a new service
const createService = async (req, res) => {
  try {
    // Assuming you have the necessary data from the request body
    const { name, description, price } = req.body;

    // Create the service in the database
    const newService = new Service({ name, description, price });
    await newService.save();

    res.status(201).json({ message: 'Service created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller function to delete a service
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    // Delete the service from the database
    await Service.findByIdAndDelete(serviceId);

    res.status(200).json({ message: 'Service deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  getAllServices,
  createService,
  deleteService,
};
