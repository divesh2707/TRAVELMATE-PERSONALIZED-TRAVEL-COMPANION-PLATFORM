import pool from '../config/db.js';

export const createBlog = async (userId, image, caption) => {
    const query = `
        INSERT INTO blogs (user_id, image, caption) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const values = [userId, image, caption];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getAllBlogs = async () => {
    const query = `
        SELECT id, user_id, encode(image, 'base64') AS image, caption, upvotes, created_at 
        FROM blogs 
        ORDER BY created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const getBlogsByUserId = async (userId) => {
    const query = 'SELECT * FROM blogs WHERE user_id = $1 ORDER BY created_at DESC';
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows;
};

export const getBlogCaptionWithHighLikes =async ()=>{
    const query=`select caption from blogs order by upvotes desc`;
    const result =await pool.query(query);
    return result.rows;
}