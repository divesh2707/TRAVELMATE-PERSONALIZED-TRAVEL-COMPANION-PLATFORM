import express from "express";
import { fetchTrendingBookings, fetchDailyBookings, fetchDailyRevenue, fetchPopularBookings } from "../controllers/chartController.js";

const router = express.Router();

router.get("/trending-bookings", fetchTrendingBookings);
router.get("/daily-bookings", fetchDailyBookings);
router.get("/popular-bookings", fetchPopularBookings);
router.get("/daily-revenue", fetchDailyRevenue);

export default router;
