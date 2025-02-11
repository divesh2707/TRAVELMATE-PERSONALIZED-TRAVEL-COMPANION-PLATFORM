// src/routes/hotelRoutes.js
import express from 'express';
import { addHotel,fetchHotelsByCategory, fetchHotelsByCityAndCategory } from '../controllers/hotelController.js';
import upload from '../middleware/multer.js';

const router = express.Router();


// Routes for Hotel
router.post('/add', upload.array('images',3), addHotel);
router.get('/category/:category', fetchHotelsByCategory);
// Get hotels by city_id and category
router.get('/:city_id/:hotel_category', fetchHotelsByCityAndCategory);

export default router;
