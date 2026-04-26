import "./PostCard.css";

export default function PostCard({ post }) {
  const { content, image, owner, createdAt } = post;
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="post-card glass">
      <div className="post-card-header">
        <div className="post-avatar">
          {owner?.avatar ? (
            <img src={owner.avatar} alt={owner.username} />
          ) : (
            <span>{owner?.username?.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="post-meta">
          <h4 className="post-author">{owner?.fullName || "Deleted User"}</h4>
          <span className="post-date">{date}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{content}</p>
      </div>

      {image && (
        <div className="post-image">
          <img src={`http://localhost:5000${image}`} alt="Post media" />
        </div>
      )}

      <div className="post-card-footer">
        <button className="post-action-btn">
          <span>❤️</span> Like
        </button>
        <button className="post-action-btn">
          <span>💬</span> Comment
        </button>
        <button className="post-action-btn">
          <span>🔗</span> Share
        </button>
      </div>
    </div>
  );
}
