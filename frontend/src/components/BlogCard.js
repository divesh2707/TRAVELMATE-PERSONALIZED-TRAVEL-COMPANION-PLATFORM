import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import "../styles/BlogCard.css";
import LikeButton from '../components/LikeButton'; // Import LikeButton component
import Comment from './Comment'

const BlogCard = ({ blog }) => {
    const { image, caption, username: user_name, id: blog_id, upvotes } = blog;

    // If the image is available, display it; otherwise, show a placeholder image
    const imageUrl = image || 'https://via.placeholder.com/300';

    return (
        <div className="blog-card">
            <div className="blog-header">
                <FaUserCircle className="profile-icon" />
                <span className="username">{user_name}</span>
            </div>
            <img src={imageUrl} alt="Blog" className="blog-image" />
            <div className="blog-content">
                <p className="blog-caption">{caption}</p>
                <div className="blog-footer">
                    {/* Use the LikeButton component and pass blog_id and initialLikes as props */}
                    <LikeButton blog_id={blog_id} initialLikes={upvotes} />
                    <Comment blogId={blog_id}/>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
