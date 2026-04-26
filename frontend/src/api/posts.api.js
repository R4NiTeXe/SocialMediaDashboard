import axiosInstance from "./axiosInstance";

export const createPost = async (postData) => {
  // Using FormData because we might have an image file
  const response = await axiosInstance.post("/posts", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getFeed = async () => {
  const response = await axiosInstance.get("/posts");
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};
