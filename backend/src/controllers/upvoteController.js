import { checkIfUpvoted, addUpvote, incrementUpvotes, removeUpvote, decrementUpvotes, getLikesCount } from '../models/upVoteModel.js';

export const upvoteController = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { userId } = req.body; // User ID from frontend

        // Check if the user has already upvoted the blog
        const alreadyUpvoted = await checkIfUpvoted(id, userId);

        if (alreadyUpvoted) {
            // If already upvoted, remove the upvote (downvote)
            await removeUpvote(id, userId);
            const updatedBlog = await decrementUpvotes(id);
            return res.status(200).json({ upvotes: updatedBlog.upvotes, action: 'downvote' });
        }

        // If not already upvoted, add the upvote
        await addUpvote(id, userId);
        const updatedBlog = await incrementUpvotes(id);

        // Return updated upvotes count
        res.status(200).json({ upvotes: updatedBlog.upvotes, action: 'upvote' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Check if the user has already upvoted the blog
export const checkUpvoteStatus = async (req, res) => {
    try {
      
        const { id } = req.params; // Get blogId from URL parameter
        const { user_id } = req.query; // Get userId from the request body

        // Check if the user has upvoted the blog
        const result = await checkIfUpvoted(id, user_id);

        // Respond with the status
        res.status(200).json({ hasUpvoted: result ? true : false });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const fetchLikesCount = async (req, res) => {
    try {
        const { id } = req.params; // Get blogId from URL parameter
        const result = await getLikesCount(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
