import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axios";
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import "../styles/CommentModal.css";

const CommentModal = ({ blogId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [usernames, setUsernames] = useState({}); // To store usernames by userId
  const [profilePhotos, setProfilePhotos] = useState({});
  const commentsContainerRef = useRef(null);

  const userId = localStorage.getItem("user_id");

  // Fetch comments and usernames
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${blogId}/comments`);
        setComments(response.data);

        // Fetch usernames for each comment's userId
        const usernamesResponse = {};
        const photosResponse = {};
        for (const comment of response.data) {
          const usernameResponse = await axiosInstance.get(`/users/usernamebyuserid?user_id=${comment.user_id}`);   
          usernamesResponse[comment.user_id] = usernameResponse.data.username;

          const photoResponse = await axiosInstance.get(`/users/get-profile-photo?user_id=${comment.user_id}`);
            if (photoResponse.data.profilePhoto) {
              photosResponse[comment.user_id] = photoResponse.data.profilePhoto;
            }
        }
        setUsernames(usernamesResponse);
        setProfilePhotos(photosResponse);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
  
    if (newComment.trim()) {
      try {
        const response = await axiosInstance.post(`/blog/${blogId}/comment`, { 
          comment: newComment, 
          userId
        });
  
        // Prepend the new comment to display it at the top
        setComments([response.data, ...comments]);
        setNewComment(""); // Clear the input

        setTimeout(() => {
       
          commentsContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  
        }, 100);

      } catch (err) {
        console.error("Error posting comment:", err);
      }
    }
  };

  return (
     <>
        <h2 className="cheading">Comments</h2>
        <div className="comments-list" ref={commentsContainerRef}>
            {comments.length === 0 ? (
    <div className="no-comments">
      <p>Be the first to comment !</p>
    </div>
  ) : (
    comments.map((comment, index) => (
      <div key={index} className="comment-item">
        <div className="comment-icon-username">
          
          {!profilePhotos[comment.user_id] ? (<span className="icon"><FaUserCircle size={20} color="grey" /></span>):
          <img src={profilePhotos[comment.user_id]} alt="Profile-photo" />}
          <span className="username">{usernames[comment.user_id] || "Guest"} </span>
        </div>
        <p style={{ margin: "12px 10px" }}>{comment.comment}</p>
      </div>
    ))
  )}
        </div>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <div className="foot">
            <input className="ibox" type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Drop a comment..."/>
            <button type="submit"><IoSendSharp size={25} /></button>
          </div>
        </form>
      </>
  );
};

export default CommentModal;
