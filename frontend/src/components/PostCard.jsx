import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { toggleLike, addComment, deletePost, toggleCommentLike, addCommentReply } from "../api/posts.api";
import "./PostCard.css";

export default function PostCard({ post }) {
  const { user } = useAuth();
  const { _id, content, image, owner, createdAt, likes, comments: initialComments } = post;
  
  const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
  const [likeCount, setLikeCount] = useState(likes.length);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      await toggleLike(_id);
    } catch (error) {
      setIsLiked(isLiked);
      setLikeCount(likeCount);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await addComment(_id, newComment);
      setComments(prev => [...prev, response.data]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(_id);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      await toggleCommentLike(_id, commentId);
      setComments(prev => prev.map(c => {
        if (c._id === commentId) {
          const liked = c.likes.includes(user?._id);
          return {
            ...c,
            likes: liked 
              ? c.likes.filter(id => id !== user?._id)
              : [...c.likes, user?._id]
          };
        }
        return c;
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    try {
      const response = await addCommentReply(_id, commentId, replyText);
      setComments(prev => prev.map(c => {
        if (c._id === commentId) {
          return { ...c, replies: [...c.replies, response.data] };
        }
        return c;
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-card glass">
      <div className="post-card-header">
        <div className="post-header-left">
          <div className="post-avatar">
            {owner?.avatar ? (
              <img src={owner.avatar} alt={owner.username} />
            ) : (
              <span>{owner?.username?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="post-meta">
            <h4 className="post-author">{owner?.fullName || "User"}</h4>
            <span className="post-date">{date}</span>
          </div>
        </div>
        
        {user?._id === owner?._id && (
          <div className="post-header-actions">
            {!isDeleting ? (
              <button className="post-delete-btn" onClick={() => setIsDeleting(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            ) : (
              <div className="delete-confirm-group">
                <button className="btn-cancel-small" onClick={() => setIsDeleting(false)}>Cancel</button>
                <button className="btn-confirm-delete" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      {image && (
        <div className="post-image">
          <img src={`http://localhost:5000${image}`} alt="Post content" />
        </div>
      )}

      <div className="post-card-footer">
        <button 
          className={`post-action-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{likeCount > 0 && likeCount} Like</span>
        </button>
        <button 
          className="post-action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>{comments.length > 0 && comments.length} Comment</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment) => (
              <CommentItem 
                key={comment._id} 
                comment={comment} 
                onLike={() => handleCommentLike(comment._id)}
                onReply={(text) => handleReplySubmit(comment._id, text)}
                currentUser={user}
              />
            ))}
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submittingComment}
            />
            <button type="submit" disabled={submittingComment || !newComment.trim()}>
              {submittingComment ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function CommentItem({ comment, onLike, onReply, currentUser }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const isLiked = comment.likes?.includes(currentUser?._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div className="comment-container">
      <div className="comment-item">
        <div className="comment-avatar">
          {comment.owner?.avatar ? (
            <img src={comment.owner.avatar} alt={comment.owner.username} />
          ) : (
            <span>{comment.owner?.username?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="comment-body">
          <div className="comment-header">
            <span className="comment-author">{comment.owner?.fullName}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="comment-content">{comment.content}</p>
          <div className="comment-actions">
            <button className={`comment-action ${isLiked ? "liked" : ""}`} onClick={onLike}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {comment.likes?.length || ""} Like
            </button>
            <button className="comment-action" onClick={() => setShowReplyInput(!showReplyInput)}>
              Reply
            </button>
          </div>
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="replies-list">
          {comment.replies.map((reply, idx) => (
            <div key={idx} className="reply-item">
              <div className="reply-avatar">
                {reply.owner?.avatar ? (
                  <img src={reply.owner.avatar} alt={reply.owner.username} />
                ) : (
                  <span>{reply.owner?.username?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="reply-body">
                <span className="reply-author">{reply.owner?.fullName}</span>
                <p className="reply-content">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showReplyInput && (
        <form className="reply-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Write a reply..." 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            autoFocus
          />
          <button type="submit">Reply</button>
        </form>
      )}
    </div>
  );
}
