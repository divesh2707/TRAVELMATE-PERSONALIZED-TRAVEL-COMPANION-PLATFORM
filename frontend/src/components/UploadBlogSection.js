import React from "react";

const UploadBlogSection = ({ onFileChange }) => {
  return (
    <div className="file-upload-section">
      <label className="upload-button">
        Upload & Inspire
        <input className="upload-file" type="file" accept="image/*" onChange={onFileChange} />
      </label>
    </div>
  );
};

export default UploadBlogSection;
