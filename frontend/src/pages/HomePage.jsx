import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getFeed } from "../api/posts.api";
import ThemeToggle from "../components/ThemeToggle";
import UserMenu from "../components/UserMenu";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await getFeed();
      setPosts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="app-container" style={{ background: "var(--bg-primary)" }}>
      <header className="app-header glass">
        <Link to="/home" className="logo">
          <span className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </span>
          <span className="logo-text gradient-text">SocialSphere</span>
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 20px",
          width: "100%",
          maxWidth: "1126px",
          margin: "0 auto",
        }}
      >
        <CreatePost onPostCreated={fetchPosts} />

        <div style={{ width: "100%", maxWidth: "var(--max-content-width)" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              Loading...
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "60px 40px" }}>
              <div style={{ color: "var(--text-faint)", marginBottom: "20px" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 style={{ color: "var(--text)", fontSize: "20px" }}>No posts yet</h3>
              <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "15px" }}>
                Be the first to share something with the world.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
