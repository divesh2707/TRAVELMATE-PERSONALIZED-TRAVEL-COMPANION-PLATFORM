import { getRecentTrendingBookings, getDailyBookings, getPopularBookings, getDailyRevenue } from "../models/chartsModel.js";

// Fetch trending bookings from the last 7 days
export const fetchTrendingBookings = async (req, res) => {
  try {
    const days = req.query.days ; // Allow dynamic filtering by days (default: 7)
    const limit = req.query.limit ; // Allow setting the result limit (default: 10)
    
    const result = await getRecentTrendingBookings(days, limit);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching trending bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch daily booking volume
export const fetchDailyBookings = async (req, res) => {
  try {
    const result = await getDailyBookings();
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching daily bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch most popular bookings with city name
export const fetchPopularBookings = async (req, res) => {
    try {
      const result = await getPopularBookings();
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching popular bookings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

export const fetchDailyRevenue = async (req, res) => {
    try {
      const result = await getDailyRevenue();
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching daily revenue:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
