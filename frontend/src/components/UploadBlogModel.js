import React, { useState, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "../context/AuthContext"; // Assuming your Auth context is here
import UploadBlogSection from "./UploadBlogSection";
import BlogImagePreview from "./BlogImagePreview";
import BlogCaptionUpload from "./BlogCaptionUpload";
import "../styles/UploadBlogModel.css"; // Separate CSS file for styling

const UploadModal = ({ isOpen, onClose, onBlogCreated }) => {
  const { username } = useContext(AuthContext); // Get the username from AuthContext
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [captionError, setCaptionError] = useState("");
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPreview(null);
    setCaption("");
  };

  const handleClose = () => {
    handleRemovePhoto(); // Reset photo and caption states
    onClose(); // Trigger the modal close
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) { // Check if caption is empty or just whitespace
      setCaptionError("*Caption is required !");
      return;
    }

    if (!photo || !caption) {
      console.log("Please provide both a photo and a caption.");
      return;
    }

    try {
      setLoading(true);
      setCaptionError("");
      // Fetch user_id using the username
      const userResponse = await axiosInstance.get(`/users/useridbyusername?username=${username}`);
      const userId = userResponse.data.user_id;

      // Create FormData to send the photo and caption
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("image", photo);
      formData.append("caption", caption);

      // Submit the blog creation request
      await axiosInstance.post("/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onBlogCreated(); // Notify parent to refresh the blog list
      handleClose(); // Close the modal
    } catch (err) {
      console.log("err");
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="uploadmodal-overlay">
      <div className="uploadmodal-container">
        {!photo ? (
          <div>
             <button className="uploadmodal-close" onClick={handleClose}> &times; </button>
             <h2 className="upload-heading">"Let Your Photo Do the Talking"</h2>
             <UploadBlogSection onFileChange={handleFileChange} />
          </div>
        ) : (
          <>
            <BlogImagePreview preview={preview} onRemovePhoto={handleRemovePhoto} onSubmit={handleSubmit} loading={loading} />
            <BlogCaptionUpload caption={caption} onChange={handleCaptionChange} captionError={captionError}/>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
