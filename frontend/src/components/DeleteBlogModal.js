import React from "react";
import "../styles/DeleteBlogModal.css";

const DeleteBlogModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-blog-modal-overlay" onClick={onCancel}>
      <div className="delete-blog-modal-content" onClick={(e) => e.stopPropagation()}>
        <p style={{fontSize:"18px",}}>Are you sure you want to delete this post?</p>
        <div className="delete-blog-modal-buttons">
          <button onClick={onConfirm} className="delete-blog-confirm">Delete</button>
          <button onClick={onCancel} className="delete-blog-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
