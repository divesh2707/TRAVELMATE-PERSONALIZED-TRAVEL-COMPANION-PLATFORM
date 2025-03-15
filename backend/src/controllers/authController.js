import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import { findUserByEmailOrUsername, findUseridByEmail, updateUserPassword } from '../models/User.js';

const SECRET_KEY = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
        return res.status(400).json({ error: 'Please provide both email/username and password' });
    }

    try {
        // Search for the user by either email or username
        const user = await findUserByEmailOrUsername(emailOrUsername);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, role: user.role });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await findUseridByEmail(email);
        if (!user.rows[0]) return res.status(404).json({ message: "User not found" });
        // Generate token (valid for 1 hour)
        const token = jwt.sign({ id: user.rows[0].user_id }, SECRET_KEY, { expiresIn: "1h" });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await transporter.sendMail({
            from: `"TravelMate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset Request",
            html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 40px 0; background-color: #f4f4f4;">
    <div style="max-width: 500px; width: 100%; background: #ffffff; padding: 20px; border-radius: 8px; 
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); margin: 0 auto;">
        <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            We received a request to reset your <strong>TravelMate</strong> account password. Click the button below to set a new password:
        </p>
        <a href="${resetLink}" 
           style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 20px; 
                  font-size: 16px; border-radius: 5px; margin-top: 10px; font-weight: bold;">
            Reset Password
        </a>
        <p style="color: #777; font-size: 14px; margin-top: 20px; line-height: 1.5;">
            If you didn't request this, you can safely ignore this email. This link will expire in <strong>1 hour</strong>.
        </p>
        <p style="color: #555; font-size: 14px; font-weight: bold; margin-top: 20px;">
            Thank you for being a part of <span style="color: #007bff;">TravelMate</span>!
        </p>
        <p style="color: #777; font-size: 12px; margin-top: 5px;">Regards, <br><strong>TravelMate Team</strong></p>
    </div>
</div>
`,
        });

        res.json({ message: "Password reset link sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// **Reset Password**
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await updateUserPassword(decoded.id, hashedPassword);

        res.json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

export const verifyResetToken = (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, SECRET_KEY); // Verify JWT token
        res.json({ valid: true, userId: decoded.id });
    } catch (error) {
        res.status(400).json({ valid: false, message: "Invalid or expired token" });
    }
};