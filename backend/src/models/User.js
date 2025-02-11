import pool from '../config/db.js';

export const createUser = async (username, email, hashedPassword) => {
    try{
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await pool.query(query, [username, email, hashedPassword]);
    return result.rows[0];
   
    }
    catch(err){
        console.log("User cannot inserted, query error")
    }
};

//Find user by email or username
export const findUserByEmailOrUsername = async (emailOrUsername) => {
    const query = `
        SELECT * FROM users 
        WHERE email = $1 OR username = $2
    `;
    const result = await pool.query(query, [emailOrUsername, emailOrUsername]);
    return result.rows[0];  // Return the first matching user (if any)
};

export const findUsernameByEmail = async(emailOrUsername) => {
    const query = `
        SELECT username FROM users
        WHERE email = $1
    `;
    const result = await pool.query(query, [emailOrUsername]);
    return result;
}

export const findUseridByEmail = async(emailOrUsername) => {
    const query = `
        SELECT user_id FROM users
        WHERE email = $1
    `;
    const result = await pool.query(query, [emailOrUsername]);
    return result;
}

export const findUseridByUsername = async(emailOrUsername) => {
    const query = `
        SELECT user_id FROM users
        WHERE username = $1
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
    const query=`Select email from users where username=$1`
    const result= await pool.query(query,[username]);
    return result.rows[0];
}
