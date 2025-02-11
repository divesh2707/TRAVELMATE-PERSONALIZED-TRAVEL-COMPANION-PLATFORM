import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const BlogImagePreview = ({ preview, onRemovePhoto, onSubmit, loading }) => {
  return (
    <div className="image-preview-section">
      <div className="top-buttons">
        <button className="remove-photo-button" onClick={onRemovePhoto}>
          <IoMdArrowRoundBack size={25} />
        </button>
        <h1 className="top-heading">"Bring Your Moments to Life"</h1>
        <button className="share-button" onClick={onSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Share"}
        </button>
      </div>
      <img src={preview} alt="Preview" className="image-preview" />
    </div>
  );
};

export default BlogImagePreview;
