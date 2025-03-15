import express from 'express';
import { createUser, updateEmail, updateProfilePhoto, updateUsernameController, 
    changePassword, addProfilePhoto, getProfilePhoto, removeProfilePhoto, isCheckUsername, 
    fetchAllUsers, fetchBookedUsers} from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';
import upload from '../middleware/multer.js';
import { getUsernameByEmail, getUseridByEmail, getUseridByUsername, getUsernameByUserId, fetchEmailByUsername } from '../controllers/usernameController.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', createUser);

router.post('/login', loginUser);
router.get('/all', fetchAllUsers);
router.get('/allBooked', fetchBookedUsers);

router.get("/username", getUsernameByEmail);

router.get("/usernamebyuserid", getUsernameByUserId);

router.get("/useridbyemail", getUseridByEmail);

router.get("/useridbyusername", getUseridByUsername);

router.get("/emailbyusername",fetchEmailByUsername);

router.post("/add-profile-photo",  upload.single("profile_photo"), addProfilePhoto);
router.put("/update-profile-photo",  upload.single("profile_photo"), updateProfilePhoto);
router.delete("/remove-profile-photo",  removeProfilePhoto);
router.get("/get-profile-photo",  getProfilePhoto);
router.put("/update-username" ,updateUsernameController);
router.put("/update-email", updateEmail);
router.put("/change-password", changePassword);
router.post("/check-username", isCheckUsername);

export default router;
