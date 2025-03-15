import React,{useRef, useEffect} from "react";

const BlogCaptionUpload = ({ caption, onChange, captionError }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
       textareaRef.current.style.height = `${textareaRef.current.scrollHeight-25}px`;  // Set height based on content
    }
  }, [caption]); // This will run when caption changes

  return (
    <>
    <textarea
      ref={textareaRef}
      className="upload-caption"
      value={caption}
      onChange={onChange}
      placeholder="Your Experience, Your Voice"
      required
    />
    {captionError && <p className="caption-error-message">{captionError}</p>}
    </>
  );
};

export default BlogCaptionUpload;
