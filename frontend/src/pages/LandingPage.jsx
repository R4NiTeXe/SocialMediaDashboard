import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/index.css";
import "../App.css";

export default function LandingPage() {
  const [serverReady, setServerReady] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then(() => {
        setServerReady(true);
        setChecking(false);
      })
      .catch(() => {
        setServerReady(false);
        setChecking(false);
      });
  }, []);

  const LogoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  );

  return (
    <div className="app-container">
      <header className="app-header glass">
        <Link to="/" className="logo">
          <span className="logo-icon"><LogoIcon /></span>
          <span className="logo-text gradient-text">SocialSphere</span>
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <Link to="/login">
            <button className="btn-ghost">Log in</button>
          </Link>
          <Link to="/register">
            <button className="btn-primary">Join now</button>
          </Link>
        </div>
      </header>

      <main className="hero">
        <div className="hero-tag">Connect · Share · Discover</div>

        <h1 className="hero-title">
          A place to share your
          <br />
          <span className="gradient-text">story with the world.</span>
        </h1>

        <p className="hero-subtitle">
          Post photos, chat with friends, follow people you love, and see
          what's happening around you — all in one place.
        </p>

        <div className="cta-group">
          <Link to="/register">
            <button className="btn-primary btn-lg">Get started — it's free</button>
          </Link>
          <Link to="/login">
            <button className="btn-outline btn-lg">Log in</button>
          </Link>
        </div>


        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3>Share photos & videos</h3>
            <p>Post what's on your mind. Add a caption, tag friends, and share the moment.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
            <h3>Chat with friends</h3>
            <p>Send messages instantly. Your conversations happen in real time.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3>See your activity</h3>
            <p>Find out who's liking your posts, following you, and engaging with your content.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3>Never miss a moment</h3>
            <p>Get notified the second something interesting happens on your profile.</p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <span className="muted">SocialSphere © 2026</span>
      </footer>
    </div>
  );
}
