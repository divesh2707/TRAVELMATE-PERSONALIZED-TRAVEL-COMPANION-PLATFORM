import express from 'express';
import { createUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/authController.js';
import { getUsernameByEmail, getUseridByEmail, getUseridByUsername, getUsernameByUserId, fetchEmailByUsername } from '../controllers/usernameController.js';

const router = express.Router();

// POST /api/users/register
router.post('/register', createUser);

router.post('/login', loginUser);

router.get("/username", getUsernameByEmail);

router.get("/usernamebyuserid", getUsernameByUserId);

router.get("/useridbyemail", getUseridByEmail);

router.get("/useridbyusername", getUseridByUsername);

router.get("/emailbyusername",fetchEmailByUsername);

export default router;
