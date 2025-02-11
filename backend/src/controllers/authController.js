import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByEmailOrUsername } from '../models/User.js';

export const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: 'Please provide both email/username and password' });
    }

    try {
        // Search for the user by either email or username
        const user = await findUserByEmailOrUsername(emailOrUsername);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
