import React, { useState, useEffect, useContext, useRef } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import "../styles/ProfileBlogComment.css";

const ProfileBlogComment = ({ blogId, caption, updateCommentCount }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { username } = useContext(AuthContext);
  const [captionProfilePhoto, setCaptionProfilePhoto] = useState(null);
  const [userData, setUserData] = useState({});

  const userId = localStorage.getItem("user_id");
  const commentsContainerRef = useRef(null); // Ref for comments container

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      try {
        const response = await axiosInstance.get(`/users/get-profile-photo?user_id=${userId}`);
        if (response.data.profilePhoto) {
          setCaptionProfilePhoto(response.data.profilePhoto);
        }
      } catch (err) {
        console.log("Error fetching profile photo:", err);
      }
    };
    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${blogId}/comments`);
        setComments(response.data);

        const userIds = [...new Set(response.data.map(comment => comment.user_id))];

        const userResponses = await Promise.all(
          userIds.map(async (id) => {
            const [usernameResponse, photoResponse] = await Promise.all([
              axiosInstance.get(`/users/usernamebyuserid?user_id=${id}`),
              axiosInstance.get(`/users/get-profile-photo?user_id=${id}`)
            ]);

            return {
              userId: id,
              username: usernameResponse.data.username,
              profilePhoto: photoResponse.data.profilePhoto || null
            };
          })
        );

        const userDataMap = userResponses.reduce((acc, user) => {
          acc[user.userId] = { username: user.username, profilePhoto: user.profilePhoto };
          return acc;
        }, {});

        setUserData(userDataMap);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/blog/${blogId}/comment`, { 
        comment: newComment, 
        userId 
      });

      setComments([response.data, ...comments]);
      setNewComment("");
      updateCommentCount(blogId);

      // Scroll to the top of the comments list
      setTimeout(() => {
       
        commentsContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

      }, 100);
      
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <>
      <h2 className="profile-blog-cheading">Comments</h2>
      <div className="profile-blog-comments-list" ref={commentsContainerRef}>
        {caption.trim() && (
          <div className="profile-blog-comment-item">
            <div className="profile-blog-comment-icon-username" style={{ marginTop: captionProfilePhoto ? "10px" : "8px" }}>
              {captionProfilePhoto ? (
                <img src={captionProfilePhoto} alt="profile-photo"/>
              ) : (
                <span className="profile-blog-icon"><FaUserCircle size={20} color="grey" /></span>
              )}
              <span className="profile-blog-username">{username}</span>
            </div>
            <p style={{ margin: "12px 10px" }}>{caption}</p>
          </div>
        )}

        {comments.length === 0 && caption === "" ? (
          <div className="profile-blog-no-comments">
            <p>Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="profile-blog-comment-item">
              <div className="profile-blog-comment-icon-username" style={{ marginTop: userData[comment.user_id]?.profilePhoto ? "10px" : "8px" }}>
                {userData[comment.user_id]?.profilePhoto ? (
                  <img src={userData[comment.user_id].profilePhoto} alt="Profile-photo"/>
                ) : (
                  <span className="profile-blog-icon"><FaUserCircle size={20} color="grey" /></span>
                )}
                <span className="profile-blog-username">{userData[comment.user_id]?.username || "Guest"}</span>
              </div>
              <p style={{ margin: "12px 10px" }}>{comment.comment}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleCommentSubmit} className="profile-blog-comment-form">
        <div className="profile-blog-foot">
          <input className="profile-blog-ibox" type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Drop a comment..."/>
          <button type="submit"><IoSendSharp size={25} /></button>
        </div>
      </form>
    </>
  );
};

export default ProfileBlogComment;
