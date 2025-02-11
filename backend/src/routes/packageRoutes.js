import express from 'express';
import { addPackage,fetchPackagesByCityId,fetchDetailedPackage } from '../controllers/packageController.js';
const router = express.Router();


// Add a new package
router.post('/add', addPackage);

// Get packages by city_id
router.get('/city/:city_id', fetchPackagesByCityId);

//detailed package of city
router.get('/details/:city_id', fetchDetailedPackage);

export default router;

