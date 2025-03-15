import bcrypt from 'bcryptjs';
import { createUser as saveUser, updateUsername, updateUserPassword, 
    updateUserEmail, checkUserEmail, checkUsername, checkPassword,
    addProfilePhotoQuery, updateProfilePhotoQuery, removeProfilePhotoQuery, getUserProfilePhotoQuery, getAllUsers, getBookedUsers } from '../models/User.js';
    
    export const createUser = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
    
            // Validation Rules
            const passwordRegex = {
                length: /.{8,}/,
                lowercase: /[a-z]/,
                uppercase: /[A-Z]/,
                numeric: /[0-9]/,
                specialChar: /[!@#$%^&*(),.?":{}|<>]/
            };
    
            const validateEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
    
            const validateUsername = (username) => {
                const usernameRegex = /^(?!.*\.\.)[a-zA-Z0-9._]*[a-zA-Z0-9][a-zA-Z0-9._]*$/;
                return usernameRegex.test(username);
            };

            // Check for unique username (case-insensitive)
            const existingUser = await checkUsername(username.toLowerCase());
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: "Username is already taken" });
            }
    
            // Check for unique email (case-insensitive)
            const existingEmail = await checkUserEmail(email.toLowerCase());
            if (existingEmail.rows.length > 0) {
                return res.status(400).json({ message: "Email is already in use" });
            }
    
            // Check if fields are empty
            if (!username || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // Validate username format
            if (!validateUsername(username)) {
                return res.status(400).json({ message: "Invalid username format" });
            }
    
            // Validate email format
            if (!validateEmail(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }
    
            // Validate password strength
            if (!passwordRegex.length.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long" });
            }
            if (!passwordRegex.lowercase.test(password)) {
                return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
            }
            if (!passwordRegex.uppercase.test(password)) {
                return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
            }
            if (!passwordRegex.numeric.test(password)) {
                return res.status(400).json({ message: "Password must contain at least one numeric digit" });
            }
            if (!passwordRegex.specialChar.test(password)) {
                return res.status(400).json({ message: "Password must contain at least one special character" });
            }
    
            
    
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Save user to the database
            const newUser = await saveUser(username, email, hashedPassword);
    
            res.status(201).json({ success: true, message: "User registered successfully", user: newUser });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Server error" });
            next(error); // Pass error to global error handler
        }
    };

export const fetchAllUsers = async(req, res) =>{
    try{
        const response = await getAllUsers();
        return res.status(200).json(response);
    }catch(err){
        res.status(500).json({message : "Server error"})
    }
}

export const fetchBookedUsers = async(req, res) =>{
    try{
        const response = await getBookedUsers();
        return res.status(200).json(response);
    }catch(err){
        res.status(500).json({message : "Server error"})
    }
}
    

export const updateUsernameController = async (req, res) => {
    try {
        const { newUsername, userId } = req.body;
        
        // Check if username is already taken
        const checkUser = await checkUsername(newUsername);
        if (checkUser.rows.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Update username
        await updateUsername(userId, newUsername);

        res.json({ message: "Username updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateEmail = async (req, res) => {
    try {
        const { newEmail, userId } = req.body;

        // Check if email is already taken
        const checkEmail = await checkUserEmail(newEmail);
        if (checkEmail.rows.length > 0) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Update email
        await updateUserEmail(userId, newEmail);

        res.json({ message: "Email updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, userId } = req.body;

        // Validate input fields
        if (!oldPassword || !newPassword || !userId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Get user's current password from DB
        const user = await checkPassword(userId); // Ensure this function retrieves the hashed password from the database

        if (!user || user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify old password
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        // Check if new password is the same as the old password
        if (oldPassword === newPassword) {
            return res.status(400).json({ message: "New password cannot be the same as the old password" });
        }

        // Validate new password strength
        const passwordRegex = {
            length: /.{8,}/,
            lowercase: /[a-z]/,
            uppercase: /[A-Z]/,
            numeric: /[0-9]/,
            specialChar: /[!@#$%^&*(),.?":{}|<>]/
        };

        if (!passwordRegex.length.test(newPassword)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        if (!passwordRegex.lowercase.test(newPassword)) {
            return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
        }
        if (!passwordRegex.uppercase.test(newPassword)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
        }
        if (!passwordRegex.numeric.test(newPassword)) {
            return res.status(400).json({ message: "Password must contain at least one numeric digit" });
        }
        if (!passwordRegex.specialChar.test(newPassword)) {
            return res.status(400).json({ message: "Password must contain at least one special character" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password in database
        await updateUserPassword(userId, hashedPassword);

        res.json({ success: true, message: "Password changed successfully" });

    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const addProfilePhoto = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const profilePhoto = req.file ? req.file.buffer : null;
        if (!profilePhoto) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        await addProfilePhotoQuery(userId, profilePhoto);
        res.status(201).json({ message: "Profile photo added successfully", profilePhoto });
    } catch (error) {
        console.error("Error in addProfilePhoto:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfilePhoto = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const profilePhoto = req.file ? req.file.buffer : null;

        if (!profilePhoto) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const existingUser = await getUserProfilePhotoQuery(userId);

        if (!existingUser.rows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        await updateProfilePhotoQuery(userId, profilePhoto);
        res.status(200).json({ message: "Profile photo updated successfully", profilePhoto });
    } catch (error) {
        console.error("Error in updateProfilePhoto:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const removeProfilePhoto = async (req, res) => {
    try {
        const userId = req.query.user_id;
        
        // Check if profile photo exists before deleting
        const existingPhoto = await getUserProfilePhotoQuery(userId);
        if (!existingPhoto.rows.length || !existingPhoto.rows[0].profile_photo) {
            return res.status(404).json({ message: "Profile photo not found" });
        }

        await removeProfilePhotoQuery(userId);
        res.status(200).json({ message: "Profile photo removed successfully" });
    } catch (error) {
        console.error("Error in removeProfilePhoto:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProfilePhoto = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const result = await getUserProfilePhotoQuery(userId);

        if (!result.rows.length || !result.rows[0].profile_photo) {
            return res.status(404).json({ message: "Profile photo not found" });
        }

        const base64Image = result.rows[0].profile_photo.toString("base64"); // Convert Buffer to Base64
        res.json({ profilePhoto: `data:image/jpeg;base64,${base64Image}` }); // Send as Base64 string
    } catch (error) {
        console.error("Error in getProfilePhoto:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const isCheckUsername=async(req, res)=>{
    try {
        const { username } = req.body;

        // Check if username is already taken
        const checkUser = await checkUsername(username);
        if (checkUser.rows.length > 0) {
            return res.json({ available: false });
        }

        res.json({ available: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ available: false, message: "Server error" });
    }
}