import express from 'express';
import upload from '../middleware/multer.js';
import {
    createBlogController,
    getAllBlogsController,
    getBlogsForUser,
    fetchBlogCaptionsWithHighLikes,
} from '../controllers/blogController.js';

const router = express.Router();

router.post('/blog', upload.single('image'), createBlogController);
router.get('/blogs', getAllBlogsController);
router.get('/blogs/captions', fetchBlogCaptionsWithHighLikes);
router.get('/blogs/:user_id', getBlogsForUser);



export default router;
