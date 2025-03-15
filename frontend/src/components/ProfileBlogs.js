import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TbSearchOff } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import Loader from "../components/Loader.js";
import ProfileBlogModal from "./profileBlogModal.js";
import "../styles/ProfileBlogs.css";

const ProfileBlogs = ({ fetchBlogLength }) => {
    const { user_id } = useContext(AuthContext);
    const [likesCount, setLikesCount] = useState({});
    const [commentsCount, setCommentsCount] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axiosInstance.get(`/blogs/${user_id}`);
                setBlogs(res.data);
            } catch (err) {
                console.log(err);
            } finally{
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [user_id]);  // Dependency added for re-fetching if user_id changes

    // Separate useEffect to update blog length whenever blogs update
    useEffect(() => {
        fetchBlogLength(blogs.length);
    }, [blogs, fetchBlogLength]); // Depend on blogs so it updates correctly

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const counts = {};
                await Promise.all(
                    blogs.map(async (blog) => {
                        const res = await axiosInstance.get(`/blog/${blog.id}/commentCount`);
                        counts[blog.id] = res.data.count;
                    })
                );
                setCommentsCount(counts);
            } catch (err) {
                console.log(err);
            }
        };
        if (blogs.length > 0) {
            fetchCommentCount();
        }
    }, [blogs]);

    useEffect(() => {
        const fetchLikesCount = async () => {
            try {
                const counts = {};
                await Promise.all(
                    blogs.map(async (blog) => {
                        const res = await axiosInstance.get(`/blog/${blog.id}/likesCount`);
                        counts[blog.id] = res.data.count;
                    })
                );
                setLikesCount(counts);
            } catch (err) {
                console.log(err);
            }
        };
        if (blogs.length > 0) {
            fetchLikesCount();
        }
    }, [blogs]);

    const openModal = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    // Function to handle closing the modal
    const closeModal = () => {
        setSelectedBlog(null);
        setIsModalOpen(false);
    };

    const updateCommentCount = (blogId) => {
        setCommentsCount((prevCounts) => ({
            ...prevCounts,
            [blogId]: (Number(prevCounts[blogId]) || 0) + 1, // Convert to number and increment
        }));
    };

    const updateLikeCount = (blogId, likes) => {
        setLikesCount((prevCounts) => ({
            ...prevCounts,
            [blogId]: Number(likes), // Convert to number and increment
        }));

        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
                blog.id === blogId ? { ...blog, upvotes: Number(likes) } : blog
            )
        );
    };

    const handleDelete = async (blogId) => {
        try {
            await axiosInstance.delete(`/blogs/${blogId}`);
            
            // Update state to remove the deleted blog
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));

            // Update blog length
            fetchBlogLength(blogs.length - 1);

            setIsModalOpen(false); // Close the modal after deletion
        } catch (err) {
            console.error("Error deleting blog:", err);
            alert("Failed to delete the blog. Please try again.");
        }
    };
    

    return (
        <> 
            <div>
                <div className="profile-exp">
                    <BsFillGrid3X3GapFill size={15} /> POSTS
                </div>
                {loading ? (
                    <Loader />
                ) :(
                <div className="profile-blog">  
                    { blogs.length > 0 ? 
                    (
                        <>
                        {blogs.map((blog) => (
                            <>
                                <div key={blog.id} className="profile-blog-item" onClick={() => openModal(blog)}>
                                    <img src={blog.image} alt={blog.caption} />
                                    <div className="profile-blog-overlay">
                                        <div className="profile-blog-info">
                                                <div className="profile-blog-infos"><FaHeart /> {likesCount[blog.id] || 0}</div>
                                                <div className="profile-blog-infos"><FaComment /> {commentsCount[blog.id] || 0}</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                        </> 
                    ):
                    (
                       <div style={{display:"flex", gap:"20px", alignItems:"center", justifyContent:"center", margin:"100px 270px"}}>
                            <TbSearchOff size={130} color="black"/>
                              <h3 style={{fontSize:"55px", margin:"0"}}> <span style={{ color: "#2196F3" }}>No,</span> Posts yet!</h3>
                        </div>
                    )}
                </div>)}
            </div>

            {isModalOpen && selectedBlog && (
                <ProfileBlogModal blog={selectedBlog} onDelete={handleDelete} onClose={closeModal} updateCommentCount={updateCommentCount} updateLikeCount={updateLikeCount}/>
            )}
        </>
    );
};

export default ProfileBlogs;
