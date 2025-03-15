import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import upvoteRoutes from './routes/upvoteRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customizedPackageRoutes from './routes/customizedPackageRoutes.js';
import chartRoutes from './routes/chartRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', blogRoutes);
app.use('/api/blog', commentRoutes);
app.use('/api/blog', upvoteRoutes)
app.use('/api/cities', cityRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/booking', bookingRoutes);
app.use("/api/customizedPackages", customizedPackageRoutes);
app.use('/api/adminDashboard/charts', chartRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

export default app;
