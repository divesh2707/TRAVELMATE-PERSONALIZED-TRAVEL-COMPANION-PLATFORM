import express from 'express';
import { addPackage,fetchPackagesByCityId,fetchDetailedPackage, updatePackageController, fetchCityIdByPackageId } from '../controllers/packageController.js';
const router = express.Router();
import { verifyAdmin } from '../middleware/authMiddleware.js';

// Add a new package
router.post('/add',verifyAdmin, addPackage);

// Get packages by city_id
router.get('/city/:city_id', fetchPackagesByCityId);

//detailed package of city
router.get('/details/:city_id', fetchDetailedPackage);

router.put('/update/:package_id', verifyAdmin, updatePackageController);

router.get('/city_id/:package_id', fetchCityIdByPackageId);

export default router;

