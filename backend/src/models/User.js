import pool from '../config/db.js';

export const createUser = async (username, email, hashedPassword, role = "customer") => {
    try{
    const query = `
        INSERT INTO users (username, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const result = await pool.query(query, [username, email, hashedPassword, role]);
    return result.rows[0];
   
    }
    catch(err){
        console.log("User cannot inserted, query error")
        throw err;
    }
};

export const getAllUsers = async () => {
    try{
    const query = `SELECT * from users where role = 'customer'`;
    const result = await pool.query(query);
    return result.rows;
   
    }
    catch(err){
        console.log("Users cannot retreived")
        throw err;
    }
};

export const getBookedUsers = async () => {
    try{
    const query = `SELECT distinct u.username, u.email, u.profile_photo, u.user_id from users u join booked_package b on u.user_id=b.user_id where u.role= 'customer'`;
    const result = await pool.query(query);
    return result.rows;
    }
    catch(err){
        console.log("Users cannot retreived")
        throw err;
    }
};

//Find user by email or username
export const findUserByEmailOrUsername = async (emailOrUsername) => {
    const query = `
        SELECT * FROM users 
        WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($2)
    `;
    const result = await pool.query(query, [emailOrUsername, emailOrUsername]);
    return result.rows[0];  // Return the first matching user (if any)
};


export const findUsernameByEmail = async(emailOrUsername) => {
    const query = `
        SELECT username FROM users
        WHERE Lower(email) = Lower($1)
    `;
    const result = await pool.query(query, [emailOrUsername]);
    return result;
}

export const findUseridByEmail = async(emailOrUsername) => {
    const query = `
        SELECT user_id FROM users   
        WHERE Lower(email) = Lower($1)
    `;
    const result = await pool.query(query, [emailOrUsername]);
    return result;
}

export const findUseridByUsername = async(emailOrUsername) => {
    const query = `
        SELECT user_id FROM users
        WHERE Lower(username) = Lower($1)
    `;
    const result = await pool.query(query, [emailOrUsername]);
    return result;
}


export const findUsernameByUserid = async(user_id) => {
    const query = `
        SELECT username FROM users
        WHERE user_id = $1
    `;
    const result = await pool.query(query, [user_id]);
    return result.rows[0];
}

export const findemailbyusername =async(username)=>{
    const query=`Select email from users where Lower(username)=Lower($1)`
    const result= await pool.query(query,[username]);
    return result.rows[0];
}

export const updateUserPassword = async (userId, hashedPassword) => {
    await pool.query("UPDATE users SET password = $1 WHERE user_id = $2", [hashedPassword, userId]);
};

export const updateUsername = async (userId, username) => {
    await pool.query("UPDATE users SET username = $1 WHERE user_id = $2", [username, userId]);
};

export const updateUserEmail = async (userId, email) => {
    await pool.query("UPDATE users SET email = $1 WHERE user_id = $2", [email, userId]);
};

export const checkUsername = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE LOWER(username) = LOWER($1)", 
        [username]
    );
    return result;
};

export const checkUserEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1)", 
        [email]
    );
    return result;
};


export const checkPassword = async (user_id) => {
    const result = await pool.query("SELECT password FROM users WHERE user_id = $1", [user_id]);
    return result;
};


export const addProfilePhotoQuery = async (userId, profilePhoto) => {
    return await pool.query("UPDATE users SET profile_photo = $1 WHERE user_id = $2", [profilePhoto, userId]);
};

export const updateProfilePhotoQuery = async (userId, profilePhoto) => {
    return await pool.query("UPDATE users SET profile_photo = $1 WHERE user_id = $2", [profilePhoto, userId]);
};

export const removeProfilePhotoQuery = async (userId) => {
    return await pool.query("UPDATE users SET profile_photo = NULL WHERE user_id = $1", [userId]);
};

export const getUserProfilePhotoQuery = async (userId) => {
    return await pool.query("SELECT profile_photo FROM users WHERE user_id = $1", [userId]);
};
