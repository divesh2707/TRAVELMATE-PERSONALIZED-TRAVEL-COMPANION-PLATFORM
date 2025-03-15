import express from 'express';
import { upvoteController, checkUpvoteStatus, fetchLikesCount } from '../controllers/upvoteController.js';

const router = express.Router();

// Route to handle upvoting a blog
router.post('/:id/upvote', upvoteController);
router.get('/:id/upvote/status', checkUpvoteStatus); 
router.get('/:id/likesCount',fetchLikesCount)

export default router;
