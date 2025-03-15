import pool from "../config/db.js";

// Get recent trending bookings (most booked packages in the last 7 days)
export const getRecentTrendingBookings = async (days = 31, limit = 10) => {
  const query = `
    SELECT 
        city_name, 
        COUNT(*) AS total_bookings
    FROM booked_package
    WHERE created_at >= NOW() - INTERVAL '${days} days'
    GROUP BY city_name
    ORDER BY total_bookings DESC
    LIMIT $1;
  `;
  return pool.query(query, [limit]);
};


// Get daily booking volume
export const getDailyBookings = async () => {
  const query = `
    SELECT 
        DATE(created_at) AS booking_date, 
        COUNT(*) AS total_bookings
    FROM booked_package
    GROUP BY booking_date
    ORDER BY booking_date DESC
    LIMIT 10;
  `;
  return pool.query(query);
};

// Get most popular bookings with city name
export const getPopularBookings = async () => {
    const query = `
      SELECT 
          package_id, 
          city_name, 
          COUNT(*) AS total_bookings
      FROM booked_package
      GROUP BY package_id, city_name
      ORDER BY total_bookings DESC
      LIMIT 10;
    `;
    return pool.query(query);
  };
  
  export const getDailyRevenue = async () => {
    const query = `
      SELECT 
          DATE(created_at) AS booking_date, 
          SUM(total_price) AS daily_revenue
      FROM booked_package
      GROUP BY booking_date
      ORDER BY booking_date DESC
      LIMIT 10;
    `;
    return pool.query(query);
  };