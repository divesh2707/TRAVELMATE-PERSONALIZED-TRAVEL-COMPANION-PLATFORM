import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "./CommentModal"; // Import the modal component
import "../styles/Comment.css";

const Comment = ({ blogId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="comment-button" onClick={openModal}>
        <FaRegComment /> 
      </button>

      {isModalOpen && (
         ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal}>
                &times;
            </button>
            <CommentModal blogId={blogId}  />
        </div>
      </div>,
      document.getElementById("modal-root") // Add this div in your HTML
         )
      )}
    </>
  );
};

export default Comment;
