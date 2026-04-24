// Global error handler — catches anything thrown from controllers via asyncHandler
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // If it's not already our custom ApiError, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || []);
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
    // Only show the stack trace in development so it never leaks to production
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export { errorHandler };
