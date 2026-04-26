import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/auth.css";

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const brandFeatures = [
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ), 
    text: "Share photos and videos with the people you care about" 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    ), 
    text: "Chat with friends instantly, in real time" 
  },
  { 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ), 
    text: "Stay updated — never miss a post or message" 
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      await login(form);
      navigate("/home");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong — please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-brand">
        <Link to="/" className="brand-logo">
          <span className="brand-logo-icon"><LogoIcon /></span>
          <span className="brand-logo-text">SocialSphere</span>
        </Link>
        <h1 className="brand-headline">
          Good to see
          <br />
          you again.
        </h1>
        <p className="brand-sub">
          Log in and pick up right where you left off — your posts, friends, and conversations are waiting.
        </p>
        <div className="brand-features">
          {brandFeatures.map((f, i) => (
            <div key={i} className="brand-feature">
              <span className="brand-feature-icon">{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-form-box">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-subtitle">We've missed you! Enter your details below</p>
          </div>

          {error && (
            <div className="form-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${error ? "input-error" : ""}`}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={`form-input ${error ? "input-error" : ""}`}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Log in"}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Join now — it's free</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
