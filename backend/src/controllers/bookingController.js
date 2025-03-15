import {
    createBooking,
    getBookingsByUser,
    getBookingsByPackage,
    getBookingCountByUser,
    cancelBooking
  } from '../models/bookingModel.js';
  import nodemailer from "nodemailer";
  import { markPackageAsBooked } from "../models/customizedPackageModel.js";
  
  // Create a new booking
  export const addBooking = async (req, res) => {
    try {
      const { custom_package_id } = req.body;
      const bookingData = req.body;
      const newBooking = await createBooking(bookingData);
      await markPackageAsBooked(custom_package_id);
      await sendBookingConfirmationEmail(newBooking);
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
  

  export const fetchBookingCountByUser = async (req, res) => {
    try {
      const { user_id } = req.params;
      const bookingCount = await getBookingCountByUser(user_id);
      res.status(200).json(bookingCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching bookings for user' });
    }
  };

  export const cancelBookingController = async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      // Update booking status to "Cancelled"
      const result = await cancelBooking(booking_id);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.json({ message: "Booking cancelled successfully", booking: result.rows[0] });
    } catch (err) {
      console.error("Error cancelling booking:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const formatDate = (dateString) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
};


const sendBookingConfirmationEmail = async (bookingDetails) => {
  const packageLink = `${process.env.FRONTEND_URL}/bookingHistory`;
  
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px 0; background-color: #f4f4f4;">
        <div style="max-width: 520px; background: #ffffff; padding: 25px; border-radius: 10px; 
                    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15); margin: 0 auto;">
            <h2 style="color: #333;">🎉 Booking Confirmed</h2>
            <p style="color: #444; font-size: 18px; font-weight: bold;">Hello, ${bookingDetails.name.toUpperCase()}</p>
            <p style="color: #555; font-size: 16px;">
                Your booking has been successfully confirmed! Here are your details:
            </p>

            <div style="text-align: left; padding: 20px; background: #f8f9fa; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 10px 0;"><strong>📌 Booking ID:</strong> ${bookingDetails.booking_id}</p>
                <p style="margin: 10px 0;"><strong>🏙️ Package:</strong> ${bookingDetails.city_name}</p>
                <p style="margin: 10px 0;"><strong>📅 Start Date:</strong> ${formatDate(bookingDetails.start_date)}</p>
                <p style="margin: 10px 0;"><strong>💰 Total Cost:</strong> ₹${bookingDetails.total_price}</p>
                <p style="margin: 10px 0;"><strong>📞 Contact:</strong> ${bookingDetails.phone}</p>
                <p style="margin: 10px 0;"><strong>👨‍👩‍👧 Travelers:</strong> ${bookingDetails.adults} Adults, ${bookingDetails.infants} Infants</p>
            </div>

            <a href="${packageLink}" 
               style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; 
                      padding: 12px 24px; font-size: 16px; border-radius: 6px; font-weight: bold; margin-top: 20px;">
                View Booking History
            </a>

            <p style="color: #555; font-size: 14px; margin-top: 25px;">
                You can review your booking details anytime by visiting the Booking History page.
            </p>
            <p style="color: #555; font-size: 14px;">
                Thank you for choosing <strong>TravelMate</strong>. We look forward to making your journey memorable.
            </p>
            <p style="color: #777; font-size: 12px;">Best regards,<br><strong>TravelMate Team</strong></p>
        </div>
    </div>
`;

  await transporter.sendMail({
      from: `"TravelMate" <${process.env.EMAIL_USER}>`,
      to: bookingDetails.email,
      subject: "Your Booking Confirmation - TravelMate",
      html: emailHTML,
  });
};
