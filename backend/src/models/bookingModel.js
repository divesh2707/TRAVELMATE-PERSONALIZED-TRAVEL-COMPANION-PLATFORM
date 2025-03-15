import pool from '../config/db.js';

// Insert a new booking
export const createBooking = async (bookingData) => {
    const {
      user_id, city_name, package_id, start_date, end_date, arrival_option,
      name, email, phone, total_price, adults, infants, custom_package_id
    } = bookingData;
  
    const query = `
      INSERT INTO booked_package (
        user_id, city_name, package_id, start_date, end_date, arrival_option,
        name, email, phone, total_price, adults, infants, custom_package_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;
    const values = [
      user_id, city_name, package_id, start_date, end_date, arrival_option,
      name, email, phone, total_price, adults, infants, custom_package_id
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  };
  
  // Fetch bookings by user_id
  export const getBookingsByUser = async (user_id) => {
    const query = `SELECT * FROM booked_package WHERE user_id = $1;`;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  };

  export const getBookingCountByUser = async (user_id) => {
    const query = `SELECT count(*) as count FROM booked_package WHERE user_id = $1;`;
    const result = await pool.query(query, [user_id]);
    return result.rows[0];
  };
  
  // Fetch bookings by package_id
  export const getBookingsByPackage = async (package_id) => {
    const query = `SELECT * FROM booked_package WHERE package_id = $1;`;
    const result = await pool.query(query, [package_id]);
    return result.rows;
  };

  export const cancelBooking = async(booking_id)=>{
    const query = `UPDATE booked_package SET status = 'Cancelled' WHERE booking_id = $1 RETURNING *;`;
    const result = await pool.query(query,[booking_id]);
    return result;
  };