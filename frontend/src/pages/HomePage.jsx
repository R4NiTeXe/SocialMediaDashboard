import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        fontFamily: "Outfit, sans-serif",
        background: "var(--bg-primary)",
        color: "var(--text)",
      }}
    >
      <span style={{ fontSize: "48px" }}>👋</span>
      <h1 style={{ fontSize: "28px", fontWeight: 700 }}>
        Hey, {user?.fullName}!
      </h1>
      <p style={{ color: "var(--text-muted)" }}>
        You're logged in as @{user?.username}
      </p>
      <p style={{ color: "var(--text-faint)", fontSize: "14px" }}>
        The full feed is coming on Day 4 🚀
      </p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "8px",
          padding: "10px 24px",
          background: "var(--danger)",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        Log out
      </button>
    </div>
  );
}
