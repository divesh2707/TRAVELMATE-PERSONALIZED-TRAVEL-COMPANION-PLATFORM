import { addComment, getCommentsByBlogId, getCommentCountOfBlogId } from '../models/commentModel.js';

export const addCommentController = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { userId, comment } = req.body;

        const newComment = await addComment(id, userId, comment);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getCommentsForBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const comments = await getCommentsByBlogId(id);
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this blog' });
        }
        return res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching comments' });
    }
};

export const fetchCommentCountForBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const commentCount = await getCommentCountOfBlogId(id);
        return res.json(commentCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching comment Count' });
    }
};