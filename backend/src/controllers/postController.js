import { Post } from "../models/Post.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required to create a post");
  }

  // Get image path if file was uploaded
  let imagePath = "";
  if (req.file) {
    imagePath = `/temp/${req.file.filename}`;
  }

  const post = await Post.create({
    content,
    image: imagePath,
    owner: req.user._id,
  });

  if (!post) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

const getFeed = asyncHandler(async (req, res) => {
  // Simple feed: get all posts, sorted by newest
  const posts = await Post.find()
    .populate("owner", "username fullName avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Feed fetched successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Check if the user is the owner
  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

export { createPost, getFeed, deletePost };
