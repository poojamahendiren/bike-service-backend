const Booking = require('../models/booking'); // Assuming you have the Booking model defined
const sendMail = require('../config/nodemailer');
const Customer = require('../models/customer');
const Service = require('../models/service');
const BikeStation = require ('../models/bikeStation');

const createBooking = async (req, res) => {
  const { customer, service, bikeStation, date } = req.body;

  try {
    // Find the customer based on the provided customer ID
    const selectedCustomer = await Customer.findById(customer);
    if (!selectedCustomer) {
      return res.status(400).json({ message: 'Customer not found. Please register as a customer first.' });
    }

    // Find the service based on the provided service ID
    const selectedService = await Service.findById(service);
    if (!selectedService) {
      return res.status(400).json({ message: 'Service not found. Please select a valid service.' });
    }

    // Find the bike station based on the provided bikeStation ID
    const selectedBikeStation = await BikeStation.findById(bikeStation);
    if (!selectedBikeStation) {
      return res.status(400).json({ message: 'Bike station not found. Please select a valid bike station.' });
    }

    // Create the new booking with the corresponding customer, service, and bikeStation references
    const newBooking = new Booking({
      customer: selectedCustomer._id,
      service: selectedService._id,
      bikeStation: selectedBikeStation._id,
      date,
      status: 'pending', // Initialize status as 'pending'
    });

    await newBooking.save();

    // Send email notification to the bike station owner
    const emailContent = 'A new booking has been received.';
    sendMail('bikestation@example.com', 'New Booking Received', emailContent);

    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};





// API to get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to mark a booking as ready for delivery
const markBookingAsReady = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'ready';
    await booking.save();

    // Send email notification to the customer
    sendMail(booking.customerEmail, 'Booking Status Update', 'Your bike is ready for delivery.');

    res.status(200).json({ message: 'Booking marked as ready for delivery' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// API to mark a booking as completed
const markBookingAsCompleted = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'completed';
    await booking.save();

    // Send email notification to the customer
    sendMail(booking.customerEmail, 'Booking Status Update', 'Your bike service is completed and ready for delivery.');

    res.status(200).json({ message: 'Booking marked as completed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// // Function to send email notification using nodemailer
// const sendMail = async (toEmail, subject, htmlContent) => {
//   // Configure your nodemailer transporter here
//   const transporter = nodemailer.createTransport({
//     // Specify your email service provider and authentication details
//     // For example, if using Gmail:
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com', // Sender's email address
//     to: toEmail, // Recipient's email address
//     subject: subject, // Email subject
//     html: htmlContent, // Email content as HTML
//   };

//   // Send the email
//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

module.exports = {
  createBooking,
  getAllBookings,
  markBookingAsReady,
  markBookingAsCompleted,
};
