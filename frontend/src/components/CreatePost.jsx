import { useState, useRef } from "react";
import { createPost } from "../api/posts.api";
import "./CreatePost.css";

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);

      await createPost(formData);
      
      setContent("");
      handleRemoveImage();
      
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card glass">
      <div className="create-post-header">
        <div className="avatar-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={content.split("\n").length || 1}
        />
      </div>

      {preview && (
        <div className="image-preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <button className="remove-image-btn" onClick={handleRemoveImage}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      <div className="create-post-footer">
        <div className="post-actions">
          <button 
            className="action-btn" 
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className="action-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span className="action-text">Photo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        <button 
          className="btn-primary" 
          disabled={loading || (!content.trim() && !image)}
          onClick={handleSubmit}
        >
          {loading ? "Sharing..." : "Post Story"}
        </button>
      </div>
    </div>
  );
}
