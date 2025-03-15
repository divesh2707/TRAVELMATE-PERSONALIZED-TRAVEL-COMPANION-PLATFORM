import express from 'express';
import {
  addBooking,
  fetchBookingsByUser,
  fetchBookingsByPackage,
  fetchBookingCountByUser,
  cancelBookingController
} from '../controllers/bookingController.js';

const router = express.Router();

// Route to create a new booking
router.post('/add', addBooking);

// Route to fetch all bookings of a particular user
router.get('/user/:user_id', fetchBookingsByUser);

// Route to fetch all bookings of a particular package
router.get('/package/:package_id', fetchBookingsByPackage);

router.get('/count/:user_id', fetchBookingCountByUser);

router.put("/cancel/:booking_id", cancelBookingController);

export default router;
