import React, { useState, useContext, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axiosInstance from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import "../styles/LikeButton.css";

const LikeButton = ({ blog_id, initialLikes, updateLikeCount }) => {
    const { username, user_id: userId } = useContext(AuthContext);
    const [likes, setLikes] = useState(initialLikes || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [burst, setBurst] = useState(false); // Track burst animation

    // Function to check if the user has already upvoted the blog
    const checkIfLiked = async () => {
        try {
            const response = await axiosInstance.get(`/blog/${blog_id}/upvote/status?user_id=${userId}`);
            if (response.data.hasUpvoted) {
                setIsLiked(true); // If already upvoted, mark as liked
                
            }
        } catch (err) {
            console.error('Error checking like status:', err);
        }
    };

    // Check if the user has already liked the blog when the component mounts
    useEffect(() => {
        checkIfLiked();
    }, [username, blog_id]);

    // Handle like/dislike button click
    const handleLike = async () => {
        if (isLiked) {
            // If already liked, perform downvote
            try {
                const response = await axiosInstance.post(`/blog/${blog_id}/upvote`, {userId});

                if (response.status === 200 && response.data.action === 'downvote') {
                    setLikes(response.data.upvotes); // Update likes count after downvote
                    setIsLiked(false); // Toggle to "not liked"
                    setBurst(true); // Trigger burst effect
                    if(updateLikeCount)
                        updateLikeCount(blog_id, response.data.upvotes);
                }
            } catch (err) {
                console.error('Error while downvoting:', err);
                alert(err.response?.data?.error || 'An error occurred while downvoting.');
            }
        } else {
            // If not liked, perform upvote
            try {
                const response = await axiosInstance.post(`/blog/${blog_id}/upvote`, {userId});

                if (response.status === 200 && response.data.action === 'upvote') {
                    setLikes(response.data.upvotes); // Update likes count after upvote
                    setIsLiked(true); // Toggle to "liked"
                    setBurst(true); // Trigger burst effect
                    if(updateLikeCount)
                        updateLikeCount(blog_id, response.data.upvotes);
                }
            } catch (err) {
                console.error('Error while upvoting:', err);
                alert(err.response?.data?.error || 'An error occurred while upvoting.');
            }
        }
    };

    return (
        <button onClick={handleLike} className={`like-button ${isLiked ? 'liked' : ''}`}>
        <span className={` ${burst ? 'burst' : ''}`} onAnimationEnd={() => setBurst(false)}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
        </span>
        <span className='likes'>{likes}</span>
        </button>
    );
};

export default LikeButton;
