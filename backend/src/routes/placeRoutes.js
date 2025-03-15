// src/routes/placeRoutes.js
import express from 'express';
import { addPlace, fetchPlacesByCityId, deleteFamousPlaceController, updateFamousPlaceDetails } from '../controllers/placeController.js';
import upload from '../middleware/multer.js'; // Assuming you have multer setup
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST route to add a famous place
router.post('/add', verifyAdmin, upload.single('image'), addPlace);

// GET route to fetch all famous places by city_id
router.get('/city/:city_id', fetchPlacesByCityId);
router.delete('/delete/:place_id',verifyAdmin, deleteFamousPlaceController);
router.put('/update/:place_id', verifyAdmin,  upload.single('image'), updateFamousPlaceDetails);

export default router;
