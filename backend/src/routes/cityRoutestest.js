import express from 'express';
import { getCityDetails } from '../controllers/opentrimap.js';
import { getTourismDetailsForCity} from '../controllers/wiki.js'

const router = express.Router();

// Route for fetching city details
router.get('/city-details', getTourismDetailsForCity);

export default router;
cityDetailsController