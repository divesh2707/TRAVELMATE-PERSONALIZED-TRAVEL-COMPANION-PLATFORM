import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import "../styles/CommentModal.css";

const CommentModal = ({ blogId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [usernames, setUsernames] = useState({}); // To store usernames by userId
  const { username } = useContext(AuthContext);

  // Function to get user_id from username
  const getUserId = async () => {
    try {
      const response = await axiosInstance.get(`/users/useridbyusername?username=${username}`);
      return response.data.user_id;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      alert('Failed to fetch user ID. Please try again.');
      throw error;
    }
  };

  // Fetch comments and usernames
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${blogId}/comments`);
        setComments(response.data);

        // Fetch usernames for each comment's userId
        const usernamesResponse = {};
        for (const comment of response.data) {
          const usernameResponse = await axiosInstance.get(`/users/usernamebyuserid?user_id=${comment.user_id}`);
          
          usernamesResponse[comment.user_id] = usernameResponse.data.username;
        }
        setUsernames(usernamesResponse);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user_id = await getUserId();
    
    if (newComment.trim()) {
      try {
        const response = await axiosInstance.post(`/blog/${blogId}/comment`, { comment: newComment, userId: user_id });
        setComments([...comments, response.data]); // Add the new comment to the list
        setNewComment(""); // Clear the input


  
      } catch (err) {
        console.error("Error posting comment:", err);
      }
    }
  };

  return (
     <>
        <h2 className="cheading">Comments</h2>
        <div className="comments-list">
            {comments.length === 0 ? (
    <div className="no-comments">
      <p>Be the first to comment !</p>
    </div>
  ) : (
    comments.map((comment, index) => (
      <div key={index} className="comment-item">
        <span className="icon"><FaUserCircle size={20} color="grey" /></span>
        <span className="username">{usernames[comment.user_id] || "Guest"} </span>
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
