import {
    createBooking,
    getBookingsByUser,
    getBookingsByPackage
  } from '../models/bookingModel.js';
  
  // Create a new booking
  export const addBooking = async (req, res) => {
    try {
      const bookingData = req.body;
      const newBooking = await createBooking(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding booking' });
    }
  };
  
  // Fetch all bookings for a specific user
  export const fetchBookingsByUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      const bookings = await getBookingsByUser(user_id);
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bookings for user' });
    }
  };
  
  // Fetch all bookings for a specific package
  export const fetchBookingsByPackage = async (req, res) => {
    try {
      const { package_id } = req.params;
      const bookings = await getBookingsByPackage(package_id);
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bookings for package' });
    }
  };
  