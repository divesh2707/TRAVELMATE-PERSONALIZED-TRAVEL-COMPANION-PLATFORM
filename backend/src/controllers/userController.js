import bcrypt from 'bcryptjs';
import { createUser as saveUser } from '../models/User.js';

export const createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
       

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        // Save user to the database
        const newUser = await saveUser(username, email, hashedPassword);
        

        res.status(201).json({ user: newUser});
    } catch (error) {
        next(error);
        console.log("Error is from here 2")
    }
};
