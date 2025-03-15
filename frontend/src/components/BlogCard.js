import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import "../styles/BlogCard.css";
import LikeButton from '../components/LikeButton'; // Import LikeButton component
import Comment from './Comment'
import axiosInstance from '../api/axios';

const BlogCard = ({ blog }) => {
    const { image, caption, username: user_name, id: blog_id, upvotes } = blog;
    const [userId, setuserId]= useState(0);
    const [profilePhoto, setProfilePhoto]=useState(null);

    // If the image is available, display it; otherwise, show a placeholder image
    const imageUrl = image || 'https://via.placeholder.com/300';

    useEffect(()=>{
        const fetchUserId=async()=>{
            try{
                const res = await axiosInstance.get(`/users/useridbyusername?username=${user_name}`);
                setuserId(res.data.user_id);
            }catch(err){
                console.log(err);
            }
        }
        fetchUserId();
    });

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await axiosInstance.get(`/users/get-profile-photo?user_id=${userId}`);
    
                if (response.data.profilePhoto) {
                    setProfilePhoto(response.data.profilePhoto); // No need to convert manually
                }
            } catch (err) {
                console.log("Error fetching profile photo:", err);
            }
        };
        fetchProfilePhoto();
    }, [userId]); 

    return (
        <div className="blog-card">
            <div className="blog-header" >
            {!profilePhoto?(<FaUserCircle  size={24} className="profile-icon" />):
                <img src={profilePhoto} alt="profile-photo"/>}
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
