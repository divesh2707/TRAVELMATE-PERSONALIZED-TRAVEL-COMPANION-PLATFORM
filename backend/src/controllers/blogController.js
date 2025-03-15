import { createBlog, getAllBlogs, getBlogsByUserId, getBlogCaptionWithHighLikes, deleteBlog} from '../models/blogModel.js';
import {findUsernameByUserid} from '../models/User.js'

export const createBlogController = async (req, res) => {
    try {
        const { caption, user_id } = req.body;
        const image = req.file.buffer; // Binary image data
        console.log(req.file.buffer)
        const blog = await createBlog(user_id, image, caption);
        res.status(201).json(blog);
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
};

export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await getAllBlogs();

        // Map through blogs and add username asynchronously
        const blogsWithImagesAndUsernames = await Promise.all(
            blogs.map(async (blog) => {
                const base64Image = blog.image ? `data:image/jpeg;base64,${blog.image.toString('base64')}` : null;

                // Fetch username by user_id
                const username = await findUsernameByUserid(blog.user_id);
                console.log(username);

                return {
                    ...blog,
                    image: base64Image,
                    username: username.username || "Guest" // Fallback if no username is found
                };
            })
        );

        res.status(200).json(blogsWithImagesAndUsernames);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getBlogsForUser = async (req, res) => {
    const { user_id } = req.params;

    try {
        const blogs = await getBlogsByUserId(user_id);
        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found for this user' });
        }

        // Convert image from binary to Base64
        const blogsWithImages = blogs.map(blog => {
            const base64Image = blog.image ? `data:image/jpeg;base64,${blog.image.toString('base64')}` : null;
            return {
                ...blog,
                image: base64Image
            };
        });

        return res.json(blogsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching blogs' });
    }
};


export const fetchBlogCaptionsWithHighLikes= async (req,res) => {
    try{
        const response=await getBlogCaptionWithHighLikes();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const deleteBlogId =async (req, res)=>{
    try{
        const {blog_id}= req.params;
        const response=await deleteBlog(blog_id);
        res.status(200).json(response);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}