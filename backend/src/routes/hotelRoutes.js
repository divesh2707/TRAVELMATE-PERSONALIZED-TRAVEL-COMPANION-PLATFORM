// src/routes/hotelRoutes.js
import express from 'express';
import { addHotel,fetchHotelsByCategory, fetchHotelsByCityAndCategory, updateHotelDetails, deleteHotelById, fetchHotelsByCityID } from '../controllers/hotelController.js';
import upload from '../middleware/multer.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


// Routes for Hotel
router.post('/add', verifyAdmin,upload.array('images',3), addHotel);
router.get('/category/:category', fetchHotelsByCategory);
// Get hotels by city_id and category
router.get('/:city_id/:hotel_category', fetchHotelsByCityAndCategory);
router.get('/:city_id', fetchHotelsByCityID);
router.put('/update/:hotel_id', verifyAdmin, upload.array('images', 3), updateHotelDetails);
router.delete('/delete/:hotel_id',verifyAdmin, deleteHotelById);

export default router;
