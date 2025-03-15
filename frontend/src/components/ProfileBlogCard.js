import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext';
import "../styles/ProfileBlogCard.css";
import LikeButton from '../components/LikeButton'; // Import LikeButton component
import { FaRegComment } from "react-icons/fa";

const BlogCard = ({ blog, setterCaption, updateLikeCount }) => {
    const { image, caption,  id: blog_id, upvotes } = blog;
    const {username} = useContext(AuthContext);
    const [profilePhoto, setProfilePhoto]=useState(null);

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const userId = localStorage.getItem("user_id");
                if (!userId) return;
    
                const response = await axiosInstance.get(`/users/get-profile-photo?user_id=${userId}`);
    
                if (response.data.profilePhoto) {
                    setProfilePhoto(response.data.profilePhoto); // No need to convert manually
                }
            } catch (err) {
                console.log("Error fetching profile photo:", err);
            }
        };
        fetchProfilePhoto();
    }, []);  

    // If the image is available, display it; otherwise, show a placeholder image
    const imageUrl = image || 'https://via.placeholder.com/300';

    useEffect(()=>{
        const setCaption = ()=>{
            setterCaption(caption);
        }
        if(caption){
            setCaption();
        }
    },[blog]);

    return (
        <div className="profile-blog-card">
            <div className="profile-blog-header">
            {!profilePhoto?(<FaUserCircle ize={24} className="profile-profile-icon" />):
                <img src={profilePhoto} alt="profile-photo"/>}
                <span className="profile-username">{username}</span>
            </div>
            <img src={imageUrl} alt="Blog" className="profile-blog-image" />
            <div className="profile-blog-content">
                {/* <p className="profile-blog-caption">{caption}</p> */}
                <div className="profile-blog-footer">
                    {/* Use the LikeButton component and pass blog_id and initialLikes as props */}
                    <LikeButton blog_id={blog_id} initialLikes={upvotes} updateLikeCount={updateLikeCount}/>
                    <button className="comment-button" >
                            <FaRegComment /> 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
