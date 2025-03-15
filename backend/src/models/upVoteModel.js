import pool from '../config/db.js';

// Check if the user has already upvoted the blog
export const checkIfUpvoted = async (blogId, userId) => {
    const query = `
        SELECT * FROM upvotes WHERE blog_id = $1 AND user_id = $2;
    `;
    const result = await pool.query(query, [blogId, userId]);
    return result.rows.length > 0; // Returns true if upvoted, false otherwise
};

// Add an upvote record to the upvotes table
export const addUpvote = async (blogId, userId) => {
    const query = `
        INSERT INTO upvotes (blog_id, user_id)
        VALUES ($1, $2)
        RETURNING blog_id, user_id;
    `;
    const result = await pool.query(query, [blogId, userId]);
    return result.rows[0]; // Returns the added upvote
};

// Increment the upvotes count for a blog
export const incrementUpvotes = async (blogId) => {
    const query = `
        UPDATE blogs
        SET upvotes = upvotes + 1
        WHERE id = $1
        RETURNING upvotes;
    `;
    const result = await pool.query(query, [blogId]);
    return result.rows[0]; // Returns the updated upvotes count
};


// Decrement the upvotes count and remove the upvote record
export const removeUpvote = async (blogId, userId) => {
    const query = `
        DELETE FROM upvotes
        WHERE blog_id = $1 AND user_id = $2
        RETURNING blog_id, user_id;
    `;
    const result = await pool.query(query, [blogId, userId]);
    return result.rows[0]; // Returns the deleted upvote
};

// Decrement the upvotes count for a blog
export const decrementUpvotes = async (blogId) => {
    const query = `
        UPDATE blogs
        SET upvotes = upvotes - 1
        WHERE id = $1
        RETURNING upvotes;
    `;
    const result = await pool.query(query, [blogId]);
    return result.rows[0]; // Returns the updated upvotes count
};


export const getLikesCount = async (blogId) => {
    const query = `
        SELECT count(*) as count FROM upvotes WHERE blog_id = $1 ;
    `;
    const result = await pool.query(query, [blogId]);
    return result.rows[0]; 
};