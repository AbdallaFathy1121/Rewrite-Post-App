import Post from "../models/Post";
import PostResponse from "../models/PostResponse";
import axiosInstance from "../../../utils/axiosInstance";

// Create Post
export const createPost = async (model: Post) => {
  try {
    const response = await axiosInstance.post(`/article/add`, model);
    const result: PostResponse = response.data;
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};
