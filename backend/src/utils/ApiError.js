// A custom error class so we can throw structured errors from anywhere in the app
class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;
  }
}

export { ApiError };
