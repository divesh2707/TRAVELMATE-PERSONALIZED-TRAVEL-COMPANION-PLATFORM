import express from 'express';
import { upvoteController, checkUpvoteStatus } from '../controllers/upvoteController.js';

const router = express.Router();

// Route to handle upvoting a blog
router.post('/:id/upvote', upvoteController);
router.get('/:id/upvote/status', checkUpvoteStatus); 

export default router;
