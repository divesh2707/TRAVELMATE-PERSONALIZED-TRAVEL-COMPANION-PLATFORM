// src/routes/cityRoutes.js
import express from 'express';
 import { addCity, getCity, fetchCityIdByName, deleteCityController, updateCityController, fetchAllCities } from '../controllers/cityController.js'
import upload from '../middleware/multer.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


// Routes for City
 router.post('/add', verifyAdmin, upload.single('image'), addCity);
 router.get('/search/:name', fetchCityIdByName);
 router.get('/:city_id', getCity); // GET route to get city by city_id
 router.delete('/delete/:city_id', verifyAdmin, deleteCityController);
 router.put('/update/:city_id', verifyAdmin, upload.single('image'), updateCityController);
 router.get('/get/all', fetchAllCities);

export default router;

