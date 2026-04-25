import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Protects routes — checks for a valid access token in cookies or the Authorization header
const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "You need to be logged in to do that");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    throw new ApiError(401, "Your session has expired — please log in again");
  }

  const user = await User.findById(decoded._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(401, "We couldn't find your account — please log in again");
  }

  req.user = user;
  next();
});

export { verifyJWT };
