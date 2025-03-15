import React, {useState} from "react";
import ProfileBlogCard from "../components/ProfileBlogCard";
import ProfileBlogComment from "../components/ProfileBlogComment";
import DeleteBlogModal from "./DeleteBlogModal";
import { MdDelete } from "react-icons/md";
import "../styles/ProfileBlogModal.css";

const ProfileBlogModal = ({ blog, onClose, updateCommentCount, updateLikeCount, onDelete }) => {
  const [caption, setCaption] =useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Manage modal state
  if (!blog) return null;

  const setterCaption=(cap)=>{
    setCaption(cap);
  };

  const handleDelete = async() => {
    if (onDelete) {
      onDelete(blog.id); // Call delete function
    }
    setShowDeleteModal(false);
    onClose(); 
  };

  return (
    <div className="profile-blog-modal-overlay" onClick={onClose}>
      <div className="profile-blog-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="profile-blog-modal-body">
          <div className="profile-blog-blog-section">
            <ProfileBlogCard blog={blog} setterCaption={setterCaption} updateLikeCount={updateLikeCount}/>
          </div>
          <div className="profile-blog-comment-section">
            <div style={{marginLeft:"289px", cursor:"pointer"}} onClick={() => setShowDeleteModal(true)}><MdDelete size={25}/></div>
            <ProfileBlogComment blogId={blog.id} caption={caption} updateCommentCount={updateCommentCount}/>
          </div>
        </div>
      </div>
       {/* Render Delete Modal if open */}
       {showDeleteModal && <DeleteBlogModal onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />}
    </div>
  );
};

export default ProfileBlogModal;
