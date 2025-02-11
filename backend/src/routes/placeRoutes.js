// src/routes/placeRoutes.js
import express from 'express';
import { addPlace, fetchPlacesByCityId } from '../controllers/placeController.js';
import upload from '../middleware/multer.js'; // Assuming you have multer setup

const router = express.Router();

// POST route to add a famous place
router.post('/add', upload.single('image'), addPlace);

// GET route to fetch all famous places by city_id
router.get('/city/:city_id', fetchPlacesByCityId);

export default router;
