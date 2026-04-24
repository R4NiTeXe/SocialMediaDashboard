import { useState, useEffect } from "react";
import "./styles/index.css";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ping the backend health endpoint to confirm the server is up
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch(() => {
        setHealth(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header glass">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text gradient-text">SocialSphere</span>
        </div>
        <div className="header-badge">Day 1 — Foundation</div>
      </header>

      {/* Hero */}
      <main className="hero">
        <div className="hero-tag">🚀 MERN Stack · Socket.IO · Redis</div>
        <h1 className="hero-title">
          Your Social Platform,
          <br />
          <span className="gradient-text">Built from Scratch.</span>
        </h1>
        <p className="hero-subtitle">
          A full-stack social media dashboard with real-time messaging,
          media uploads, follow system, and engagement analytics.
        </p>

        {/* Server Status Card */}
        <div className="status-card card">
          <div className="status-header">
            <span className="status-label">Backend Status</span>
            <span
              className={`status-dot ${
                loading ? "dot-loading" : health ? "dot-online" : "dot-offline"
              }`}
            />
          </div>

          {loading && <p className="status-text muted">Connecting to server...</p>}

          {!loading && health && (
            <div className="status-grid">
              <div className="status-item">
                <span className="item-label">Status</span>
                <span className="item-value online">✓ {health.status}</span>
              </div>
              <div className="status-item">
                <span className="item-label">Uptime</span>
                <span className="item-value">{health.uptime}</span>
              </div>
              <div className="status-item">
                <span className="item-label">Environment</span>
                <span className="item-value">{health.environment}</span>
              </div>
              <div className="status-item">
                <span className="item-label">Timestamp</span>
                <span className="item-value">
                  {new Date(health.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}

          {!loading && !health && (
            <p className="status-text danger">
              ✗ Could not reach the server. Make sure the backend is running on port 5000.
            </p>
          )}
        </div>

        {/* Tech badges */}
        <div className="tech-badges">
          {["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis"].map(
            (tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            )
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span className="muted">Day 1 of 7 complete · 5 commits</span>
      </footer>
    </div>
  );
}

export default App;
