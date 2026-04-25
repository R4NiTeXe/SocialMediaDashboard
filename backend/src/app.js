import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Allow requests from the frontend during development
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(morgan("dev")); // logs every request to the console

// Quick health check — lets the frontend (and deployment tools) verify the server is alive
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: `${process.uptime().toFixed(2)}s`,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/v1/auth", authRoutes);

// Global error handler — must be the last middleware
app.use(errorHandler);

export default app;
