import pool from '../config/db.js';

export const addComment = async (blogId, userId, comment) => {
    const query = `
        INSERT INTO comments (blog_id, user_id, comment) 
        VALUES ($1, $2, $3) 
        RETURNING *;
    `;
    const values = [blogId, userId, comment];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getCommentsByBlogId = async (blogId) => {
    const query = 'SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC';
    const values = [blogId];
    const { rows } = await pool.query(query, values);
    return rows;
};

export const getCommentCountOfBlogId = async (blogId) => {
    const query = 'SELECT count(*) as count FROM comments WHERE blog_id = $1';
    const values = [blogId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
