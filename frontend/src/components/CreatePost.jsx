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
      
      // Reset form
      setContent("");
      handleRemoveImage();
      
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Failed to create post", error);
      alert("Oops! Something went wrong while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-card glass">
      <div className="create-post-header">
        <div className="avatar-placeholder">✨</div>
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
          <button className="remove-image-btn" onClick={handleRemoveImage}>×</button>
        </div>
      )}

      <div className="create-post-footer">
        <div className="post-actions">
          <button 
            className="action-btn" 
            onClick={() => fileInputRef.current?.click()}
            title="Add Photo"
          >
            <span className="action-icon">📸</span>
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
