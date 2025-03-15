import express from 'express';
import { addCommentController, fetchCommentCountForBlog, getCommentsForBlog } from '../controllers/commentController.js';

const router = express.Router();

router.post('/:id/comment', addCommentController);  // Corrected the route path

router.get('/:id/comments', getCommentsForBlog);

router.get('/:id/commentCount', fetchCommentCountForBlog);

export default router;
