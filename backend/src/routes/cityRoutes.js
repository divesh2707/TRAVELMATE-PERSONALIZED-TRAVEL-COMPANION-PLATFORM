// src/routes/cityRoutes.js
import express from 'express';
 import { addCity, getCity, fetchCityIdByName } from '../controllers/cityController.js'
import upload from '../middleware/multer.js';

const router = express.Router();


// Routes for City
 router.post('/add', upload.single('image'), addCity);
 router.get('/name/:city_name', fetchCityIdByName);
 router.get('/:city_id', getCity); // GET route to get city by city_id
 

export default router;

