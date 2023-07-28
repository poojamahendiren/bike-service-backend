const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to create a new booking
router.post('/createBooking', bookingController.createBooking);

// Route to get all bookings
router.get('/getAllBookings', bookingController.getAllBookings);

// Route to mark a booking as ready for delivery
router.patch('/:id/ready', bookingController.markBookingAsReady);

// Route to mark a booking as completed
router.patch('/:id/completed', bookingController.markBookingAsCompleted);


// Route to update a booking
router.put('/update/:id', bookingController.updateBooking);


module.exports = router;
